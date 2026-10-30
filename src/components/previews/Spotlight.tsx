"use client";
import type { CSSProperties } from "react";
import type { PreviewProps } from "@/lib/types";

const textStyle: CSSProperties = { fontSize: "13cqw" };
const light = "circle 70px at var(--x) var(--y)";

export default function Spotlight({ text }: PreviewProps) {
  // The light position lives in CSS variables, updated without re-rendering.
  const moveTo = (el: HTMLElement, x: string, y: string) => {
    el.style.setProperty("--x", x);
    el.style.setProperty("--y", y);
  };
  return <div className="relative h-full overflow-hidden" style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    onPointerMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      moveTo(e.currentTarget, `${e.clientX - r.left}px`, `${e.clientY - r.top}px`);
    }}
    onPointerLeave={(e) => moveTo(e.currentTarget, "50%", "50%")}>
    <div className="absolute inset-0 grid place-items-center whitespace-nowrap font-black text-fg/15" style={textStyle}>{text}</div>
    <div aria-hidden className="absolute inset-0 grid place-items-center whitespace-nowrap font-black" style={{
      ...textStyle,
      backgroundImage: "linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      maskImage: `radial-gradient(${light}, black 40%, transparent)`,
      WebkitMaskImage: `radial-gradient(${light}, black 40%, transparent)`,
    }}>{text}</div>
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle 90px at var(--x) var(--y), color-mix(in oklab, var(--accent) 18%, transparent), transparent)` }} />
  </div>;
}
