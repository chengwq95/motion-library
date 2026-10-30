"use client";
import { useEffect, useRef, useState } from "react";
import type { PreviewProps } from "@/lib/types";

export default function ScrollReveal({ text }: PreviewProps) {
  const stage = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={stage} className="h-full flex items-center justify-center overflow-hidden p-6">
    <div className={`rounded-xl bg-card border border-line shadow-lg shadow-black/5 p-6 text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>{text}</div>
  </div>;
}
