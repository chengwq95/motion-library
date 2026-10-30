"use client";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

type Wave = { id: number; x: number; y: number; size: number };

export default function Ripple({ text }: PreviewProps) {
  const { t } = useI18n();
  const [waves, setWaves] = useState<Wave[]>([]);
  const nextId = useRef(0);

  const spawn = (el: HTMLElement, clientX?: number, clientY?: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const size = Math.hypot(r.width, r.height) * 2;
    const x = clientX === undefined ? r.width / 2 : clientX - r.left;
    const y = clientY === undefined ? r.height / 2 : clientY - r.top;
    setWaves((w) => [...w.slice(-4), { id: nextId.current++, x, y, size }]);
  };

  return <div className="h-full flex items-center justify-center">
    <button type="button" title={t.rippleHint}
      onPointerDown={(e) => spawn(e.currentTarget, e.clientX, e.clientY)}
      onClick={(e) => { if (e.detail === 0) spawn(e.currentTarget); }}
      className="relative select-none overflow-hidden rounded-xl bg-accent px-8 py-4 font-bold text-accent-fg shadow-lg shadow-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg">
      {waves.map((w) => (
        <span key={w.id} aria-hidden className="pointer-events-none absolute rounded-full bg-white/60"
          style={{ left: w.x - w.size / 2, top: w.y - w.size / 2, width: w.size, height: w.size, transform: "scale(0)", animation: "ml-ripple 0.6s ease-out forwards" }}
          onAnimationEnd={() => setWaves((ws) => ws.filter((x) => x.id !== w.id))} />
      ))}
      <span className="relative">{text}</span>
    </button>
  </div>;
}
