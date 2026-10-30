"use client";
import { useRef } from "react";
import { cardHint } from "@/lib/effects/cards";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

export default function ParallaxTilt({ text }: PreviewProps) {
  const { locale } = useI18n();
  const card = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  return <div className="h-full flex items-center justify-center" style={{ perspective: "800px" }}
    onPointerMove={(e) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 2 - 1;
      const py = ((e.clientY - r.top) / r.height) * 2 - 1;
      card.current!.style.transition = "transform 0.1s ease-out";
      card.current!.style.transform = `rotateX(${-py * 12}deg) rotateY(${px * 12}deg)`;
      glare.current!.style.opacity = "1";
      glare.current!.style.background = `radial-gradient(circle at ${(px + 1) * 50}% ${(py + 1) * 50}%, rgb(255 255 255 / 0.35), transparent 60%)`;
    }}
    onPointerLeave={() => {
      card.current!.style.transition = "transform 0.4s ease-out";
      card.current!.style.transform = "";
      glare.current!.style.opacity = "0";
    }}>
    <div ref={card} className="relative flex h-[64%] w-[58%] flex-col justify-end gap-1 rounded-[18px] bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[18px] text-white shadow-2xl shadow-indigo-500/30" style={{ transformStyle: "preserve-3d" }}>
      <b className="text-[18px]" style={{ transform: "translateZ(40px)" }}>{text}</b>
      <span className="text-xs text-white/80" style={{ transform: "translateZ(24px)" }}>{cardHint("hover", locale)}</span>
      <div ref={glare} className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-300" />
    </div>
  </div>;
}
