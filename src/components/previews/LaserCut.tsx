"use client";

export default function LaserCut({ text = "切断" }: { text?: string }) {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center">
      <span className="absolute top-2 left-2 text-xs text-black/60">SF・切斷</span>
      <div className="relative">
        <div
          className="font-black text-black leading-none"
          style={{ fontSize: "17cqw", clipPath: "inset(0 0 50% 0)" }}
        >
          {text}
        </div>
        <div
          className="font-black text-black leading-none absolute top-0 left-0"
          style={{
            fontSize: "17cqw",
            clipPath: "inset(50% 0 0 0)",
            transform: "translateY(4px)",
          }}
        >
          {text}
        </div>
        <div
          className="absolute left-0 top-1/2 h-[2px] w-0 bg-red-500 animate-[laser_0.8s_ease-out_forwards]"
          style={{ animation: "laser 0.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
        />
      </div>
      <style jsx>{`
        @keyframes laser {
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
