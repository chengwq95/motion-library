"use client";
import type { CSSProperties } from "react";
import type { PreviewProps } from "@/lib/types";

export default function ExplodeOut({ text }: PreviewProps) {
  return <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
    <div className="flex font-black text-fg" style={{ fontSize: "17cqw" }}>
      {Array.from(text).map((char, i) => <span key={i} className="inline-block" style={{
        animation: "ml-explode 3s ease-out infinite",
        "--dx": `${Math.cos(i * 2.4) * 25}cqw`,
        "--dy": `${Math.sin(i * 2.4) * 20}cqw`,
        "--r": `${i % 2 ? -120 : 120}deg`,
      } as CSSProperties}>{char === " " ? " " : char}</span>)}
    </div>
  </div>;
}
