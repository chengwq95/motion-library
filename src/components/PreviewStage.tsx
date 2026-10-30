"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { MousePointer2, RotateCcw } from "lucide-react";
import PreviewContent from "@/components/PreviewContent";
import { useInView } from "@/hooks/useInView";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

export type StageBg = "theme" | "light" | "dark" | "checker";
const INTERACTIVE = new Set(["hover", "click", "focus", "drag"]);
export const isInteractive = (item: AnimationItem) => INTERACTIVE.has(item.trigger);

/**
 * The preview area: only rendered while on screen (there are hundreds), with a replay button.
 * On the detail page it can also auto-demo interactions, switch background and change speed.
 */
export default function PreviewStage({ item, text, className = "", style, demo = false, bg = "theme", speed = 1, bare = false }: {
  item: AnimationItem;
  text: string;
  className?: string;
  style?: CSSProperties;
  demo?: boolean;
  bg?: StageBg;
  speed?: number;
  /** No replay button or hint, e.g. when the preview sits inside a link. */
  bare?: boolean;
}) {
  const { t, locale } = useI18n();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage);
  const [replayKey, setReplayKey] = useState(0);
  const [userActive, setUserActive] = useState(false);
  const demoing = demo && inView && !userActive;

  // Auto demo: every 1.8s flip hover/focus/active styles, toggle checkboxes, step radios,
  // and move a synthetic pointer around for effects that follow the mouse.
  useEffect(() => {
    const el = stage.current;
    if (!demoing || !el) return;
    let on = false;
    let phase = 0;
    let last: Element = el;
    const inPreview = (sel: string) => [...el.querySelectorAll(`[data-preview] ${sel}`)];
    // Remember checkbox / radio state so stopping the demo hands back the effect as it started.
    const inputs = inPreview('input[type="checkbox"], input[type="radio"]') as HTMLInputElement[];
    const initial = inputs.map((i) => i.checked);
    const flip = () => {
      on = !on;
      el.toggleAttribute("data-demo", on);
      inPreview('input[type="checkbox"]').forEach((i) => ((i as HTMLInputElement).checked = on));
      const radios = inPreview('input[type="radio"]') as HTMLInputElement[];
      if (radios.length && on) radios[(radios.findIndex((r) => r.checked) + 1) % radios.length].checked = true;
      if (on && item.trigger === "click" && item.previewComponent) (inPreview("button")[0] as HTMLButtonElement | undefined)?.click();
      if (!on) last.dispatchEvent(new PointerEvent("pointerout", { bubbles: true, relatedTarget: document.body, pointerType: "mouse" }));
    };
    const move = () => {
      if (!on) return;
      phase += 0.12;
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2 + Math.cos(phase) * r.width * 0.22;
      const y = r.top + r.height / 2 + Math.sin(phase * 1.3) * r.height * 0.22;
      const hit = document.elementFromPoint(x, y);
      last = hit && el.contains(hit) ? hit : el;
      last.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: x, clientY: y, pointerType: "mouse" }));
    };
    flip();
    const flipId = setInterval(flip, 1800);
    const moveId = setInterval(move, 40);
    return () => {
      clearInterval(flipId);
      clearInterval(moveId);
      el.removeAttribute("data-demo");
      inputs.forEach((i, k) => (i.checked = initial[k]));
    };
  }, [demoing, item, replayKey]);

  // Playback speed: CSS animations and transitions via the Web Animations API, GSAP via its timeline.
  // Normal speed needs no work, so ordinary cards never touch the shared GSAP timeline.
  useEffect(() => {
    const el = stage.current;
    if (!el || !inView || speed === 1) return;
    const setRate = (rate: number) => el.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = rate));
    setRate(speed);
    gsap.globalTimeline.timeScale(speed);
    const id = setInterval(() => setRate(speed), 250);
    return () => {
      clearInterval(id);
      setRate(1);
      gsap.globalTimeline.timeScale(1);
    };
  }, [speed, inView, replayKey]);

  const hint = !bare && INTERACTIVE.has(item.trigger) && item.component !== "card" && !demo;

  return (
    <div
      ref={stage}
      data-paused={inView ? undefined : ""}
      data-stage-bg={bg === "theme" ? undefined : bg}
      onPointerEnter={(e) => e.isTrusted && setUserActive(true)}
      onPointerLeave={(e) => e.isTrusted && setUserActive(false)}
      className={`group/stage relative bg-stage [container-type:inline-size] ${className}`}
      style={style}
    >
      {inView && (
        <div data-preview className="contents">
          <PreviewContent key={replayKey} item={item} text={text} locale={locale} />
        </div>
      )}
      {hint && (
        <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-line/60 bg-card/80 px-2 py-0.5 text-[11px] text-muted backdrop-blur transition-opacity group-hover/stage:opacity-0" style={{ animation: "ml-hint 2s ease-in-out infinite" }}>
          <MousePointer2 className="h-3 w-3" />
          {t.tryHint[item.trigger]}
        </span>
      )}
      {!bare && <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        aria-label={`${t.replay}: ${item.name[locale]}`}
        title={t.replay}
        className="absolute right-3 top-3 z-10 grid place-items-center w-7 h-7 rounded-full border border-line/60 bg-card/80 text-muted backdrop-blur transition hover:text-fg focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/stage:opacity-100"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>}
    </div>
  );
}
