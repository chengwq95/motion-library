"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Copy, Pause, Play, Shuffle } from "lucide-react";
import AnimationCard from "@/components/AnimationCard";
import BackToTop from "@/components/BackToTop";
import FavoriteButton from "@/components/FavoriteButton";
import CodePanel from "@/components/CodePanel";
import PreviewStage, { isInteractive, type StageBg } from "@/components/PreviewStage";
import TagList from "@/components/TagList";
import TopBar from "@/components/TopBar";
import { useCopy } from "@/hooks/useCopy";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRandomEffect } from "@/hooks/useRandomEffect";
import { useShortcuts } from "@/hooks/useShortcut";
import { animations } from "@/lib/animations";
import { toReact } from "@/lib/exporters";
import { addRecent } from "@/lib/prefs";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

function relatedTo(item: AnimationItem) {
  const score = (a: AnimationItem) =>
    (a.component === item.component ? 2 : 0) + (a.trigger === item.trigger ? 2 : 0)
    + a.contexts.filter((c) => item.contexts.includes(c)).length + (a.tech === item.tech ? 0.5 : 0);
  return animations
    .filter((a) => a.id !== item.id)
    .map((a) => ({ a, s: score(a) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, 3)
    .map(({ a }) => a);
}

function QuickCopy({ text, label, message, primary }: { text: string | (() => string); label: string; message: string; primary?: boolean }) {
  const { t } = useI18n();
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(typeof text === "function" ? text() : text, message)}
      className={`flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        copied ? "border-accent bg-accent text-accent-fg" : primary ? "border-fg bg-fg text-page hover:-translate-y-0.5" : "border-line hover:border-fg/40"
      }`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? t.copied : label}
    </button>
  );
}

function Segmented<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1.5">
      <span className="text-muted">{label}</span>
      <div className="flex rounded-full border border-line p-0.5">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}
            className="rounded-full px-2.5 py-1 text-muted transition-colors hover:text-fg aria-pressed:bg-fg aria-pressed:text-page">
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const WIDTHS = { phone: "360px", tablet: "560px", full: "100%" } as const;

export default function EffectDetail({ id, source }: { id: string; source?: string }) {
  const { t, locale } = useI18n();
  const index = animations.findIndex((a) => a.id === id);
  const item = animations[index];
  const prev = animations[(index - 1 + animations.length) % animations.length];
  const next = animations[(index + 1) % animations.length];
  useDocumentTitle(`${item.name[locale]} · ${t.brand}`);
  const router = useRouter();
  const openRandom = useRandomEffect();
  useShortcuts({ ArrowLeft: () => router.push(`/effects/${prev.id}`), ArrowRight: () => router.push(`/effects/${next.id}`) });
  useEffect(() => addRecent(item.id), [item.id]);

  // Interactive effects demo themselves until you turn it off (or take over with the pointer).
  const [demo, setDemo] = useState(isInteractive(item));
  const [bg, setBg] = useState<StageBg>("theme");
  const [speed, setSpeed] = useState(1);
  const [width, setWidth] = useState<keyof typeof WIDTHS>("full");

  return (
    <div className="min-h-screen">
      <TopBar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-24">
        {/* Quick navigation so you can keep browsing without going back to the list. */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="mr-auto inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="w-4 h-4" />
            {t.backToAll}
          </Link>
          <span className="hidden font-mono text-[11px] text-muted md:inline">{t.shortcutsHint}</span>
          <Link href={`/effects/${prev.id}`} aria-label={`${t.previous}: ${prev.name[locale]}`} title={`${t.previous} (←)`} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:border-fg/30 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link href={`/effects/${next.id}`} aria-label={`${t.next}: ${next.name[locale]}`} title={`${t.next} (→)`} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:border-fg/30 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent">
            <ChevronRight className="h-4 w-4" />
          </Link>
          <button type="button" onClick={openRandom} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-page transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <Shuffle className="h-4 w-4" />
            {t.ctaRandom}
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <div className="flex h-[280px] justify-center overflow-hidden rounded-3xl border border-line bg-stage/50 sm:h-[380px]">
              <PreviewStage
                item={item}
                text={item.sample[locale]}
                demo={demo}
                bg={bg}
                speed={speed}
                className="h-full w-full overflow-hidden transition-[max-width] duration-500"
                style={{ maxWidth: WIDTHS[width] }}
              />
            </div>
            {/* Preview tools: auto demo, background, speed and width. */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              {isInteractive(item) && (
                <button type="button" aria-pressed={demo} onClick={() => setDemo((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:text-fg aria-pressed:border-accent/50 aria-pressed:bg-accent/10 aria-pressed:text-fg">
                  {demo ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {t.autoDemo}
                </button>
              )}
              <Segmented label={t.stageBg} value={bg} onChange={setBg} options={(["theme", "light", "dark", "checker"] as const).map((v) => ({ value: v, label: t.stageBgs[v] }))} />
              <Segmented label={t.speed} value={String(speed)} onChange={(v) => setSpeed(Number(v))} options={["0.5", "1", "2"].map((v) => ({ value: v, label: `${v}×` }))} />
              <Segmented label={t.width} value={width} onChange={setWidth} options={(["phone", "tablet", "full"] as const).map((v) => ({ value: v, label: t.widths[v] }))} />
            </div>
          </div>

          <div>
            <div className="flex items-start gap-3">
              <h1 className="flex-1 text-3xl font-black tracking-tight sm:text-4xl">{item.name[locale]}</h1>
              <FavoriteButton id={item.id} label={item.name[locale]} className="mt-1 w-10 h-10 border border-line" />
            </div>
            <p className="mt-4 text-lg leading-relaxed">{item.description[locale]}</p>
            <TagList item={item} className="mt-4 text-xs" />
            <div className="mt-8 flex flex-wrap gap-2">
              <QuickCopy text={item.aiPrompt[locale]} label={t.copyPrompt} message={t.copiedToast} primary />
              {item.snippet && <QuickCopy text={() => toReact(item, locale)} label={t.copyTab(t.codeTabs.react)} message={t.tabCopied(t.codeTabs.react)} />}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <CodePanel item={item} source={source} />
        </div>

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {[{ a: prev, label: t.previous, Icon: ArrowLeft }, { a: next, label: t.next, Icon: ArrowRight }].map(({ a, label, Icon }, i) => (
            <Link key={label} href={`/effects/${a.id}`}
              className={`flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-fg/30 ${i === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}>
              <Icon className="w-4 h-4 shrink-0 text-muted" />
              <span>
                <span className="block text-xs text-muted">{label}</span>
                <span className="font-semibold">{a.name[locale]}</span>
              </span>
            </Link>
          ))}
        </nav>

        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold">{t.related}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {relatedTo(item).map((a) => <AnimationCard key={a.id} item={a} previewText="" />)}
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
}
