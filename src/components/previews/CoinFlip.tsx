"use client";
import type { PreviewProps } from "@/lib/types";

export default function CoinFlip({ text }: PreviewProps) {
  return (
    <div className="relative w-full h-full bg-[#f5f0e6] overflow-hidden flex items-center justify-center">
      <div className="flex font-black text-black" style={{ fontSize: "15cqw", perspective: "1000px" }}>
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{ animation: "ml-flip 1.2s ease-in-out infinite", animationDelay: `${i * 0.1}s`, transformStyle: "preserve-3d" }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </div>
    </div>
  );
}
