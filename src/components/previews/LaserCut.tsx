"use client";
import type { PreviewProps } from "@/lib/types";

const cycle = "2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite";

export default function LaserCut({ text }: PreviewProps) {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center">
      <div className="relative font-black text-black leading-none whitespace-nowrap" style={{ fontSize: "17cqw" }}>
        <div style={{ clipPath: "inset(0 0 50% 0)", animation: `ml-slip-top ${cycle}` }}>{text}</div>
        <div aria-hidden className="absolute inset-0" style={{ clipPath: "inset(50% 0 0 0)", animation: `ml-slip-bottom ${cycle}` }}>{text}</div>
        <div className="absolute -left-[4cqw] top-1/2 h-[2px] w-0 bg-red-500 shadow-[0_0_8px_2px_rgb(239_68_68/0.6)]" style={{ animation: `ml-laser ${cycle}` }} />
      </div>
    </div>
  );
}
