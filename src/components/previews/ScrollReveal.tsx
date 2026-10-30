"use client";
import { useEffect, useRef, useState } from "react";
import { cardHint } from "@/lib/effects/cards";
import { useI18n } from "@/lib/i18n";
import type { PreviewProps } from "@/lib/types";

export default function ScrollReveal({ text }: PreviewProps) {
  const { locale } = useI18n();
  const stage = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={stage} className="h-full flex items-center justify-center overflow-hidden">
    <div className={`flex h-[64%] w-[58%] flex-col justify-end gap-1 rounded-[18px] border border-line bg-card p-[18px] shadow-lg shadow-black/5 transition-all duration-700 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
      <b className="text-[18px]">{text}</b>
      <span className="text-xs text-muted">{cardHint("scroll", locale)}</span>
    </div>
  </div>;
}
