"use client";
import type { CSSProperties } from "react";
import type { PreviewProps } from "@/lib/types";

export default function ExplodeOut({ text = "爆発" }: PreviewProps) {
  const chars = Array.from(text);
  return <div className="relative w-full h-full bg-[#15161a] overflow-hidden flex items-center justify-center">
    <span className="absolute top-2 left-2 text-xs text-white/60">衝擊・副歌</span>
    <div className="flex font-black text-white" style={{ fontSize: "17cqw" }}>
      {chars.map((char, i) => <span key={i} className="inline-block" style={{
        animation: "explode 3s ease-out infinite",
        "--dx": `${Math.cos(i * 2.4) * 25}cqw`,
        "--dy": `${Math.sin(i * 2.4) * 20}cqw`,
        "--r": `${i % 2 ? -120 : 120}deg`,
      } as CSSProperties}>{char}</span>)}
    </div>
    <style jsx>{`@keyframes explode {
      0%, 25%, 100% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
      55%, 85% { transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scale(0.3); opacity: 0; }
    }`}</style>
  </div>;
}
