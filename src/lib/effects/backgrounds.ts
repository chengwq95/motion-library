import type { ContextKind, TriggerKind } from "../types";
import { esc, rnd, times, type SnippetDef } from "./helpers";

// Backgrounds fill the whole stage and show the sample text on top.
export const bg = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], css: string, layers: (t: string) => string, o: { t?: TriggerKind; dark?: boolean } = {}): SnippetDef => ({
  id, zh, en, c: "background", t: o.t ?? "auto", m,
  css: `.$ { position: absolute; inset: 0; overflow: hidden; display: grid; place-items: center; ${o.dark ? "background: #0b1020; color: #fff;" : "color: var(--fg);"} }
.$ .t { position: relative; z-index: 2; margin: 0; font-size: 9cqw; font-weight: 900; text-align: center; }
${css}`,
  html: (t) => `<div class="$">${layers(t)}<p class="t">${esc(t)}</p></div>`,
});

export const pct = (i: number, seed: number) => `${(rnd(i, seed) * 100).toFixed(1)}%`;

export const backgroundSnippets: SnippetDef[] = [
  bg("bg-gradient-shift", ["渐变背景", "柔和的多色渐变缓慢移动。"], ["Shifting Gradient", "A soft multicolor gradient drifts slowly."], ["elegant"],
    `.$ { background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 400% 400%; color: #fff; animation: $-k 8s ease infinite; }
@keyframes $-k { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`, () => ""),
  bg("bg-aurora", ["极光", "几团模糊的彩色光斑缓缓漂移，像北极光。"], ["Aurora", "Blurred color blobs drift slowly like the northern lights."], ["elegant"],
    `.$ i { position: absolute; width: 60%; aspect-ratio: 1; border-radius: 50%; filter: blur(30px); opacity: .7; animation: $-k 10s ease-in-out infinite alternate; }
.$ i:nth-child(1) { background: #22d3ee; left: -10%; top: -20%; }
.$ i:nth-child(2) { background: #a855f7; right: -15%; top: 10%; animation-delay: -3s; }
.$ i:nth-child(3) { background: #22c55e; left: 20%; bottom: -40%; animation-delay: -6s; }
@keyframes $-k { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20%, 10%) scale(1.2); } 100% { transform: translate(-10%, -10%) scale(.9); } }`,
    () => times(3, () => "<i></i>"), { dark: true }),
  bg("bg-mesh", ["网格渐变", "多个径向渐变叠加，整体缓慢旋转。"], ["Mesh Gradient", "Layered radial gradients slowly rotate together."], ["showcase"],
    `.$::before { content: ""; position: absolute; inset: -50%; background: radial-gradient(at 20% 30%, #f472b6 0, transparent 40%), radial-gradient(at 80% 20%, #60a5fa 0, transparent 40%), radial-gradient(at 50% 80%, #fbbf24 0, transparent 45%), radial-gradient(at 80% 80%, #34d399 0, transparent 40%); animation: $-k 12s linear infinite; }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-conic", ["旋转光束", "锥形渐变从中心放射出光束并旋转。"], ["Rotating Rays", "A conic gradient radiates beams from the center and spins."], ["impact"],
    `.$::before { content: ""; position: absolute; width: 200%; aspect-ratio: 1; background: repeating-conic-gradient(from 0deg, color-mix(in oklab, var(--accent) 35%, transparent) 0 10deg, transparent 10deg 20deg); animation: $-k 20s linear infinite; }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-grid-pan", ["移动网格", "方格网格线向斜下方持续移动。"], ["Panning Grid", "Grid lines pan diagonally without end."], ["tech"],
    `.$ { background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 28px 28px; animation: $-k 2s linear infinite; }
@keyframes $-k { to { background-position: 28px 28px; } }`, () => ""),
  bg("bg-retro-grid", ["复古透视网格", "80 年代风格的透视地平线网格向前流动，上方是夕阳。"], ["Retro Grid", "An 80s perspective grid streams forward under a setting sun."], ["tech"],
    `.$ { background: linear-gradient(#1e0b3a, #4c1d95 60%, #0b1020 60%); }
.$::before { content: ""; position: absolute; left: 50%; top: 18%; width: 110px; height: 110px; margin-left: -55px; border-radius: 50%; background: linear-gradient(#fde047, #f97316 60%, #ec4899); -webkit-mask: repeating-linear-gradient(#000 0 10px, transparent 10px 13px); mask: repeating-linear-gradient(#000 0 10px, transparent 10px 13px); }
.$::after { content: ""; position: absolute; left: -50%; right: -50%; bottom: -10%; height: 50%; background-image: linear-gradient(#ec4899 2px, transparent 2px), linear-gradient(90deg, #ec4899 2px, transparent 2px); background-size: 40px 30px; transform: perspective(200px) rotateX(60deg); transform-origin: top; animation: $-k 1s linear infinite; }
.$ .t { color: #fff; text-shadow: 0 0 12px #ec4899; }
@keyframes $-k { to { background-position: 0 30px; } }`, () => "", { dark: true }),
  bg("bg-dots-drift", ["点阵漂移", "规则的圆点阵列缓缓向一侧漂移。"], ["Drifting Dots", "A regular dot pattern drifts slowly sideways."], ["elegant"],
    `.$ { background-image: radial-gradient(color-mix(in oklab, var(--accent) 50%, transparent) 2px, transparent 2.5px); background-size: 22px 22px; animation: $-k 3s linear infinite; }
@keyframes $-k { to { background-position: 22px 0; } }`, () => ""),
  bg("bg-stripes", ["斜纹流动", "粗斜条纹不停流动，像施工提示。"], ["Moving Stripes", "Bold diagonal stripes keep moving like a caution sign."], ["impact"],
    `.$ { background: repeating-linear-gradient(-45deg, #facc15 0 24px, #111 24px 48px); background-size: 68px 68px; animation: $-k 1s linear infinite; }
.$ .t { padding: 6px 16px; background: #111; color: #facc15; }
@keyframes $-k { to { background-position: 68px 0; } }`, () => ""),
  bg("bg-checker", ["棋盘滚动", "黑白棋盘格持续向斜上方滚动。"], ["Scrolling Checkerboard", "A checkerboard keeps scrolling diagonally."], ["game"],
    `.$ { background: conic-gradient(var(--card) 25%, var(--line) 0 50%, var(--card) 0 75%, var(--line) 0) 0 0 / 40px 40px; animation: $-k 2s linear infinite; }
@keyframes $-k { to { background-position: 40px -40px; } }`, () => ""),
  bg("bg-waves", ["海浪", "多层半透明波浪在底部错开流动。"], ["Ocean Waves", "Layers of translucent waves roll along the bottom."], ["elegant"],
    `.$ svg { position: absolute; left: 0; bottom: 0; width: 200%; height: 55%; }
.$ path { animation: $-k 6s linear infinite; }
.$ path:nth-child(1) { fill: color-mix(in oklab, var(--accent) 25%, transparent); animation-duration: 9s; }
.$ path:nth-child(2) { fill: color-mix(in oklab, var(--accent) 45%, transparent); animation-duration: 6s; animation-direction: reverse; }
.$ path:nth-child(3) { fill: var(--accent); animation-duration: 4s; }
@keyframes $-k { to { transform: translateX(-50%); } }`,
    () => `<svg viewBox="0 0 800 100" preserveAspectRatio="none">${times(3, (i) => `<path d="M0 ${40 + i * 15} Q100 ${10 + i * 15} 200 ${40 + i * 15} T400 ${40 + i * 15} T600 ${40 + i * 15} T800 ${40 + i * 15} V100 H0z"/>`)}</svg>`),
  bg("bg-bubbles", ["气泡上升", "大小不一的气泡从底部缓缓升起。"], ["Rising Bubbles", "Bubbles of different sizes float up from the bottom."], ["game"],
    `.$ i { position: absolute; bottom: -40px; border-radius: 50%; border: 2px solid color-mix(in oklab, var(--accent) 60%, transparent); background: color-mix(in oklab, var(--accent) 12%, transparent); animation: $-k linear infinite; }
@keyframes $-k { to { transform: translateY(-260px) translateX(20px); opacity: 0; } }`,
    () => times(14, (i) => { const s = 8 + rnd(i, 2) * 26; return `<i style="left:${pct(i, 1)};width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;animation-duration:${(4 + rnd(i, 3) * 5).toFixed(1)}s;animation-delay:-${(rnd(i, 4) * 8).toFixed(1)}s"></i>`; })),
  bg("bg-snow", ["飘雪", "雪花从上方飘落，轻轻左右摇摆。"], ["Snowfall", "Snowflakes drift down, swaying gently."], ["elegant"],
    `.$ i { position: absolute; top: -10px; width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 4px #fff; animation: $-k linear infinite; }
@keyframes $-k { 0% { transform: translate(0, 0); } 50% { transform: translate(14px, 110px); } 100% { transform: translate(-6px, 230px); } }`,
    () => times(30, (i) => `<i style="left:${pct(i, 5)};opacity:${(0.4 + rnd(i, 6) * 0.6).toFixed(2)};animation-duration:${(4 + rnd(i, 7) * 5).toFixed(1)}s;animation-delay:-${(rnd(i, 8) * 8).toFixed(1)}s;transform:scale(${(0.5 + rnd(i, 9)).toFixed(2)})"></i>`), { dark: true }),
  bg("bg-rain", ["下雨", "细长的雨丝斜着快速落下。"], ["Rain", "Thin streaks of rain fall quickly at a slant."], ["elegant"],
    `.$ { background: linear-gradient(#0f172a, #1e293b); }
.$ i { position: absolute; top: -40px; width: 1px; height: 30px; background: linear-gradient(transparent, #93c5fd); transform: rotate(12deg); animation: $-k linear infinite; }
@keyframes $-k { to { transform: translate(-50px, 260px) rotate(12deg); } }`,
    () => times(40, (i) => `<i style="left:${pct(i, 10)};animation-duration:${(0.5 + rnd(i, 11) * 0.5).toFixed(2)}s;animation-delay:-${rnd(i, 12).toFixed(2)}s"></i>`), { dark: true }),
  bg("bg-starfield", ["星空闪烁", "夜空中的星星此起彼伏地闪烁。"], ["Twinkling Stars", "Stars twinkle on and off across the night sky."], ["elegant"],
    `.$ { background: radial-gradient(ellipse at bottom, #1b2735, #090a0f); }
.$ i { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: #fff; animation: $-k ease-in-out infinite; }
@keyframes $-k { 0%, 100% { opacity: .2; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.4); } }`,
    () => times(50, (i) => `<i style="left:${pct(i, 13)};top:${pct(i, 14)};animation-duration:${(1.5 + rnd(i, 15) * 3).toFixed(1)}s;animation-delay:-${(rnd(i, 16) * 3).toFixed(1)}s"></i>`), { dark: true }),
  bg("bg-warp", ["星际穿越", "星星从中心向四周飞出，像在超光速飞行。"], ["Warp Speed", "Stars streak out from the center like a jump to hyperspace."], ["impact"],
    `.$ { background: #000; }
.$ i { position: absolute; left: 50%; top: 50%; width: 2px; height: 2px; background: #fff; animation: $-k linear infinite; }
@keyframes $-k { from { transform: rotate(var(--a)) translateX(0) scaleX(1); opacity: 0; } 20% { opacity: 1; } to { transform: rotate(var(--a)) translateX(240px) scaleX(30); opacity: 1; } }`,
    () => times(40, (i) => `<i style="--a:${(rnd(i, 17) * 360).toFixed(0)}deg;animation-duration:${(0.8 + rnd(i, 18) * 1.2).toFixed(2)}s;animation-delay:-${(rnd(i, 19) * 2).toFixed(2)}s"></i>`), { dark: true }),
  bg("bg-fireflies", ["萤火虫", "发光的小点在黑暗中随机游走、忽明忽暗。"], ["Fireflies", "Glowing specks wander and blink in the dark."], ["elegant"],
    `.$ { background: #0a1a12; }
.$ i { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #fef08a; box-shadow: 0 0 10px 2px #facc15; animation: $-move ease-in-out infinite alternate, $-blink 2s ease-in-out infinite; }
@keyframes $-move { to { transform: translate(var(--x), var(--y)); } }
@keyframes $-blink { 0%, 100% { opacity: .2; } 50% { opacity: 1; } }`,
    () => times(18, (i) => `<i style="left:${pct(i, 20)};top:${pct(i, 21)};--x:${((rnd(i, 22) - 0.5) * 120).toFixed(0)}px;--y:${((rnd(i, 23) - 0.5) * 80).toFixed(0)}px;animation-duration:${(3 + rnd(i, 24) * 4).toFixed(1)}s,${(1 + rnd(i, 25) * 2).toFixed(1)}s"></i>`), { dark: true }),
  bg("bg-confetti", ["彩带飘落", "彩色纸片旋转着从天而降，适合庆祝场景。"], ["Confetti", "Colorful paper bits spin down from above, perfect for celebrations."], ["game"],
    `.$ i { position: absolute; top: -20px; width: 8px; height: 14px; animation: $-k linear infinite; }
@keyframes $-k { to { transform: translateY(260px) rotate(720deg) rotateY(360deg); } }`,
    () => times(36, (i) => `<i style="left:${pct(i, 26)};background:${["#f43f5e", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"][i % 6]};animation-duration:${(2.5 + rnd(i, 27) * 3).toFixed(1)}s;animation-delay:-${(rnd(i, 28) * 5).toFixed(1)}s"></i>`)),
  bg("bg-scanlines", ["CRT 扫描线", "老式显示器的扫描线和闪烁，带有一道滚动亮带。"], ["CRT Scanlines", "Old-monitor scanlines and flicker with a rolling bright band."], ["tech"],
    `.$ { background: #0a0f0a; }
.$ .t { color: #4ade80; text-shadow: 0 0 8px #22c55e; animation: $-f .15s infinite alternate; }
.$::before { content: ""; position: absolute; inset: 0; z-index: 3; background: repeating-linear-gradient(transparent 0 2px, rgb(0 0 0 / .35) 2px 4px); pointer-events: none; }
.$::after { content: ""; position: absolute; left: 0; right: 0; height: 30%; z-index: 3; background: linear-gradient(transparent, rgb(74 222 128 / .12), transparent); animation: $-k 3s linear infinite; }
@keyframes $-k { from { top: -30%; } to { top: 100%; } }
@keyframes $-f { from { opacity: .92; } to { opacity: 1; } }`, () => "", { dark: true }),
  bg("bg-sunburst", ["放射光芒", "暖色放射条纹从中心缓慢旋转。"], ["Sunburst", "Warm rays rotate slowly from the center."], ["game"],
    `.$ { background: #f59e0b; color: #451a03; }
.$::before { content: ""; position: absolute; width: 250%; aspect-ratio: 1; background: repeating-conic-gradient(#fbbf24 0 15deg, #f59e0b 15deg 30deg); animation: $-k 30s linear infinite; }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-ripples", ["水波涟漪", "一圈圈同心圆从中心向外扩散。"], ["Ripples", "Concentric circles spread out from the center."], ["elegant"],
    `.$ i { position: absolute; width: 40px; height: 40px; border-radius: 50%; border: 2px solid color-mix(in oklab, var(--accent) 60%, transparent); animation: $-k 4s ease-out infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i}s; }`)}
@keyframes $-k { from { transform: scale(0); opacity: 1; } to { transform: scale(10); opacity: 0; } }`, () => times(4, () => "<i></i>")),
  bg("bg-hexagons", ["六边形脉冲", "蜂巢状的六边形格子依次亮起。"], ["Hexagon Pulse", "Honeycomb cells light up in waves."], ["tech"],
    `.$ div { position: absolute; inset: -20px; display: flex; flex-wrap: wrap; gap: 4px; align-content: center; justify-content: center; }
.$ i { width: 40px; height: 46px; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); background: color-mix(in oklab, var(--accent) 12%, transparent); animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { background: color-mix(in oklab, var(--accent) 10%, transparent); } 50% { background: color-mix(in oklab, var(--accent) 55%, transparent); } }`,
    () => `<div>${times(60, (i) => `<i style="animation-delay:${((i % 10) * 0.15 + Math.floor(i / 10) * 0.1).toFixed(2)}s"></i>`)}</div>`),
  bg("bg-lava", ["熔岩灯", "彩色团块融合又分离，像熔岩灯一样流动。"], ["Lava Lamp", "Color blobs merge and split like a lava lamp."], ["elegant"],
    `.$ div { position: absolute; inset: 0; filter: blur(14px) contrast(20); background: #1e1b4b; }
.$ i { position: absolute; border-radius: 50%; background: #f97316; animation: $-k ease-in-out infinite alternate; }
@keyframes $-k { to { transform: translateY(var(--y)); } }`,
    () => `<div>${times(6, (i) => { const s = 40 + rnd(i, 30) * 50; return `<i style="width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;left:${(10 + rnd(i, 31) * 70).toFixed(0)}%;top:${(20 + rnd(i, 32) * 50).toFixed(0)}%;--y:${((rnd(i, 33) - 0.5) * 140).toFixed(0)}px;animation-duration:${(4 + rnd(i, 34) * 4).toFixed(1)}s"></i>`; })}</div>`, { dark: true }),
  bg("bg-floating-shapes", ["漂浮几何", "圆形、方形和三角形在背景里缓缓漂浮旋转。"], ["Floating Shapes", "Circles, squares and triangles float and turn in the background."], ["showcase"],
    `.$ i { position: absolute; width: 26px; height: 26px; border: 3px solid var(--accent); opacity: .5; animation: $-k ease-in-out infinite alternate; }
.$ i:nth-child(3n) { border-radius: 50%; }
.$ i:nth-child(3n+1) { border: 0; width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid transparent; border-bottom: 24px solid #ec4899; }
@keyframes $-k { to { transform: translateY(-30px) rotate(180deg); } }`,
    () => times(12, (i) => `<i style="left:${pct(i, 35)};top:${pct(i, 36)};animation-duration:${(3 + rnd(i, 37) * 4).toFixed(1)}s;animation-delay:-${(rnd(i, 38) * 4).toFixed(1)}s"></i>`)),
  bg("bg-beams", ["光柱扫射", "几道斜光柱从顶部来回扫动，像舞台灯光。"], ["Stage Beams", "Slanted light beams sweep back and forth like stage lights."], ["impact"],
    `.$ { background: #0b1020; }
.$ i { position: absolute; top: -20%; width: 60px; height: 160%; background: linear-gradient(rgb(255 255 255 / .35), transparent 80%); transform-origin: top; filter: blur(4px); animation: $-k ease-in-out infinite alternate; }
${times(3, (i) => `.$ i:nth-child(${i + 1}) { left: ${20 + i * 30}%; animation-duration: ${2.5 + i * 0.7}s; background: linear-gradient(${["rgb(244 114 182 / .45)", "rgb(96 165 250 / .45)", "rgb(250 204 21 / .4)"][i]}, transparent 80%); }`)}
@keyframes $-k { from { transform: rotate(-25deg); } to { transform: rotate(25deg); } }`, () => times(3, () => "<i></i>"), { dark: true }),
  bg("bg-spotlight", ["探照灯", "一束圆形探照灯光在暗处来回搜索。"], ["Searchlight", "A round searchlight scans back and forth in the dark."], ["impact"],
    `.$ { background: #000; }
.$::before { content: ""; position: absolute; inset: 0; z-index: 3; background: radial-gradient(circle 70px at var(--$-x) 50%, transparent 0, rgb(0 0 0 / .92) 100%); animation: $-k 4s ease-in-out infinite alternate; pointer-events: none; }
@property --$-x { syntax: "<percentage>"; initial-value: 30%; inherits: false; }
@keyframes $-k { from { --$-x: 20%; } to { --$-x: 80%; } }`, () => "", { dark: true }),
  bg("bg-color-cycle", ["色彩轮换", "整个背景在几种颜色之间平滑过渡。"], ["Color Cycle", "The whole background fades smoothly between colors."], ["showcase"],
    `.$ { color: #fff; animation: $-k 8s linear infinite; }
@keyframes $-k { 0%, 100% { background: #6366f1; } 25% { background: #ec4899; } 50% { background: #f59e0b; } 75% { background: #10b981; } }`, () => ""),
  bg("bg-noise", ["噪点颗粒", "电视雪花般的颗粒噪点不停跳动。"], ["Film Grain", "TV-static style grain keeps flickering."], ["tech"],
    `.$ svg { position: absolute; inset: -50%; width: 200%; height: 200%; opacity: .35; animation: $-k .4s steps(3) infinite; }
@keyframes $-k { 0% { transform: translate(0, 0); } 33% { transform: translate(-10%, 5%); } 66% { transform: translate(5%, -10%); } }`,
    () => `<svg aria-hidden="true"><filter id="$-n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#$-n)"/></svg>`),
  bg("bg-blinds", ["百叶窗", "横向百叶片依次翻转，切换背景颜色。"], ["Blinds", "Horizontal slats flip in turn to change the background color."], ["showcase"],
    `.$ div { position: absolute; inset: 0; display: grid; grid-template-rows: repeat(8, 1fr); perspective: 400px; }
.$ i { background: var(--accent); animation: $-k 4s ease-in-out infinite; }
${times(8, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.08}s; }`)}
.$ .t { color: #fff; mix-blend-mode: difference; }
@keyframes $-k { 0%, 20% { transform: rotateX(0); } 45%, 70% { transform: rotateX(90deg); } 95%, 100% { transform: rotateX(0); } }`, () => `<div>${times(8, () => "<i></i>")}</div>`),
  bg("bg-orbs-follow", ["光斑跟随", "鼠标移动时，一团柔和光斑跟随指针。"], ["Hover Glow", "A soft glow blob follows the pointer as you hover."], ["interactive"],
    `.$ { background: var(--stage); }
.$ i { position: absolute; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, color-mix(in oklab, var(--accent) 60%, transparent), transparent 70%); opacity: 0; transition: opacity .3s; pointer-events: none; }
.$:hover i { opacity: 1; }
${times(5, (r) => times(5, (c) => `.$ b:nth-of-type(${r * 5 + c + 1}) { grid-area: ${r + 1} / ${c + 1}; }\n.$:has(b:nth-of-type(${r * 5 + c + 1}):hover) i { left: calc(${c * 20 + 10}% - 60px); top: calc(${r * 20 + 10}% - 60px); }`)).replaceAll("}.", "}\n.")}
.$ i { transition: left .25s ease-out, top .25s ease-out, opacity .3s; }
.$ div { position: absolute; inset: 0; display: grid; grid: repeat(5, 1fr) / repeat(5, 1fr); z-index: 4; }`,
    () => `<i></i><div>${times(25, () => "<b></b>")}</div>`, { t: "hover" }),
];
