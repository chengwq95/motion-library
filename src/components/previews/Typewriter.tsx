"use client";
import { useEffect, useState } from "react";
import type { PreviewProps } from "@/lib/types";

const HOLD = 10;
const PAUSE = 4;

export default function Typewriter({ text, paused }: PreviewProps) {
  const chars = Array.from(text);
  const n = chars.length;
  // One step per tick; a cycle is type (n) → hold → delete (n) → pause. Starts fully typed.
  const [step, setStep] = useState(n);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => s + 1), 120);
    return () => clearInterval(id);
  }, [paused]);

  const p = step % (2 * n + HOLD + PAUSE);
  const visible = p <= n ? p : p <= n + HOLD ? n : p <= 2 * n + HOLD ? 2 * n + HOLD - p : 0;

  return <div className="h-full flex items-center justify-center px-6">
    <p className="font-mono font-bold text-fg whitespace-pre" style={{ fontSize: "8cqw" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{chars.slice(0, visible).join("")}</span>
      <span aria-hidden className="ml-1 inline-block h-[1em] w-[2px] bg-accent align-[-0.12em]" style={{ animation: "ml-blink 1s steps(1) infinite" }} />
    </p>
  </div>;
}
