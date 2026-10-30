"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

export default function CardEntrance({ text }: PreviewProps) {
  const { t } = useI18n();
  const [replay, setReplay] = useState(0);
  return <button type="button" aria-label={t.replayCard} onClick={() => setReplay(n => n + 1)} className="relative w-full h-full overflow-hidden flex items-center justify-center p-4 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
    <span key={replay} className="w-40 min-h-20 p-4 bg-card border border-line shadow-lg shadow-black/5 rounded-xl flex items-center justify-center" style={{ animation: "ml-slide-up 0.5s ease-out both" }}>{text}</span>
  </button>;
}
