"use client";
import { useState } from "react";
import { cardHint } from "@/lib/effects/cards";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

export default function CardEntrance({ text }: PreviewProps) {
  const { t, locale } = useI18n();
  const [replay, setReplay] = useState(0);
  return <button type="button" aria-label={t.replayCard} onClick={() => setReplay(n => n + 1)} className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-pointer text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
    <span key={replay} className="flex h-[64%] w-[58%] flex-col justify-end gap-1 rounded-[18px] border border-line bg-card p-[18px] shadow-lg shadow-black/5" style={{ animation: "ml-slide-up 0.5s ease-out both" }}>
      <b className="text-[18px]">{text}</b>
      <span className="text-xs text-muted">{cardHint("click", locale)}</span>
    </span>
  </button>;
}
