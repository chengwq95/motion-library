import { esc, times, type SnippetDef } from "./helpers";
import { box, load, n, spin } from "./loaders";

export const loaderMoreSnippets: SnippetDef[] = [
  load("squares-row", ["方块接力", "一排小方块依次亮起又熄灭，像接力传递。"], ["Square Relay", "A row of squares light up and fade in turn, like passing a baton."],
    `.$ { display: flex; gap: 6px; }
.$ i { width: 14px; height: 14px; border-radius: 3px; background: var(--line); animation: $-k 1.2s infinite; }
${times(5, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.12}s; }`)}
@keyframes $-k { 0%, 60%, 100% { background: var(--line); transform: none; } 20% { background: var(--accent); transform: translateY(-4px); } }`, n(5)),
  load("dot-ring", ["圆点环", "八个圆点围成一圈，亮点沿着圆环转动。"], ["Dot Ring", "Eight dots form a ring and a bright spot travels around it."],
    `.$ { position: relative; width: 52px; height: 52px; }
.$ i { position: absolute; left: 21px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); transform-origin: 5px 26px; animation: $-k 1s linear infinite; }
${times(8, (i) => `.$ i:nth-child(${i + 1}) { transform: rotate(${i * 45}deg); animation-delay: ${(-1 + i * 0.125).toFixed(3)}s; }`)}
@keyframes $-k { 0% { opacity: 1; } 100% { opacity: .15; } }`, n(8)),
  load("triple-arcs", ["三弧嵌套", "三段大小不同的圆弧以不同速度旋转。"], ["Nested Arcs", "Three arcs of different sizes spin at different speeds."],
    `.$ { position: relative; width: 60px; height: 60px; }
.$ i { position: absolute; border-radius: 50%; border: 3px solid transparent; animation: $-spin linear infinite; }
.$ i:nth-child(1) { inset: 0; border-top-color: var(--accent); animation-duration: 1.4s; }
.$ i:nth-child(2) { inset: 9px; border-right-color: var(--accent-2); animation-duration: 1s; animation-direction: reverse; }
.$ i:nth-child(3) { inset: 18px; border-bottom-color: var(--accent-3); animation-duration: .7s; }
${spin}`, n(3), ["tech"]),
  load("pacman", ["吃豆人", "吃豆人张嘴吃掉一个个飘过来的豆子。"], ["Chomper", "A chomping mouth eats dots that float toward it."],
    `.$ { position: relative; display: flex; align-items: center; width: 110px; }
.$ b { position: relative; z-index: 1; width: 44px; height: 44px; }
.$ b::before, .$ b::after { content: ""; position: absolute; left: 0; width: 44px; height: 22px; background: #facc15; }
.$ b::before { top: 0; border-radius: 22px 22px 0 0; transform-origin: 50% 100%; animation: $-top .4s ease-in-out infinite alternate; }
.$ b::after { bottom: 0; border-radius: 0 0 22px 22px; transform-origin: 50% 0; animation: $-bot .4s ease-in-out infinite alternate; }
.$ i { position: absolute; left: 30px; width: 8px; height: 8px; border-radius: 50%; background: var(--fg); animation: $-dot 1.2s linear infinite; }
.$ i:nth-of-type(2) { animation-delay: -.4s; } .$ i:nth-of-type(3) { animation-delay: -.8s; }
@keyframes $-top { from { transform: rotate(0); } to { transform: rotate(-35deg); } }
@keyframes $-bot { from { transform: rotate(0); } to { transform: rotate(35deg); } }
@keyframes $-dot { from { transform: translateX(80px); } to { transform: translateX(0); } }`, box("<b></b><i></i><i></i><i></i>"), ["game"]),
  load("cube-3d", ["3D 立方体", "一个半透明立方体在空中缓缓翻转。"], ["3D Cube", "A translucent cube slowly tumbles in space."],
    `.$ { width: 44px; height: 44px; perspective: 300px; }
.$ div { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: $-k 3s linear infinite; }
.$ i { position: absolute; inset: 0; border: 2px solid var(--accent); background: color-mix(in oklab, var(--accent) 18%, transparent); }
${["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"].map((r, i) => `.$ i:nth-child(${i + 1}) { transform: ${r} translateZ(22px); }`).join("\n")}
@keyframes $-k { to { transform: rotateX(360deg) rotateY(360deg); } }`, box(`<div>${times(6, () => "<i></i>")}</div>`), ["tech"]),
  load("breathing-ring", ["呼吸光环", "渐变光环缓慢放大缩小，像在呼吸。"], ["Breathing Ring", "A gradient ring slowly swells and shrinks as if breathing."],
    `.$ { width: 56px; height: 56px; border-radius: 50%; background: conic-gradient(var(--accent), var(--accent-2), var(--accent-3), var(--accent)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0); mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0); animation: $-k 2s ease-in-out infinite, $-spin 4s linear infinite; }
@keyframes $-k { 0%, 100% { scale: .8; opacity: .6; } 50% { scale: 1.1; opacity: 1; } }
${spin}`, box(), ["elegant"]),
  load("flip-cards", ["翻牌加载", "三张小卡片依次翻转。"], ["Flipping Tiles", "Three small tiles flip over one after another."],
    `.$ { display: flex; gap: 8px; perspective: 200px; }
.$ i { width: 18px; height: 26px; border-radius: 4px; background: var(--accent); animation: $-k 1.5s ease-in-out infinite; }
.$ i:nth-child(2) { animation-delay: .2s; background: var(--accent-2); } .$ i:nth-child(3) { animation-delay: .4s; background: var(--accent-3); }
@keyframes $-k { 0%, 60%, 100% { transform: rotateY(0); } 30% { transform: rotateY(180deg); } }`, n(3), ["game"]),
  load("dash-spinner", ["虚线旋转", "SVG 虚线圆弧一边转一边伸缩。"], ["Dashed Spinner", "A dashed SVG arc rotates while its dashes stretch and shrink."],
    `.$ { width: 54px; height: 54px; animation: $-spin 1.6s linear infinite; }
.$ circle { fill: none; stroke: var(--accent); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 10 14; animation: $-k 1.6s ease-in-out infinite; }
@keyframes $-k { 50% { stroke-dasharray: 30 6; } }
${spin}`, () => `<svg class="$" viewBox="0 0 54 54" role="img" aria-label="loading"><circle cx="27" cy="27" r="22"/></svg>`, ["tech"], "SVG"),
  load("shimmer-text-loader", ["文字流光加载", "灰色的文字上有一道光反复扫过。"], ["Shimmer Text Loader", "A sheen sweeps repeatedly over grey loading text."],
    `.$ { font-size: 8cqw; font-weight: 800; background: linear-gradient(90deg, var(--line) 30%, var(--fg) 50%, var(--line) 70%) 0 0 / 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 1.6s linear infinite; }
@keyframes $-k { from { background-position: 100% 0; } to { background-position: -150% 0; } }`, (t) => `<div class="$" role="status">${esc(t)}</div>`),
  load("coffee-loader", ["咖啡热气", "一杯咖啡上方飘起几缕热气。"], ["Steaming Coffee", "Wisps of steam rise from a cup of coffee."],
    `.$ { position: relative; width: 56px; height: 70px; }
.$ b { position: absolute; bottom: 0; left: 4px; width: 40px; height: 34px; border-radius: 0 0 14px 14px; background: var(--fg); }
.$ b::after { content: ""; position: absolute; right: -12px; top: 6px; width: 10px; height: 14px; border: 4px solid var(--fg); border-left: 0; border-radius: 0 10px 10px 0; }
.$ i { position: absolute; bottom: 38px; width: 4px; height: 18px; border-radius: 4px; background: var(--muted); opacity: 0; animation: $-k 2s ease-out infinite; }
${times(3, (i) => `.$ i:nth-of-type(${i + 1}) { left: ${12 + i * 10}px; animation-delay: ${i * 0.5}s; }`)}
@keyframes $-k { 0% { opacity: 0; transform: translateY(0) scaleY(.6); } 30% { opacity: .8; } 100% { opacity: 0; transform: translateY(-22px) scaleY(1.2) skewX(15deg); } }`, box("<b></b><i></i><i></i><i></i>"), ["elegant"]),
  load("book-loader", ["翻书", "书页一页页从右翻到左。"], ["Turning Pages", "Pages flip over from right to left."],
    `.$ { position: relative; width: 70px; height: 46px; perspective: 300px; }
.$::before, .$::after { content: ""; position: absolute; top: 0; width: 34px; height: 46px; background: var(--card); border: 2px solid var(--fg); }
.$::before { left: 0; border-radius: 6px 0 0 6px; } .$::after { right: 0; border-radius: 0 6px 6px 0; }
.$ i { position: absolute; z-index: 1; top: 0; left: 35px; width: 34px; height: 46px; box-sizing: border-box; border: 2px solid var(--fg); border-radius: 0 6px 6px 0; background: color-mix(in oklab, var(--accent) 25%, var(--card)); transform-origin: left; animation: $-k 1.8s ease-in-out infinite; }
.$ i:nth-of-type(2) { animation-delay: .3s; } .$ i:nth-of-type(3) { animation-delay: .6s; }
@keyframes $-k { 0%, 10% { transform: rotateY(0); } 60%, 100% { transform: rotateY(-180deg); } }`, n(3), ["elegant"]),
  load("zigzag-progress", ["折线进度", "一条折线从左往右被画出来，再收回。"], ["Zigzag Progress", "A zigzag line draws itself left to right, then retracts."],
    `.$ { width: 120px; }
.$ polyline { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.$ polyline:first-child { stroke: var(--line); }
.$ polyline + polyline { stroke: var(--accent); stroke-dasharray: 100; animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0% { stroke-dashoffset: 100; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -100; } }`,
    () => `<svg class="$" viewBox="0 0 120 30" role="img" aria-label="loading">${times(2, () => `<polyline pathLength="100" points="2,22 22,6 42,22 62,6 82,22 102,6 118,22"/>`)}</svg>`, ["tech"], "SVG"),
  load("square-ripple", ["方形涟漪", "圆角方框一层层向外扩散。"], ["Square Ripple", "Rounded squares ripple outward layer by layer."],
    `.$ { position: relative; width: 64px; height: 64px; }
.$ i { position: absolute; inset: 0; border-radius: 12px; border: 3px solid var(--accent); animation: $-k 1.8s ease-out infinite; }
.$ i:nth-child(2) { animation-delay: .6s; } .$ i:nth-child(3) { animation-delay: 1.2s; }
@keyframes $-k { from { transform: scale(.2) rotate(0); opacity: 1; } to { transform: scale(1) rotate(90deg); opacity: 0; } }`, n(3)),
  load("heart-fill-loader", ["爱心充能", "空心爱心从下往上被红色慢慢灌满。"], ["Heart Charge", "An outlined heart slowly fills with red from the bottom up."],
    `.$ { width: 60px; height: 56px; }
.$ path { stroke: #f43f5e; stroke-width: 2.5; }
.$ rect { fill: #f43f5e; transform-origin: bottom; animation: $-k 2.4s ease-in-out infinite; }
@keyframes $-k { 0% { transform: scaleY(0); } 70%, 90% { transform: scaleY(1); } 100% { transform: scaleY(0); } }`,
    () => `<svg class="$" viewBox="0 0 60 56" role="img" aria-label="loading"><defs><clipPath id="$-c"><path d="M30 52S4 36 4 18A13 13 0 0 1 30 12a13 13 0 0 1 26 6c0 18-26 34-26 34z"/></clipPath></defs><rect width="60" height="56" clip-path="url(#$-c)"/><path fill="none" d="M30 52S4 36 4 18A13 13 0 0 1 30 12a13 13 0 0 1 26 6c0 18-26 34-26 34z"/></svg>`, ["feedback"], "SVG"),
  load("yin-yang", ["太极旋转", "黑白太极图平稳旋转。"], ["Yin Yang", "A yin-yang symbol spins steadily."],
    `.$ { position: relative; width: 56px; height: 56px; border-radius: 50%; border: 2px solid var(--fg); background: linear-gradient(90deg, var(--fg) 50%, var(--page) 50%); animation: $-spin 2.4s linear infinite; }
.$::before, .$::after { content: ""; position: absolute; left: 50%; width: 28px; height: 28px; margin-left: -14px; border-radius: 50%; box-sizing: border-box; border: 10px solid; }
.$::before { top: 0; background: var(--page); border-color: var(--fg); }
.$::after { bottom: 0; background: var(--fg); border-color: var(--page); }
${spin}`, box(), ["elegant"]),
  load("bar-bounce", ["进度条弹球", "一个小方块在细长的轨道里左右来回。"], ["Bouncing Block", "A small block bounces back and forth along a thin track."],
    `.$ { position: relative; width: 70%; height: 8px; border-radius: 8px; background: var(--line); }
.$::after { content: ""; position: absolute; top: -4px; width: 16px; height: 16px; border-radius: 5px; background: var(--accent); animation: $-k 1.2s cubic-bezier(.65,0,.35,1) infinite alternate; }
@keyframes $-k { from { left: 0; transform: rotate(0); } to { left: calc(100% - 16px); transform: rotate(180deg); } }`, box()),
  load("gooey-dots", ["融合圆点", "两个圆点靠近时像液体一样黏在一起。"], ["Gooey Dots", "Two dots stick together like liquid as they pass."],
    `.$ { position: relative; width: 96px; height: 40px; border-radius: 999px; filter: blur(4px) contrast(12); background: var(--card); }
.$ i { position: absolute; top: 10px; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); }
.$ i:first-child { left: 35px; }
.$ i:last-child { animation: $-k 1.6s ease-in-out infinite alternate; }
@keyframes $-k { from { left: 6px; } to { left: 64px; } }`, n(2), ["tech"]),
  load("triangle-draw", ["三角描边", "三角形的边被一段线条不停描绘。"], ["Triangle Trace", "A segment of line keeps tracing around a triangle."],
    `.$ { width: 60px; height: 56px; }
.$ path { fill: none; stroke-width: 4; stroke-linejoin: round; stroke-linecap: round; }
.$ path:first-child { stroke: var(--line); }
.$ path + path { stroke: var(--accent); stroke-dasharray: 30 70; animation: $-k 1.4s linear infinite; }
@keyframes $-k { to { stroke-dashoffset: -100; } }`,
    () => `<svg class="$" viewBox="0 0 60 56" role="img" aria-label="loading">${times(2, () => `<path pathLength="100" d="M30 4 56 52H4z"/>`)}</svg>`, ["tech"], "SVG"),
  load("clock-dots", ["点钟填充", "十二个点像钟表刻度一样一个个点亮。"], ["Clock Dots", "Twelve dots light up one by one like the marks on a clock."],
    `.$ { position: relative; width: 60px; height: 60px; }
.$ i { position: absolute; left: 27px; top: 0; width: 6px; height: 6px; border-radius: 50%; background: var(--line); transform-origin: 3px 30px; animation: $-k 2.4s steps(1) infinite; }
${times(12, (i) => `.$ i:nth-child(${i + 1}) { transform: rotate(${i * 30}deg); animation-delay: ${(i * 0.1).toFixed(1)}s; }`)}
@keyframes $-k { 0% { background: var(--line); } 1%, 60% { background: var(--accent); } 61%, 100% { background: var(--line); } }`, n(12)),
  load("rocket-loader", ["火箭升空", "小火箭上下颠簸，尾部火焰闪烁。"], ["Rocket", "A little rocket rumbles up and down with a flickering flame."],
    `.$ { position: relative; font-size: 44px; line-height: 1; animation: $-k .3s ease-in-out infinite alternate; }
.$::after { content: ""; position: absolute; left: 4px; bottom: -4px; width: 14px; height: 18px; border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%; background: linear-gradient(#fde047, #f97316); transform: rotate(45deg); filter: blur(1px); animation: $-f .15s infinite alternate; }
@keyframes $-k { from { transform: translate(0, 0); } to { transform: translate(2px, -3px); } }
@keyframes $-f { from { opacity: .7; scale: .8; } to { opacity: 1; scale: 1.15; } }`, box("🚀"), ["game"]),
  load("saturn", ["土星环", "星球外的光环在 3D 空间里倾斜旋转。"], ["Saturn", "The planet's ring tilts and spins in 3D."],
    `.$ { position: relative; width: 70px; height: 70px; display: grid; place-items: center; perspective: 300px; }
.$::before { content: ""; width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-3), var(--accent-2)); }
.$ i { position: absolute; inset: 4px; border-radius: 50%; border: 3px solid var(--accent); border-left-color: transparent; transform: rotateX(70deg); animation: $-k 2s linear infinite; }
@keyframes $-k { to { transform: rotateX(70deg) rotateZ(360deg); } }`, n(1), ["tech"]),
  load("ellipsis-loader", ["省略号加载", "文字后面的三个点一个个出现。"], ["Animated Ellipsis", "Three dots appear one by one after the text."],
    `.$ { font-size: 7cqw; font-weight: 700; color: var(--fg); }
.$ i { font-style: normal; opacity: 0; animation: $-k 1.4s infinite; }
.$ i:nth-of-type(2) { animation-delay: .2s; } .$ i:nth-of-type(3) { animation-delay: .4s; }
@keyframes $-k { 0%, 20% { opacity: 0; } 40%, 80% { opacity: 1; } 100% { opacity: 0; } }`,
    (t) => `<div class="$" role="status">${esc(t)}<i>.</i><i>.</i><i>.</i></div>`),
  load("spinner-to-check", ["加载完成", "转圈的圆弧收拢成一个完整的圆，再画出对勾。"], ["Spinner to Check", "The spinning arc closes into a full circle and draws a check mark."],
    `.$ { width: 60px; height: 60px; }
.$ circle, .$ path { fill: none; stroke-width: 4; stroke-linecap: round; }
.$ circle { stroke: #22c55e; transform-origin: center; stroke-dasharray: 100; animation: $-c 3s infinite; }
.$ path { stroke: #22c55e; stroke-dasharray: 100; stroke-dashoffset: 100; animation: $-p 3s infinite; }
@keyframes $-c { 0% { stroke-dashoffset: 75; transform: rotate(0); } 40% { stroke-dashoffset: 75; transform: rotate(720deg); } 55%, 90% { stroke-dashoffset: 0; transform: rotate(720deg); } 100% { stroke-dashoffset: 75; transform: rotate(720deg); } }
@keyframes $-p { 0%, 55% { stroke-dashoffset: 100; } 70%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 100; } }`,
    () => `<svg class="$" viewBox="0 0 60 60" role="img" aria-label="loading"><circle pathLength="100" cx="30" cy="30" r="25"/><path pathLength="100" d="M19 31l8 8 15-17"/></svg>`, ["feedback"], "SVG"),
  load("download-loader", ["下载中", "箭头不停向下弹跳，下面的进度条慢慢填满。"], ["Downloading", "An arrow keeps bouncing down while the bar below fills up."],
    `.$ { display: grid; justify-items: center; gap: 10px; width: 70%; }
.$ b { font-size: 26px; color: var(--accent); animation: $-k .8s ease-in-out infinite; }
.$ i { width: 100%; height: 6px; border-radius: 6px; background: linear-gradient(var(--accent), var(--accent)) no-repeat 0 0 / 0% 100%, var(--line); animation: $-p 3s linear infinite; }
@keyframes $-k { 0%, 100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
@keyframes $-p { to { background-size: 100% 100%; } }`, box("<b>↓</b><i></i>")),
];
