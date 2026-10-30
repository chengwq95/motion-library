import { counterProp, data } from "./data";
import { esc, rnd, times, w, type SnippetDef } from "./helpers";

export const dataMoreSnippets: SnippetDef[] = [
  data("data-donut", ["环形分段图", "环形图的几段颜色依次画出来。"], ["Segmented Donut", "The segments of a donut chart draw in one after another."], ["showcase"],
    `.$ { width: 100px; height: 100px; transform: rotate(-90deg); }
.$ circle { fill: none; stroke-width: 14; stroke-dasharray: 0 100; animation: $-k 3.5s ease-out infinite; }
@keyframes $-k { 0% { stroke-dasharray: 0 100; } 40%, 90% { stroke-dasharray: var(--len) 100; } 100% { stroke-dasharray: 0 100; } }`,
    () => { const parts = [[40, "var(--accent)"], [25, "var(--accent-2)"], [20, "var(--accent-3)"], [15, "var(--line)"]] as const; let off = 0;
      return `<svg class="$" viewBox="0 0 100 100" role="img" aria-label="donut chart">${parts.map(([len, c], i) => { const el = `<circle cx="50" cy="50" r="38" pathLength="100" stroke="${c}" style="--len:${len - 1};stroke-dashoffset:-${off};animation-delay:${i * 0.25}s"/>`; off += len; return el; }).join("")}</svg>`; }, { tech: "SVG" }),
  data("data-area", ["面积图", "面积图从左往右展开，填充渐变色。"], ["Area Chart", "An area chart unfolds left to right with a gradient fill."], ["showcase"],
    `.$ { width: 74%; }
.$ path:first-of-type { fill: url(#$-g); }
.$ path + path { fill: none; stroke: var(--accent); stroke-width: 2.5; }
.$ g { animation: $-k 3.5s ease-in-out infinite; }
@keyframes $-k { 0% { clip-path: inset(0 100% 0 0); } 50%, 90% { clip-path: inset(0); } 100% { clip-path: inset(0); opacity: 0; } }`,
    () => { const d = "M0 60 C30 50 40 20 70 28 S120 50 150 22 S190 10 200 14"; return `<svg class="$" viewBox="0 0 200 70" role="img" aria-label="area chart"><defs><linearGradient id="$-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".45"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><g><path d="${d} V70 H0z"/><path d="${d}"/></g></svg>`; }, { tech: "SVG" }),
  data("data-stacked", ["堆叠柱状图", "每根柱子的几段颜色由下往上依次长出来。"], ["Stacked Bars", "Each column grows its colored segments from the bottom up."], ["showcase"],
    `.$ { display: flex; align-items: flex-end; gap: 12px; height: 110px; padding-bottom: 4px; border-bottom: 2px solid var(--line); }
.$ div { width: 24px; display: flex; flex-direction: column-reverse; }
.$ i { transform-origin: bottom; animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
.$ i:nth-child(1) { background: var(--accent); } .$ i:nth-child(2) { background: var(--accent-2); } .$ i:nth-child(3) { background: var(--accent-3); border-radius: 5px 5px 0 0; }
@keyframes $-k { 0% { transform: scaleY(0); } 30%, 85% { transform: scaleY(1); } 100% { transform: scaleY(0); } }`,
    () => `<div class="$" role="img" aria-label="stacked bars">${times(5, (c) => `<div>${times(3, (k) => `<i style="height:${(12 + rnd(c * 3 + k, 90) * 22).toFixed(0)}px;animation-delay:${(c * 0.08 + k * 0.15).toFixed(2)}s"></i>`)}</div>`)}</div>`),
  data("data-radar", ["雷达图", "多边形的数据区从中心向外撑开。"], ["Radar Chart", "The data polygon expands outward from the center."], ["tech"],
    `.$ { width: 120px; height: 120px; }
.$ polygon { fill: none; stroke: var(--line); }
.$ polygon:last-child { fill: color-mix(in oklab, var(--accent) 35%, transparent); stroke: var(--accent); stroke-width: 2; transform-origin: 60px 60px; animation: $-k 3s cubic-bezier(.34,1.3,.64,1) infinite; }
@keyframes $-k { 0% { transform: scale(0); } 35%, 85% { transform: scale(1); } 100% { transform: scale(0); } }`,
    () => { const pt = (r: number, i: number) => { const a = (Math.PI * 2 * i) / 6 - Math.PI / 2; return `${(60 + r * Math.cos(a)).toFixed(1)},${(60 + r * Math.sin(a)).toFixed(1)}`; };
      const rings = [50, 34, 18].map((r) => `<polygon points="${times(6, (i) => pt(r, i) + " ")}"/>`).join("");
      const vals = [44, 30, 48, 26, 40, 34]; return `<svg class="$" viewBox="0 0 120 120" role="img" aria-label="radar chart">${rings}<polygon points="${vals.map((v, i) => pt(v, i)).join(" ")}"/></svg>`; }, { tech: "SVG" }),
  data("data-heatmap", ["热力图", "方格按随机顺序变深变浅，像活动记录。"], ["Heatmap", "Squares darken and lighten in random order like an activity log."], ["tech"],
    `.$ { display: grid; grid-template-columns: repeat(14, 12px); gap: 3px; }
.$ i { height: 12px; border-radius: 3px; background: color-mix(in oklab, #22c55e var(--v), var(--line)); animation: $-k 3s ease-in-out infinite alternate; }
@keyframes $-k { from { filter: brightness(1); } to { filter: brightness(1.5) saturate(1.3); } }`,
    () => `<div class="$" role="img" aria-label="heatmap">${times(70, (i) => `<i style="--v:${Math.round(rnd(i, 91) * 100)}%;animation-delay:-${(rnd(i, 92) * 3).toFixed(1)}s"></i>`)}</div>`),
  data("data-kpi", ["指标卡片", "大数字滚动到目标值，旁边的涨幅标签弹出来。"], ["KPI Card", "The big number rolls up to its target and the growth tag pops in."], ["impact"],
    `${counterProp}
.$ { width: 66%; padding: 18px; box-sizing: border-box; border-radius: 18px; border: 1px solid var(--line); background: var(--card); }
.$ span { font-size: 12px; color: var(--muted); }
.$ p { display: flex; align-items: baseline; gap: 10px; margin: 6px 0 0; }
.$ b { font-size: 34px; font-variant-numeric: tabular-nums; counter-reset: n var(--$-n); animation: $-k 3.5s cubic-bezier(.22,1,.36,1) infinite; }
.$ b::before { content: counter(n); }
.$ em { padding: 2px 8px; border-radius: 999px; background: rgb(34 197 94 / .15); color: #16a34a; font-style: normal; font-size: 12px; font-weight: 700; animation: $-pop 3.5s infinite; }
@keyframes $-k { 0% { --$-n: 0; } 50%, 100% { --$-n: 8420; } }
@keyframes $-pop { 0%, 45% { transform: scale(0); } 55% { transform: scale(1.2); } 62%, 100% { transform: scale(1); } }`,
    (_t, l) => `<div class="$"><span>${w(l, "本月访问量", "Visits this month")}</span><p><b></b><em>▲ 18%</em></p></div>`),
  data("data-countdown", ["倒计时", "数字从 10 倒数到 0，每一秒都轻轻弹一下。"], ["Countdown", "The number counts down from 10 to 0 with a small bounce each second."], ["impact"],
    `${counterProp}
.$ { --$-n: 10; width: 110px; height: 110px; display: grid; place-items: center; border-radius: 50%; border: 6px solid var(--line); border-top-color: var(--accent); counter-reset: n var(--$-n); font-size: 44px; font-weight: 900; font-variant-numeric: tabular-nums; animation: $-k 11s steps(11, jump-none) infinite, $-spin 1s linear infinite; }
.$::before { content: counter(n); animation: $-tick 1s ease-out infinite, $-spin 1s linear infinite reverse; }
@keyframes $-k { from { --$-n: 10; } to { --$-n: 0; } }
@keyframes $-tick { 0% { scale: 1.25; } 30%, 100% { scale: 1; } }
@keyframes $-spin { to { rotate: 360deg; } }`,
    (_t, l) => `<div class="$" role="timer" aria-label="${w(l, "倒计时", "Countdown")}"></div>`),
  data("data-scatter", ["散点图", "散点一个个弹出来落在坐标上。"], ["Scatter Plot", "Points pop into place on the axes one by one."], ["tech"],
    `.$ { position: relative; width: 70%; height: 110px; border-left: 2px solid var(--line); border-bottom: 2px solid var(--line); }
.$ i { position: absolute; width: 10px; height: 10px; margin: -5px; border-radius: 50%; background: var(--accent); opacity: .8; animation: $-k 3.5s cubic-bezier(.34,1.56,.64,1) infinite; }
.$ i:nth-child(3n) { background: var(--accent-2); }
@keyframes $-k { 0% { transform: scale(0); } 15%, 85% { transform: scale(1); } 100% { transform: scale(0); } }`,
    () => `<div class="$" role="img" aria-label="scatter plot">${times(16, (i) => { const x = rnd(i, 93); return `<i style="left:${(x * 95).toFixed(0)}%;bottom:${((x * 0.6 + rnd(i, 94) * 0.4) * 90).toFixed(0)}%;animation-delay:${(i * 0.08).toFixed(2)}s"></i>`; })}</div>`),
  data("data-ranking", ["排行条形图", "横向条形按长度依次伸出，旁边显示名次。"], ["Ranking Bars", "Horizontal bars extend one by one, each labeled with its rank."], ["showcase"],
    `.$ { width: 74%; display: grid; gap: 9px; }
.$ p { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 12px; font-weight: 700; }
.$ p span { width: 14px; color: var(--muted); }
.$ p i { height: 12px; border-radius: 6px; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transform-origin: left; animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { transform: scaleX(0); } 30%, 85% { transform: scaleX(1); } 100% { transform: scaleX(0); } }`,
    () => `<div class="$" role="img" aria-label="ranking">${[92, 74, 58, 41].map((v, i) => `<p><span>${i + 1}</span><i style="width:${v}%;animation-delay:${i * 0.12}s"></i></p>`).join("")}</div>`),
  data("data-multi-progress", ["多项进度", "几条进度条同时增长，各自停在不同的位置。"], ["Multi Progress", "Several progress bars grow together and stop at different points."], ["feedback"],
    `.$ { width: 74%; display: grid; gap: 12px; }
.$ p { margin: 0; display: grid; gap: 5px; font-size: 12px; }
.$ p span { display: flex; justify-content: space-between; color: var(--muted); }
.$ p i { height: 7px; border-radius: 7px; background: linear-gradient(var(--c), var(--c)) no-repeat 0 0 / 0% 100%, var(--line); animation: $-k 3.5s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { background-size: 0% 100%; } 50%, 90% { background-size: var(--v) 100%; } 100% { background-size: 0% 100%; } }`,
    (t, l) => `<div class="$">${[[esc(t), 82, "var(--accent)"], [w(l, "设计", "Design"), 64, "var(--accent-2)"], [w(l, "开发", "Build"), 45, "var(--accent-3)"]].map(([name, v, c]) => `<p><span>${name}<b>${v}%</b></span><i style="--v:${v}%;--c:${c}"></i></p>`).join("")}</div>`),
];
