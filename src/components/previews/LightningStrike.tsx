"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { PreviewProps } from "@/lib/types";

export default function LightningStrike({ text = "閃電" }: PreviewProps) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
        .fromTo(stage.current!.querySelector("strong"), { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power4.in" })
        .fromTo(stage.current, { backgroundColor: "#6366f1" }, { backgroundColor: "#15161a", duration: 0.5 })
        .to(stage.current!.querySelector("strong"), { x: 3, yoyo: true, repeat: 3, duration: 0.04 });
    });
    return () => media.revert();
  }, []);
  return <div ref={stage} className="h-full flex items-center justify-center overflow-hidden bg-[#15161a]">
    <strong className="text-white" style={{ fontSize: "17cqw", textShadow: "0 0 24px #818cf8" }}>{text}</strong>
  </div>;
}
