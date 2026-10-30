"use client";

export default function ButtonHover({ text = "Hover Me" }: { text?: string }) {
  return (
    <div className="relative w-full h-full bg-[#15161a] overflow-hidden flex items-center justify-center">
      <button className="px-6 py-3 bg-white text-black font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100 active:scale-95 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-indigo-400">
        {text}
      </button>
    </div>
  );
}
