import { ImageResponse } from "next/og";

// Shared layout for the share images. English only: the bundled OG font has no CJK glyphs.

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({ eyebrow, title, subtitle, chips }: { eyebrow: string; title: string; subtitle: string; chips: string[] }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0d0e11", color: "#f2f2f0", backgroundImage: "radial-gradient(circle at 80% 0%, rgba(129,140,248,0.35), transparent 55%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#16171c" />
            <path d="M10 22h14M6 32h16M10 42h14" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="40" cy="32" r="14" fill="#f2f2f0" />
          </svg>
          <div style={{ fontSize: 30, color: "#8e9097" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 36, color: "#b4b6bc", lineHeight: 1.35, maxWidth: 960 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {chips.map((chip) => (
            <div key={chip} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "2px solid #2a2c33", fontSize: 26, color: "#c9cbd0" }}>{chip}</div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
