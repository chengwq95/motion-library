"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { PreviewProps } from "@/lib/types";

export default function LightningStrike({ text }: PreviewProps) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const word = stage.current!.querySelector("strong");
      const flash = stage.current!.querySelector("[data-flash]");
      gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
        .fromTo(word, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power4.in" })
        .fromTo(flash, { opacity: 0.85 }, { opacity: 0, duration: 0.5 })
        .to(word, { x: 3, yoyo: true, repeat: 3, duration: 0.04 }, "<");
    });
    return () => media.revert();
  }, []);
  return <div ref={stage} className="relative h-full flex items-center justify-center overflow-hidden">
    <div data-flash className="absolute inset-0 bg-indigo-500 opacity-0" />
    <strong className="relative font-black text-fg" style={{ fontSize: "17cqw", textShadow: "0 0 24px rgb(129 140 248 / 0.8)" }}>{text}</strong>
  </div>;
}
