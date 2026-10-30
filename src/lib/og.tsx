import { ImageResponse } from "next/og";

// Shared layout for the share images. English only: the bundled OG font has no CJK glyphs.

export const OG_SIZE = { width: 1200, height: 630 };

const logo = (
  <svg width="56" height="56" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#16171c" />
    <path d="M10 22h14M6 32h16M10 42h14" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
    <circle cx="40" cy="32" r="14" fill="#f2f2f0" />
  </svg>
);

const page = { width: "100%", height: "100%", display: "flex", background: "#08080a", color: "#f4f4f5", backgroundImage: "radial-gradient(circle at 85% 0%, rgba(157,140,255,0.35), transparent 55%)" } as const;

/** With `preview` (a data URL of the effect's screenshot) the image becomes text on the left, preview on the right. */
export function renderOgImage({ eyebrow, title, subtitle, chips, preview }: { eyebrow: string; title: string; subtitle: string; chips: string[]; preview?: string }) {
  const chipList = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {chips.map((chip) => (
        <div key={chip} style={{ display: "flex", padding: "8px 20px", borderRadius: 999, border: "2px solid #26262c", fontSize: 24, color: "#c9cbd0" }}>{chip}</div>
      ))}
    </div>
  );

  if (preview) {
    return new ImageResponse(
      (
        <div style={{ ...page, alignItems: "center", gap: 56, padding: "64px 64px 64px 72px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 470, height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {logo}
              <div style={{ fontSize: 26, color: "#8b8b94" }}>{eyebrow}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>{title}</div>
              <div style={{ fontSize: 28, color: "#b4b6bc", lineHeight: 1.35 }}>{subtitle}</div>
            </div>
            {chipList}
          </div>
          <div style={{ display: "flex", flex: 1, borderRadius: 28, overflow: "hidden", border: "2px solid #26262c", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img src={preview} width={560} height={320} style={{ width: "100%", height: 320, objectFit: "cover" }} alt="" />
          </div>
        </div>
      ),
      OG_SIZE,
    );
  }

  return new ImageResponse(
    (
      <div style={{ ...page, flexDirection: "column", justifyContent: "space-between", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {logo}
          <div style={{ fontSize: 30, color: "#8b8b94" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 36, color: "#b4b6bc", lineHeight: 1.35, maxWidth: 960 }}>{subtitle}</div>
        </div>
        {chipList}
      </div>
    ),
    OG_SIZE,
  );
}
