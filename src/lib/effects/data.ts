import type { ContextKind, TriggerKind } from "../types";
import { esc, rnd, times, w, type SnippetDef } from "./helpers";

const data = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], css: string, html: SnippetDef["html"], o: { t?: TriggerKind; tech?: SnippetDef["tech"] } = {}): SnippetDef =>
  ({ id, zh, en, c: "data", t: o.t ?? "auto", m, css, html, tech: o.tech });

// Numbers that count use a registered integer property, so CSS alone can animate them.
const counterProp = "@property --$-n { syntax: \"<integer>\"; initial-value: 0; inherits: false; }";

export const dataSnippets: SnippetDef[] = [
  data("data-ring", ["进度圆环", "圆环进度从零画满，再重新开始。"], ["Progress Ring", "A ring of progress draws around to full, then restarts."], ["feedback"],
    `.$ { width: 90px; height: 90px; transform: rotate(-90deg); }
.$ circle { fill: none; stroke-width: 9; stroke-linecap: round; }
.$ circle:first-child { stroke: var(--line); }
.$ circle + circle { stroke: var(--accent); stroke-dasharray: 100; stroke-dashoffset: 100; animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 70%, 90% { stroke-dashoffset: 25; } 100% { stroke-dashoffset: 100; } }`,
    () => `<svg class="$" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" pathLength="100"/><circle cx="50" cy="50" r="40" pathLength="100"/></svg>`, { tech: "SVG" }),
  data("data-bars", ["柱状图生长", "柱子从底部依次长高，展示数据。"], ["Growing Bar Chart", "Bars grow up from the baseline one after another."], ["showcase"],
    `.$ { display: flex; align-items: flex-end; gap: 10px; height: 110px; padding-bottom: 4px; border-bottom: 2px solid var(--line); }
.$ i { width: 22px; border-radius: 6px 6px 0 0; background: var(--accent); transform-origin: bottom; animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { transform: scaleY(0); } 30%, 85% { transform: scaleY(1); } 100% { transform: scaleY(0); } }`,
    () => `<div class="$" role="img" aria-label="chart">${[60, 85, 45, 100, 70].map((h, i) => `<i style="height:${h}%;animation-delay:${i * 0.1}s"></i>`).join("")}</div>`),
  data("data-line", ["折线图描绘", "折线从左到右画出来，数据点依次出现。"], ["Line Chart Draw", "The line draws left to right and data points appear in turn."], ["showcase"],
    `.$ { width: 72%; }
.$ polyline { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linejoin: round; stroke-dasharray: 100; stroke-dashoffset: 100; animation: $-k 3s ease-in-out infinite; }
.$ circle { fill: var(--card); stroke: var(--accent); stroke-width: 2; opacity: 0; animation: $-d 3s infinite; }
@keyframes $-k { 0% { stroke-dashoffset: 100; } 50%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; opacity: 0; } }
@keyframes $-d { 0%, 50% { opacity: 0; } 55%, 90% { opacity: 1; } 100% { opacity: 0; } }`,
    () => { const pts = [[0, 60], [40, 40], [80, 50], [120, 20], [160, 30], [200, 8]]; return `<svg class="$" viewBox="-6 0 212 70" aria-hidden="true"><polyline pathLength="100" points="${pts.map((p) => p.join(",")).join(" ")}"/>${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4" style="animation-delay:${i * 0.08}s"/>`).join("")}</svg>`; }, { tech: "SVG" }),
  data("data-pie", ["饼图填充", "扇形从 0 度扫到目标角度，形成饼图。"], ["Pie Fill", "A slice sweeps from 0° to its target to form a pie chart."], ["showcase"],
    `@property --$-a { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.$ { width: 96px; height: 96px; border-radius: 50%; background: conic-gradient(var(--accent) var(--$-a), #ec4899 var(--$-a) calc(var(--$-a) + 60deg), var(--line) 0); animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0% { --$-a: 0deg; } 60%, 90% { --$-a: 220deg; } 100% { --$-a: 0deg; } }`,
    () => `<div class="$" role="img" aria-label="pie chart"></div>`),
  data("data-counter", ["数字递增", "数字从 0 快速滚动到目标值。"], ["Count Up", "A number counts quickly from 0 up to its target."], ["impact"],
    `${counterProp}
.$ { font-size: 14cqw; font-weight: 900; font-variant-numeric: tabular-nums; counter-reset: n var(--$-n); animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
.$::before { content: counter(n); }
.$::after { content: "+"; color: var(--accent); }
@keyframes $-k { 0% { --$-n: 0; } 60%, 100% { --$-n: 2048; } }`,
    (t) => `<div class="$" role="img" aria-label="${esc(t)}: 2048"></div>`),
  data("data-odometer", ["里程表滚动", "每一位数字像里程表一样向上滚动到位。"], ["Odometer", "Each digit rolls upward into place like an odometer."], ["tech"],
    `.$ { display: flex; gap: 4px; font-size: 40px; font-weight: 900; font-variant-numeric: tabular-nums; }
.$ span { height: 1.2em; overflow: hidden; padding: 0 6px; border-radius: 8px; background: var(--card); border: 1px solid var(--line); line-height: 1.2; }
.$ span div { animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { transform: translateY(0); } 50%, 90% { transform: translateY(var(--y)); } 100% { transform: translateY(0); } }`,
    () => `<div class="$" role="img" aria-label="7382">${[7, 3, 8, 2].map((d, i) => `<span><div style="--y:-${d * 1.2}em;animation-delay:${i * 0.12}s">${times(10, (k) => `${k}<br>`)}</div></span>`).join("")}</div>`),
  data("data-flip-clock", ["翻页时钟", "数字卡片上半页翻下，切换到下一个数字。"], ["Flip Clock", "The top half of the card flips down to show the next number."], ["elegant"],
    `.$ { position: relative; width: 70px; height: 84px; perspective: 300px; font-size: 54px; font-weight: 900; }
.$ i, .$ b { position: absolute; left: 0; right: 0; height: 50%; overflow: hidden; display: flex; justify-content: center; background: var(--fg); color: var(--page); font-style: normal; line-height: 84px; }
.$ i { top: 0; border-radius: 10px 10px 0 0; border-bottom: 1px solid var(--stage); transform-origin: bottom; }
.$ b { bottom: 0; border-radius: 0 0 10px 10px; line-height: 0; transform-origin: top; }
.$ .f { z-index: 1; }
.$ i.f { animation: $-top 2.4s ease-in infinite; }
.$ b.f { animation: $-bottom 2.4s ease-out infinite; }
@keyframes $-top { 0%, 20% { transform: rotateX(0); } 40%, 100% { transform: rotateX(-90deg); } }
@keyframes $-bottom { 0%, 40% { transform: rotateX(90deg); } 60%, 100% { transform: rotateX(0); } }`,
    () => `<div class="$" role="img" aria-label="clock"><i>8</i><b>7</b><i class="f">7</i><b class="f">8</b></div>`),
  data("data-gauge", ["仪表盘指针", "仪表盘指针来回摆动，读数随之变化。"], ["Gauge Needle", "A gauge needle sweeps back and forth across the dial."], ["tech"],
    `.$ { position: relative; width: 140px; height: 70px; overflow: hidden; }
.$::before { content: ""; position: absolute; inset: 0 0 -70px; border-radius: 50%; background: conic-gradient(from -90deg, #22c55e, #facc15, #ef4444 180deg, transparent 0); -webkit-mask: radial-gradient(circle, transparent 54%, #000 55%); mask: radial-gradient(circle, transparent 54%, #000 55%); }
.$ i { position: absolute; left: 50%; bottom: 0; width: 4px; height: 58px; margin-left: -2px; border-radius: 2px; background: var(--fg); transform-origin: bottom; animation: $-k 3s ease-in-out infinite alternate; }
.$::after { content: ""; position: absolute; left: 50%; bottom: -8px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; background: var(--fg); }
@keyframes $-k { from { transform: rotate(-80deg); } to { transform: rotate(70deg); } }`,
    () => `<div class="$" role="img" aria-label="gauge"><i></i></div>`),
  data("data-sparkline", ["迷你走势图", "小卡片里的走势线持续向左滚动，像实时数据。"], ["Live Sparkline", "A tiny trend line keeps scrolling left like live data."], ["tech"],
    `.$ { width: 70%; padding: 14px; box-sizing: border-box; border-radius: 14px; background: var(--card); border: 1px solid var(--line); }
.$ b { display: flex; justify-content: space-between; font-size: 13px; }
.$ b em { color: #22c55e; font-style: normal; }
.$ div { height: 50px; margin-top: 8px; overflow: hidden; }
.$ svg { width: 200%; height: 100%; animation: $-k 4s linear infinite; }
.$ polyline { fill: none; stroke: var(--accent); stroke-width: 2; }
@keyframes $-k { to { transform: translateX(-50%); } }`,
    (t) => { const pts = Array.from({ length: 21 }, (_, i) => `${i * 20},${(10 + rnd(i % 10, 40) * 30).toFixed(0)}`).join(" "); return `<div class="$"><b>${esc(t)} <em>▲ 12%</em></b><div><svg viewBox="0 0 400 50" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}"/></svg></div></div>`; }),
  data("data-steps-progress", ["分段进度", "分段的进度格依次点亮，显示完成到第几步。"], ["Segmented Progress", "Segments light up one by one to show how far along you are."], ["feedback"],
    `.$ { width: 70%; }
.$ p { display: flex; justify-content: space-between; margin: 0 0 8px; font-size: 13px; font-weight: 700; }
.$ div { display: flex; gap: 5px; }
.$ i { flex: 1; height: 10px; border-radius: 5px; background: var(--line); animation: $-k 4s infinite; }
${times(6, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.35}s; }`)}
@keyframes $-k { 0%, 5% { background: var(--line); } 10%, 80% { background: var(--accent); } 90%, 100% { background: var(--line); } }`,
    (t, l) => `<div class="$"><p><span>${esc(t)}</span><span>${w(l, "6 步", "6 steps")}</span></p><div>${times(6, () => "<i></i>")}</div></div>`),
];
