"use client";

export default function CoinFlip({ text = "表か裏か" }: { text?: string }) {
  const chars = text.split("");
  return (
    <div className="relative w-full h-full bg-[#f5f0e6] overflow-hidden flex items-center justify-center">
      <span className="absolute top-2 left-2 text-xs text-black/60">碰運氣・遊戲</span>
      <div className="flex font-black text-black" style={{ fontSize: "17cqw", perspective: "1000px" }}>
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: `flip 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              transformStyle: "preserve-3d",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }
      `}</style>
    </div>
  );
}
