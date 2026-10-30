"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { previewRegistry } from "@/components/AnimationRegistry";
import { useInView } from "@/hooks/useInView";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

/** The preview area: pauses while off screen and offers a replay button. */
export default function PreviewStage({ item, text, className = "" }: { item: AnimationItem; text: string; className?: string }) {
  const { t, locale } = useI18n();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage);
  const [replayKey, setReplayKey] = useState(0);
  const Preview = previewRegistry[item.previewComponent];

  return (
    <div ref={stage} data-paused={inView ? undefined : ""} className={`group/stage relative bg-stage [container-type:inline-size] ${className}`}>
      {Preview && <Preview key={replayKey} text={text} paused={!inView} />}
      <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        aria-label={`${t.replay}: ${item.name[locale]}`}
        title={t.replay}
        className="absolute right-3 top-3 grid place-items-center w-7 h-7 rounded-full border border-line/60 bg-card/80 text-muted backdrop-blur transition hover:text-fg focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/stage:opacity-100"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
