"use client";
import type { PreviewProps } from "@/lib/types";

export default function Shimmer({ text }: PreviewProps) {
  return <div className="h-full flex items-center justify-center px-4">
    <span className="font-black whitespace-nowrap" style={{
      fontSize: "14cqw",
      backgroundImage: "linear-gradient(110deg, var(--muted) 35%, var(--accent) 44%, var(--fg) 50%, var(--accent) 56%, var(--muted) 65%)",
      backgroundSize: "200% 100%",
      backgroundPosition: "50% 0",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      animation: "ml-shimmer 2.4s linear infinite",
    }}>{text}</span>
  </div>;
}
