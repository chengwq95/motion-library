import { bg, pct } from "./backgrounds";
import { rnd, times, type SnippetDef } from "./helpers";

export const backgroundMoreSnippets: SnippetDef[] = [
  bg("bg-radial-pulse", ["径向呼吸", "中心的光晕慢慢放大缩小，像在呼吸。"], ["Radial Pulse", "A glow at the center slowly grows and shrinks as if breathing."], ["elegant"],
    `.$::before { content: ""; position: absolute; width: 140%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in oklab, var(--accent) 45%, transparent), transparent 60%); animation: $-k 4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: scale(.6); opacity: .6; } 50% { transform: scale(1); opacity: 1; } }`, () => ""),
  bg("bg-plasma", ["等离子", "几团彩色光在画面里交融流动，像等离子体。"], ["Plasma", "Colored glows blend and swirl across the stage like plasma."], ["tech"],
    `.$ { background: #0b0617; }
.$ i { position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%; mix-blend-mode: screen; filter: blur(24px); animation: $-k 8s ease-in-out infinite alternate; }
.$ i:nth-child(1) { background: #f0f; left: -10%; top: -20%; }
.$ i:nth-child(2) { background: #0ff; right: -10%; top: 0; animation-duration: 6s; }
.$ i:nth-child(3) { background: #ff0; left: 20%; bottom: -40%; animation-duration: 10s; }
@keyframes $-k { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(25%, 15%) scale(1.3); } 100% { transform: translate(-15%, 10%) scale(.8); } }`,
    () => times(3, () => "<i></i>"), { dark: true }),
  bg("bg-topography", ["等高线", "一圈圈等高线像地形图一样缓缓转动。"], ["Topography", "Rings of contour lines slowly rotate like a topographic map."], ["elegant"],
    `.$::before { content: ""; position: absolute; width: 180%; aspect-ratio: 1; background: repeating-radial-gradient(ellipse at 40% 45%, transparent 0 14px, color-mix(in oklab, var(--accent) 35%, transparent) 15px 16px); animation: $-k 30s linear infinite; }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-glow-cells", ["网格亮格", "网格中的格子随机亮起又熄灭。"], ["Glowing Cells", "Cells in the grid light up and fade at random."], ["tech"],
    `.$ { background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 30px 30px; }
.$ i { position: absolute; width: 29px; height: 29px; background: var(--accent); opacity: 0; animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { opacity: 0; } 50% { opacity: .5; } }`,
    () => times(14, (i) => `<i style="left:${Math.floor(rnd(i, 50) * 12) * 30 + 1}px;top:${Math.floor(rnd(i, 51) * 7) * 30 + 1}px;animation-delay:-${(rnd(i, 52) * 3).toFixed(1)}s"></i>`)),
  bg("bg-light-streaks", ["流光线条", "细长的光线斜着划过画面。"], ["Light Streaks", "Thin streaks of light shoot diagonally across the stage."], ["impact"],
    `.$ { background: #05060a; }
.$ i { position: absolute; width: 120px; height: 2px; background: linear-gradient(90deg, transparent, #a5b4fc, #fff); transform: rotate(-30deg); animation: $-k linear infinite; }
@keyframes $-k { from { translate: -150px 120px; opacity: 0; } 10% { opacity: 1; } to { translate: 500px -180px; opacity: 0; } }`,
    () => times(10, (i) => `<i style="left:${pct(i, 53)};top:${pct(i, 54)};animation-duration:${(1.5 + rnd(i, 55) * 2).toFixed(1)}s;animation-delay:-${(rnd(i, 56) * 3).toFixed(1)}s"></i>`), { dark: true }),
  bg("bg-concentric", ["同心虚线圆", "几圈虚线同心圆朝不同方向转动。"], ["Dashed Rings", "Concentric dashed rings turn in opposite directions."], ["tech"],
    `.$ i { position: absolute; border-radius: 50%; border: 2px dashed color-mix(in oklab, var(--accent) 50%, transparent); animation: $-k linear infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { width: ${80 + i * 70}px; height: ${80 + i * 70}px; animation-duration: ${10 + i * 5}s; animation-direction: ${i % 2 ? "reverse" : "normal"}; }`)}
@keyframes $-k { to { transform: rotate(360deg); } }`, () => times(4, () => "<i></i>")),
  bg("bg-code-rain", ["字符雨", "一列列绿色字符从上往下落下，像黑客电影。"], ["Code Rain", "Columns of green characters pour down like a hacker movie."], ["tech"],
    `.$ { background: #000; }
.$ i { position: absolute; top: 0; font-family: ui-monospace, monospace; font-size: 13px; line-height: 1.1; font-style: normal; color: #22c55e; writing-mode: vertical-lr; text-shadow: 0 0 6px #22c55e; -webkit-mask-image: linear-gradient(transparent, #000 70%); mask-image: linear-gradient(transparent, #000 70%); animation: $-k linear infinite; }
.$ .t { color: #bbf7d0; text-shadow: 0 0 10px #22c55e; }
@keyframes $-k { from { transform: translateY(-100%); } to { transform: translateY(120%); } }`,
    () => times(18, (i) => `<i style="left:${(i * 5.6).toFixed(1)}%;animation-duration:${(2 + rnd(i, 57) * 3).toFixed(1)}s;animation-delay:-${(rnd(i, 58) * 4).toFixed(1)}s">${times(14, (k) => "01{}/=+*#%"[Math.floor(rnd(i * 20 + k, 59) * 10)])}</i>`), { dark: true }),
  bg("bg-clouds", ["云朵飘过", "几朵白云在蓝天里慢慢飘过。"], ["Drifting Clouds", "White clouds drift slowly across a blue sky."], ["elegant"],
    `.$ { background: linear-gradient(#7dd3fc, #e0f2fe); color: #0c4a6e; }
.$ i { position: absolute; height: 28px; border-radius: 28px; background: #fff; animation: $-k linear infinite; }
.$ i::before, .$ i::after { content: ""; position: absolute; border-radius: 50%; background: #fff; }
.$ i::before { width: 40%; aspect-ratio: 1; left: 15%; bottom: 40%; }
.$ i::after { width: 30%; aspect-ratio: 1; left: 45%; bottom: 30%; }
@keyframes $-k { from { transform: translateX(-160px); } to { transform: translateX(460px); } }`,
    () => times(5, (i) => `<i style="top:${(10 + rnd(i, 60) * 60).toFixed(0)}%;width:${(70 + rnd(i, 61) * 60).toFixed(0)}px;opacity:${(0.6 + rnd(i, 62) * 0.4).toFixed(2)};animation-duration:${(14 + rnd(i, 63) * 14).toFixed(0)}s;animation-delay:-${(rnd(i, 64) * 20).toFixed(0)}s"></i>`)),
  bg("bg-sakura", ["樱花飘落", "粉色花瓣打着旋儿飘落下来。"], ["Cherry Blossoms", "Pink petals twirl down from above."], ["elegant"],
    `.$ { background: linear-gradient(#fdf2f8, #fce7f3); color: #831843; }
.$ i { position: absolute; top: -20px; width: 12px; height: 10px; border-radius: 12px 0 12px 0; background: #f9a8d4; animation: $-k linear infinite; }
@keyframes $-k { 0% { transform: translate(0, 0) rotate(0); } 50% { transform: translate(30px, 120px) rotate(180deg) rotateX(180deg); } 100% { transform: translate(-10px, 250px) rotate(360deg); } }`,
    () => times(24, (i) => `<i style="left:${pct(i, 65)};animation-duration:${(5 + rnd(i, 66) * 5).toFixed(1)}s;animation-delay:-${(rnd(i, 67) * 8).toFixed(1)}s;scale:${(0.6 + rnd(i, 68) * 0.8).toFixed(2)}"></i>`)),
  bg("bg-balloons", ["气球升空", "彩色气球摇摇晃晃地往上飘。"], ["Balloons", "Colorful balloons sway as they float upward."], ["game"],
    `.$ i { position: absolute; bottom: -60px; width: 30px; height: 38px; border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%; animation: $-k linear infinite; }
.$ i::after { content: ""; position: absolute; left: 50%; top: 100%; width: 1px; height: 26px; background: var(--muted); }
@keyframes $-k { 0% { transform: translate(0, 0) rotate(-5deg); } 50% { transform: translate(14px, -150px) rotate(5deg); } 100% { transform: translate(-6px, -300px) rotate(-5deg); } }`,
    () => times(10, (i) => `<i style="left:${(5 + i * 9.5).toFixed(0)}%;background:${["#f43f5e", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"][i % 5]};animation-duration:${(6 + rnd(i, 69) * 5).toFixed(1)}s;animation-delay:-${(rnd(i, 70) * 9).toFixed(1)}s"></i>`)),
  bg("bg-sunset-sea", ["海上日落", "夕阳慢慢沉入海面，海面上的倒影一闪一闪。"], ["Sunset Sea", "The sun slowly sinks into the sea while its reflection shimmers."], ["elegant"],
    `.$ { background: linear-gradient(#fb923c, #f472b6 55%, #312e81 55%, #1e1b4b); color: #fff; }
.$::before { content: ""; position: absolute; left: 50%; width: 90px; height: 90px; margin-left: -45px; border-radius: 50%; background: #fde047; box-shadow: 0 0 40px #fde047; animation: $-k 8s ease-in-out infinite alternate; }
.$::after { content: ""; position: absolute; left: 50%; top: 56%; width: 120px; height: 40%; margin-left: -60px; background: repeating-linear-gradient(transparent 0 6px, rgb(253 224 71 / .55) 6px 9px); -webkit-mask-image: linear-gradient(#000, transparent); mask-image: linear-gradient(#000, transparent); animation: $-r 1.6s ease-in-out infinite alternate; }
.$ .t { text-shadow: 0 2px 12px rgb(0 0 0 / .4); }
@keyframes $-k { from { top: 18%; } to { top: 44%; } }
@keyframes $-r { from { transform: scaleX(.85); opacity: .7; } to { transform: scaleX(1.1); opacity: 1; } }`, () => "", { dark: true }),
  bg("bg-fog", ["雾气流动", "一层层朦胧的雾气缓缓横向流动。"], ["Rolling Fog", "Layers of soft fog roll slowly sideways."], ["elegant"],
    `.$ { background: linear-gradient(#1e293b, #334155); }
.$ i { position: absolute; left: -50%; width: 200%; height: 60%; border-radius: 50%; background: radial-gradient(ellipse, rgb(255 255 255 / .22), transparent 65%); filter: blur(10px); animation: $-k linear infinite alternate; }
${times(3, (i) => `.$ i:nth-child(${i + 1}) { top: ${10 + i * 25}%; animation-duration: ${12 + i * 5}s; animation-delay: -${i * 4}s; }`)}
@keyframes $-k { from { transform: translateX(-15%); } to { transform: translateX(15%); } }`, () => times(3, () => "<i></i>"), { dark: true }),
  bg("bg-sound-wave", ["声波背景", "铺满画面的竖条随着节奏上下跳动。"], ["Sound Wave", "Bars across the whole stage jump to a beat."], ["showcase"],
    `.$ div { position: absolute; inset: 0; display: flex; align-items: center; gap: 4px; padding: 0 6px; }
.$ i { flex: 1; height: 70%; border-radius: 3px; background: color-mix(in oklab, var(--accent) 35%, transparent); animation: $-k ease-in-out infinite alternate; }
@keyframes $-k { from { transform: scaleY(.1); } to { transform: scaleY(1); } }`,
    () => `<div>${times(36, (i) => `<i style="animation-duration:${(0.4 + rnd(i, 71) * 0.8).toFixed(2)}s;animation-delay:-${rnd(i, 72).toFixed(2)}s"></i>`)}</div>`),
  bg("bg-dot-wave", ["点阵波浪", "一片圆点按对角线依次放大，形成波浪。"], ["Dot Wave", "A field of dots scales up along the diagonal, forming a wave."], ["tech"],
    `.$ div { position: absolute; inset: -10px; display: grid; grid-template-columns: repeat(16, 1fr); place-items: center; }
.$ i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: scale(.3); opacity: .3; } 50% { transform: scale(1.2); opacity: 1; } }`,
    () => `<div>${times(128, (i) => `<i style="animation-delay:${(((i % 16) + Math.floor(i / 16)) * 0.08).toFixed(2)}s"></i>`)}</div>`),
  bg("bg-kaleidoscope", ["万花筒", "对称的彩色花纹在中心不停旋转变化。"], ["Kaleidoscope", "Symmetric colorful patterns keep turning around the center."], ["game"],
    `.$::before, .$::after { content: ""; position: absolute; width: 200%; aspect-ratio: 1; background: repeating-conic-gradient(from 0deg, #f43f5e 0 15deg, #f59e0b 15deg 30deg, #22c55e 30deg 45deg, #3b82f6 45deg 60deg); mix-blend-mode: multiply; opacity: .5; animation: $-k 16s linear infinite; }
.$::after { animation-direction: reverse; animation-duration: 11s; }
:root[data-theme="dark"] .$::before, :root[data-theme="dark"] .$::after { mix-blend-mode: screen; opacity: .35; }
.$ .t { padding: 6px 16px; border-radius: 999px; background: var(--card); }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-glass-orbs", ["玻璃球体", "几个半透明的玻璃球在磨砂背景后缓缓飘动。"], ["Glass Orbs", "Translucent glass spheres drift behind a frosted layer."], ["elegant"],
    `.$ i { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #fff, var(--accent) 40%, transparent 70%); opacity: .8; animation: $-k ease-in-out infinite alternate; }
.$::after { content: ""; position: absolute; inset: 18%; border-radius: 22px; border: 1px solid rgb(255 255 255 / .35); background: rgb(255 255 255 / .12); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
@keyframes $-k { to { transform: translate(var(--x), var(--y)); } }`,
    () => times(5, (i) => { const s = 40 + rnd(i, 73) * 60; return `<i style="width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;left:${pct(i, 74)};top:${pct(i, 75)};--x:${((rnd(i, 76) - 0.5) * 80).toFixed(0)}px;--y:${((rnd(i, 77) - 0.5) * 60).toFixed(0)}px;animation-duration:${(4 + rnd(i, 78) * 4).toFixed(1)}s"></i>`; })),
  bg("bg-meteors", ["流星雨", "一颗颗流星拖着长尾巴划过夜空。"], ["Meteor Shower", "Meteors with long tails streak across the night sky."], ["impact"],
    `.$ { background: radial-gradient(ellipse at top, #1e1b4b, #020617); }
.$ i { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: #fff; box-shadow: 0 0 6px 2px rgb(255 255 255 / .6); animation: $-k linear infinite; }
.$ i::after { content: ""; position: absolute; right: 1px; top: 0; width: 90px; height: 1px; background: linear-gradient(90deg, #fff, transparent); transform-origin: right; transform: translateX(90px) rotate(0); }
@keyframes $-k { 0% { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(215deg) translateX(-420px); opacity: 0; } }`,
    () => times(8, (i) => `<i style="left:${(40 + rnd(i, 79) * 60).toFixed(0)}%;top:${(rnd(i, 80) * 40).toFixed(0)}%;animation-duration:${(1.5 + rnd(i, 81) * 2).toFixed(1)}s;animation-delay:-${(rnd(i, 82) * 4).toFixed(1)}s"></i>`), { dark: true }),
  bg("bg-tile-flip", ["瓷砖翻转", "方格瓷砖按对角线依次翻面，颜色随之变化。"], ["Tile Flip", "Square tiles flip along the diagonal, changing color as they turn."], ["showcase"],
    `.$ div { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(8, 1fr); grid-auto-rows: 1fr; gap: 2px; perspective: 500px; }
.$ i { background: color-mix(in oklab, var(--accent) 25%, var(--stage)); animation: $-k 4s ease-in-out infinite; }
.$ .t { padding: 4px 14px; border-radius: 10px; background: var(--card); }
@keyframes $-k { 0%, 20% { transform: rotateY(0); background: color-mix(in oklab, var(--accent) 25%, var(--stage)); } 50%, 70% { transform: rotateY(180deg); background: color-mix(in oklab, var(--accent-2) 30%, var(--stage)); } 100% { transform: rotateY(360deg); } }`,
    () => `<div>${times(40, (i) => `<i style="animation-delay:${(((i % 8) + Math.floor(i / 8)) * 0.08).toFixed(2)}s"></i>`)}</div>`),
  bg("bg-glow-frame", ["发光边框", "一圈渐变光沿着画面边框不停旋转。"], ["Glowing Frame", "A gradient glow keeps circling around the edge of the stage."], ["tech"],
    `.$::before { content: ""; position: absolute; width: 200%; aspect-ratio: 1; background: conic-gradient(transparent 60%, var(--accent), var(--accent-2), transparent 90%); animation: $-k 4s linear infinite; }
.$::after { content: ""; position: absolute; inset: 3px; border-radius: inherit; background: var(--stage); }
@keyframes $-k { to { transform: rotate(360deg); } }`, () => ""),
  bg("bg-bokeh", ["散景光斑", "大小不一的柔焦光斑忽明忽暗地漂浮。"], ["Bokeh", "Soft out-of-focus light spots of different sizes float and twinkle."], ["elegant"],
    `.$ { background: #0b0a14; }
.$ i { position: absolute; border-radius: 50%; filter: blur(2px); animation: $-k ease-in-out infinite alternate; }
@keyframes $-k { from { opacity: .15; transform: scale(.8); } to { opacity: .7; transform: scale(1.1) translateY(-10px); } }`,
    () => times(16, (i) => { const s = 14 + rnd(i, 83) * 46; return `<i style="width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;left:${pct(i, 84)};top:${pct(i, 85)};background:${["#f472b6", "#a78bfa", "#fbbf24", "#60a5fa"][i % 4]};animation-duration:${(2 + rnd(i, 86) * 3).toFixed(1)}s;animation-delay:-${(rnd(i, 87) * 3).toFixed(1)}s"></i>`; }), { dark: true }),
  bg("bg-northern-lights", ["极光", "几条绿紫色的光带在夜空中缓慢摇摆、交叠。"], ["Northern Lights", "Green and violet ribbons of light sway and overlap slowly in the night sky."], ["elegant"],
    `.$ { background: linear-gradient(#020617, #0b1026 70%, #111827); }
.$ i { position: absolute; left: -20%; width: 140%; height: 38%; border-radius: 50%; filter: blur(28px); mix-blend-mode: screen; opacity: .7; animation: $-k ease-in-out infinite alternate; }
@keyframes $-k { from { transform: translateX(-8%) skewY(-6deg) scaleY(.8); } to { transform: translateX(8%) skewY(6deg) scaleY(1.2); } }`,
    () => times(3, (i) => `<i style="top:${10 + i * 14}%;background:linear-gradient(90deg, transparent, ${["#34d399", "#22d3ee", "#a78bfa"][i]}, transparent);animation-duration:${6 + i * 2}s;animation-delay:-${i * 2}s"></i>`), { dark: true }),
];
