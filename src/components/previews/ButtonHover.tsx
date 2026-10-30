"use client";
import type { PreviewProps } from "@/lib/types";

export default function ButtonHover({ text }: PreviewProps) {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <button className="px-6 py-3 bg-fg text-page font-bold rounded-xl shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-105 in-data-demo:scale-105 active:scale-95 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        {text}
      </button>
    </div>
  );
}
