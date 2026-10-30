"use client";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

export default function DragFollow({ text }: PreviewProps) {
  const { t } = useI18n();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const clamp = (x: number, y: number, el: HTMLButtonElement) => {
    const stage = el.parentElement!;
    const maxX = Math.max(0, (stage.clientWidth - el.offsetWidth) / 2);
    const maxY = Math.max(0, (stage.clientHeight - el.offsetHeight) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };
  return <div className="h-full flex items-center justify-center overflow-hidden">
    <button type="button" aria-label={t.dragHint} className="max-w-[80%] touch-none select-none cursor-grab active:cursor-grabbing rounded-full bg-accent px-5 py-4 text-accent-fg font-bold shadow-lg shadow-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, startX: pos.x, startY: pos.y }; }}
      onPointerMove={e => { if (drag.current) setPos(clamp(drag.current.startX + e.clientX - drag.current.x, drag.current.startY + e.clientY - drag.current.y, e.currentTarget)); }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
      onKeyDown={e => { const delta: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }; if (delta[e.key]) { e.preventDefault(); const [x, y] = delta[e.key]; setPos(clamp(pos.x + x, pos.y + y, e.currentTarget)); } }}>
      {text}
    </button>
  </div>;
}
