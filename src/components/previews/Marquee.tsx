"use client";
import type { PreviewProps } from "@/lib/types";

export default function Marquee({ text }: PreviewProps) {
  const chunk = Array(4).fill(`${text} ✦ `).join("");
  // Two identical halves moving by -50% gives a seamless loop.
  const row = (reverse: boolean, outline: boolean) => (
    <div className="flex w-max" style={{ animation: `ml-marquee 12s linear infinite${reverse ? " reverse" : ""}` }}>
      {[0, 1].map((i) => (
        <span key={i} aria-hidden className="whitespace-pre font-black"
          style={outline ? { color: "transparent", WebkitTextStroke: "1.5px var(--fg)" } : undefined}>
          {chunk}
        </span>
      ))}
    </div>
  );
  return <div className="h-full flex flex-col justify-center gap-1 overflow-hidden text-fg [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]" style={{ fontSize: "9cqw" }}>
    <span className="sr-only">{text}</span>
    {row(false, false)}
    {row(true, true)}
  </div>;
}
