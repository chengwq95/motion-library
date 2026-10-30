"use client";
import { useState } from "react";
import type { PreviewProps } from "@/lib/types";

export default function CardEntrance({ text = "Hello, motion" }: PreviewProps) {
  const [replay, setReplay] = useState(0);
  return <button type="button" aria-label="重播卡片進場" onClick={() => setReplay(n => n + 1)} className="relative w-full h-full bg-[#15161a] overflow-hidden flex items-center justify-center p-4 focus-visible:outline-2 focus-visible:outline-indigo-400">
    <span key={replay} className="w-40 min-h-20 p-4 bg-[#2a2c33] rounded-xl animate-[slideUp_0.5s_ease-out_both] flex items-center justify-center">{text}</span>
    <style jsx>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
  </button>;
}
