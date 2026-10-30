"use client";
import { useRef } from "react";
import type { PreviewProps } from "@/lib/types";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MagneticButton({ text }: PreviewProps) {
  const button = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  // Styles go straight to the DOM so pointer moves don't re-render.
  const pull = (x: number, y: number, settle: boolean) => {
    const transition = settle ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.1s ease-out";
    button.current!.style.transition = label.current!.style.transition = transition;
    button.current!.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    label.current!.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  return <div className="h-full flex items-center justify-center"
    onPointerMove={(e) => {
      if (e.pointerType !== "mouse" || reducedMotion()) return;
      const r = e.currentTarget.getBoundingClientRect();
      pull(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2), false);
    }}
    onPointerLeave={() => pull(0, 0, true)}>
    <button ref={button} type="button" className="rounded-full bg-fg px-8 py-4 font-bold text-page shadow-lg shadow-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <span ref={label} className="inline-block">{text}</span>
    </button>
  </div>;
}
