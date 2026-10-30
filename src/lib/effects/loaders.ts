import type { ContextKind } from "../types";
import { chars, times, type SnippetDef } from "./helpers";

export const load = (id: string, zh: [string, string], en: [string, string], css: string, html: SnippetDef["html"], m: ContextKind[] = ["feedback"], tech?: SnippetDef["tech"]): SnippetDef =>
  ({ id, zh, en, c: "loader", t: "auto", m, css, html, tech });

export const box = (inner = "") => (_t: string, l: string) => `<div class="$" role="status" aria-label="${l === "zh" ? "加载中" : "Loading"}">${inner}</div>`;
export const n = (count: number, tag = "i") => box(times(count, () => `<${tag}></${tag}>`));
export const spin = "@keyframes $-spin { to { transform: rotate(360deg); } }";

export const loaderSnippets: SnippetDef[] = [
  load("spinner-ring", ["圆环转圈", "最经典的加载圈：一段彩色圆弧不停旋转。"], ["Ring Spinner", "The classic loader: a colored arc spinning around a ring."],
    `.$ { width: 48px; height: 48px; border-radius: 50%; border: 5px solid var(--line); border-top-color: var(--accent); animation: $-spin .9s linear infinite; }\n${spin}`, box()),
  load("spinner-dual", ["双环反转", "内外两个圆环朝相反方向旋转。"], ["Dual Ring", "Inner and outer rings spin in opposite directions."],
    `.$ { position: relative; width: 56px; height: 56px; border-radius: 50%; border: 4px solid transparent; border-top-color: var(--accent); border-bottom-color: var(--accent); animation: $-spin 1.2s linear infinite; }
.$::after { content: ""; position: absolute; inset: 8px; border-radius: 50%; border: 4px solid transparent; border-left-color: #ec4899; border-right-color: #ec4899; animation: $-spin .8s linear infinite reverse; }\n${spin}`, box()),
  load("spinner-dashed", ["虚线圆环", "由短线组成的圆环缓慢转动。"], ["Dashed Ring", "A ring made of short dashes turns slowly."],
    `.$ { width: 52px; height: 52px; border-radius: 50%; border: 5px dashed var(--accent); animation: $-spin 3s linear infinite; }\n${spin}`, box()),
  load("spinner-conic", ["渐变尾巴", "带有渐隐尾巴的圆弧旋转，像彗星一样。"], ["Gradient Tail", "A comet-like arc with a fading tail spins around."],
    `.$ { width: 52px; height: 52px; border-radius: 50%; background: conic-gradient(transparent 10%, var(--accent)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0); mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0); animation: $-spin 1s linear infinite; }\n${spin}`, box(), ["tech"]),
  load("spinner-segments", ["分段菊花", "12 根短线依次变亮，像系统加载图标。"], ["Segment Spinner", "Twelve ticks light up in turn like a system spinner."],
    `.$ { position: relative; width: 48px; height: 48px; }
.$ i { position: absolute; left: 22px; top: 0; width: 4px; height: 13px; border-radius: 2px; background: var(--fg); transform-origin: 2px 24px; animation: $-k 1.2s linear infinite; }
${times(12, (i) => `.$ i:nth-child(${i + 1}) { transform: rotate(${i * 30}deg); animation-delay: ${(-1.2 + i * 0.1).toFixed(1)}s; }`)}
@keyframes $-k { from { opacity: 1; } to { opacity: .12; } }`, n(12)),
  load("pulse-dot", ["脉冲圆点", "圆点放大并向外扩散成光环。"], ["Pulse Dot", "A dot grows and ripples outward into a halo."],
    `.$ { position: relative; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); }
.$::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--accent); animation: $-k 1.4s ease-out infinite; }
@keyframes $-k { to { transform: scale(3.5); opacity: 0; } }`, box()),
  load("ripple-rings", ["涟漪圆环", "一圈圈圆环从中心向外扩散。"], ["Ripple Rings", "Rings ripple outward from the center."],
    `.$ { position: relative; width: 70px; height: 70px; }
.$ i { position: absolute; inset: 0; border-radius: 50%; border: 3px solid var(--accent); animation: $-k 1.8s cubic-bezier(0,.2,.8,1) infinite; }
.$ i:nth-child(2) { animation-delay: .6s; } .$ i:nth-child(3) { animation-delay: 1.2s; }
@keyframes $-k { from { transform: scale(0); opacity: 1; } to { transform: scale(1); opacity: 0; } }`, n(3)),
  load("dots-bounce", ["三点跳动", "三个圆点依次跳起。"], ["Bouncing Dots", "Three dots bounce one after another."],
    `.$ { display: flex; gap: 8px; }
.$ i { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); animation: $-k .9s ease-in-out infinite; }
.$ i:nth-child(2) { animation-delay: .15s; } .$ i:nth-child(3) { animation-delay: .3s; }
@keyframes $-k { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-18px); } }`, n(3)),
  load("dots-fade", ["三点渐隐", "三个圆点依次缩小淡出。"], ["Fading Dots", "Three dots shrink and fade in sequence."],
    `.$ { display: flex; gap: 8px; }
.$ i { width: 14px; height: 14px; border-radius: 50%; background: var(--fg); animation: $-k 1.2s ease-in-out infinite; }
.$ i:nth-child(2) { animation-delay: .2s; } .$ i:nth-child(3) { animation-delay: .4s; }
@keyframes $-k { 0%, 80%, 100% { transform: scale(.4); opacity: .3; } 40% { transform: scale(1); opacity: 1; } }`, n(3)),
  load("dots-wave", ["波浪点阵", "一排圆点像波浪一样上下起伏。"], ["Dot Wave", "A row of dots rises and falls like a wave."],
    `.$ { display: flex; gap: 6px; }
.$ i { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); animation: $-k 1.2s ease-in-out infinite; }
${times(6, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; }`)}
@keyframes $-k { 0%, 100% { transform: translateY(8px); opacity: .5; } 50% { transform: translateY(-8px); opacity: 1; } }`, n(6)),
  load("typing-dots", ["正在输入", "聊天气泡里的三个点依次跳动，表示对方正在输入。"], ["Typing Indicator", "Three dots hop inside a chat bubble while someone types."],
    `.$ { display: flex; gap: 5px; padding: 14px 16px; border-radius: 18px 18px 18px 4px; background: var(--card); border: 1px solid var(--line); }
.$ i { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); animation: $-k 1.2s infinite; }
.$ i:nth-child(2) { animation-delay: .2s; } .$ i:nth-child(3) { animation-delay: .4s; }
@keyframes $-k { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-5px); opacity: 1; } }`, n(3), ["interactive"]),
  load("bars-equalizer", ["音乐均衡器", "几根竖条随机高低起伏，像音乐频谱。"], ["Equalizer Bars", "Bars bounce to different heights like a music spectrum."],
    `.$ { display: flex; align-items: flex-end; gap: 5px; height: 48px; }
.$ i { width: 8px; height: 100%; border-radius: 3px; background: var(--accent); transform-origin: bottom; animation: $-k 1s ease-in-out infinite; }
${times(5, (i) => `.$ i:nth-child(${i + 1}) { animation-duration: ${[0.9, 0.7, 1.1, 0.8, 1][i]}s; animation-delay: -${i * 0.2}s; }`)}
@keyframes $-k { 0%, 100% { transform: scaleY(.2); } 50% { transform: scaleY(1); } }`, n(5), ["game"]),
  load("bars-scale", ["竖条伸缩", "几根竖条依次拉长，像在充能。"], ["Stretching Bars", "Bars stretch in turn as if charging up."],
    `.$ { display: flex; align-items: center; gap: 5px; height: 48px; }
.$ i { width: 6px; height: 100%; border-radius: 3px; background: var(--fg); animation: $-k 1.1s ease-in-out infinite; }
${times(5, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${-1.1 + i * 0.1}s; }`)}
@keyframes $-k { 0%, 40%, 100% { transform: scaleY(.35); } 20% { transform: scaleY(1); } }`, n(5)),
  load("progress-indeterminate", ["无限进度条", "一段进度条在轨道上来回滑动，表示时长未知。"], ["Indeterminate Bar", "A segment slides along the track when progress is unknown."],
    `.$ { position: relative; width: 70%; height: 6px; border-radius: 6px; background: var(--line); overflow: hidden; }
.$::after { content: ""; position: absolute; top: 0; bottom: 0; width: 40%; border-radius: 6px; background: var(--accent); animation: $-k 1.4s cubic-bezier(.65,0,.35,1) infinite; }
@keyframes $-k { from { left: -40%; } to { left: 100%; } }`, box()),
  load("progress-stripes", ["斜纹进度条", "进度条里的斜纹不停向右移动。"], ["Striped Progress", "Diagonal stripes keep moving inside the progress bar."],
    `.$ { width: 70%; height: 16px; border-radius: 16px; background: var(--line); overflow: hidden; }
.$::after { content: ""; display: block; width: 65%; height: 100%; border-radius: 16px; background: repeating-linear-gradient(45deg, var(--accent) 0 10px, color-mix(in oklab, var(--accent) 70%, #fff) 10px 20px); background-size: 28px 28px; animation: $-k .8s linear infinite; }
@keyframes $-k { to { background-position: 28px 0; } }`, box()),
  load("skeleton-card", ["骨架屏", "灰色占位块上有光泽扫过，表示内容即将出现。"], ["Skeleton Screen", "A sheen sweeps over placeholder blocks before content loads."],
    `.$ { width: 78%; display: grid; grid-template-columns: 48px 1fr; gap: 10px 14px; padding: 16px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); }
.$ i { border-radius: 8px; background: linear-gradient(90deg, var(--line) 25%, color-mix(in oklab, var(--line) 40%, var(--card)) 50%, var(--line) 75%); background-size: 200% 100%; animation: $-k 1.4s linear infinite; }
.$ i:nth-child(1) { grid-row: span 2; height: 48px; border-radius: 50%; }
.$ i:nth-child(2) { height: 14px; width: 80%; align-self: end; }
.$ i:nth-child(3) { height: 12px; width: 55%; }
.$ i:nth-child(4) { grid-column: span 2; height: 12px; }
@keyframes $-k { from { background-position: 200% 0; } to { background-position: -200% 0; } }`, n(4), ["showcase"]),
  load("square-flip", ["方块翻转", "一个方块交替沿两个方向翻转。"], ["Flipping Square", "A square flips alternately on two axes."],
    `.$ { width: 44px; height: 44px; background: var(--accent); animation: $-k 1.2s infinite ease-in-out; }
@keyframes $-k { 0% { transform: perspective(120px) rotateX(0) rotateY(0); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }`, box(), ["game"]),
  load("folding-squares", ["四格折叠", "四个小方块依次折起再展开。"], ["Folding Cube", "Four tiles fold away and unfold in turn."],
    `.$ { width: 48px; height: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; transform: rotate(45deg); }
.$ i { background: var(--accent); animation: $-k 2.4s infinite linear both; transform-origin: 100% 100%; }
.$ i:nth-child(2) { animation-delay: .3s; } .$ i:nth-child(4) { animation-delay: .6s; } .$ i:nth-child(3) { animation-delay: .9s; }
@keyframes $-k { 0%, 10% { transform: perspective(140px) rotateX(-180deg); opacity: 0; } 25%, 75% { transform: perspective(140px) rotateX(0); opacity: 1; } 90%, 100% { transform: perspective(140px) rotateY(180deg); opacity: 0; } }`, n(4), ["tech"]),
  load("grid-fade", ["九宫格闪烁", "3×3 方格按对角线依次缩放闪烁。"], ["Grid Pulse", "A 3×3 grid scales and fades along its diagonals."],
    `.$ { display: grid; grid-template-columns: repeat(3, 14px); gap: 4px; }
.$ i { height: 14px; border-radius: 3px; background: var(--accent); animation: $-k 1.3s infinite ease-in-out; }
${times(9, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${((i % 3) + Math.floor(i / 3)) * 0.1}s; }`)}
@keyframes $-k { 0%, 70%, 100% { transform: scale(1); opacity: 1; } 35% { transform: scale(0); opacity: .3; } }`, n(9)),
  load("orbit-dots", ["轨道小球", "几个小球沿圆形轨道追逐转动。"], ["Orbiting Dots", "Small balls chase each other around a circular track."],
    `.$ { position: relative; width: 56px; height: 56px; }
.$ i { position: absolute; inset: 0; animation: $-spin 1.4s cubic-bezier(.5,0,.5,1) infinite; }
.$ i::after { content: ""; position: absolute; top: 0; left: 50%; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%; background: var(--accent); }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${-0.04 * (i + 1)}s; opacity: ${1 - i * 0.2}; }`)}
${spin}`, n(4)),
  load("planet-orbit", ["行星公转", "一颗小卫星绕着中心行星公转。"], ["Planet Orbit", "A small moon orbits around a central planet."],
    `.$ { position: relative; width: 70px; height: 70px; border-radius: 50%; border: 1px dashed var(--line); animation: $-spin 2s linear infinite; }
.$::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--accent); }
.$::after { content: ""; position: absolute; top: -6px; left: 29px; width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; }
${spin}`, box(), ["tech"]),
  load("newton-cradle", ["牛顿摆", "两侧的球交替摆起，像牛顿摆一样。"], ["Newton's Cradle", "End balls swing out alternately like a Newton's cradle."],
    `.$ { display: flex; }
.$ i { width: 14px; height: 50px; position: relative; transform-origin: top center; }
.$ i::after { content: ""; position: absolute; bottom: 0; left: 0; width: 14px; height: 14px; border-radius: 50%; background: var(--fg); }
.$ i::before { content: ""; position: absolute; top: 0; left: 6px; width: 1px; height: 38px; background: var(--muted); }
.$ i:first-child { animation: $-l 1.2s ease-in-out infinite; }
.$ i:last-child { animation: $-r 1.2s ease-in-out infinite; }
@keyframes $-l { 0%, 50%, 100% { transform: rotate(0); } 25% { transform: rotate(35deg); } }
@keyframes $-r { 0%, 50%, 100% { transform: rotate(0); } 75% { transform: rotate(-35deg); } }`, n(5), ["game"]),
  load("hourglass", ["沙漏", "沙漏图标翻转一圈，再继续等待。"], ["Hourglass", "An hourglass flips over and keeps waiting."],
    `.$ { width: 0; height: 0; border: 22px solid var(--accent); border-color: var(--accent) transparent; border-radius: 50%; animation: $-k 1.6s infinite; }
@keyframes $-k { 0% { transform: rotate(0); animation-timing-function: cubic-bezier(.55,.06,.68,.19); } 50% { transform: rotate(900deg); animation-timing-function: cubic-bezier(.22,.61,.36,1); } 100% { transform: rotate(1800deg); } }`, box()),
  load("heart-loader", ["心跳加载", "一颗爱心有节奏地跳动。"], ["Heartbeat Loader", "A heart beats rhythmically."],
    `.$ { font-size: 44px; line-height: 1; color: #f43f5e; animation: $-k 1.2s infinite; }
@keyframes $-k { 0%, 40%, 100% { transform: scale(1); } 10% { transform: scale(1.25); } 20% { transform: scale(1.05); } 30% { transform: scale(1.2); } }`, box("♥"), ["feedback"]),
  load("infinity-loader", ["无限符号", "一段线条沿着 ∞ 形路径循环流动。"], ["Infinity Loop", "A line travels endlessly along an ∞ path."],
    `.$ { width: 110px; }
.$ path { fill: none; stroke-width: 6; stroke-linecap: round; }
.$ path:first-child { stroke: var(--line); }
.$ path + path { stroke: var(--accent); stroke-dasharray: 60 240; animation: $-k 1.8s linear infinite; }
@keyframes $-k { to { stroke-dashoffset: -300; } }`,
    () => `<svg class="$" viewBox="0 0 110 50" role="img" aria-label="loading">${times(2, () => `<path pathLength="300" d="M55 25c-12-15-35-15-35 0s23 15 35 0 35-15 35 0-23 15-35 0z"/>`)}</svg>`, ["tech"], "SVG"),
  load("circle-draw", ["画圈加载", "一段圆弧在描绘与收回之间循环，同时旋转。"], ["Drawing Circle", "An arc draws and retracts while the circle turns."],
    `.$ { width: 52px; height: 52px; animation: $-spin 2s linear infinite; }
.$ circle { fill: none; stroke: var(--accent); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 1 150; stroke-dashoffset: 0; animation: $-k 1.5s ease-in-out infinite; }
@keyframes $-k { 0% { stroke-dasharray: 1 150; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90 150; stroke-dashoffset: -35; } 100% { stroke-dasharray: 90 150; stroke-dashoffset: -124; } }
${spin}`, () => `<svg class="$" viewBox="0 0 52 52" role="img" aria-label="loading"><circle cx="26" cy="26" r="22"/></svg>`, ["elegant"], "SVG"),
  load("clock-loader", ["时钟指针", "表盘上的时针和分针以不同速度转动。"], ["Clock Hands", "Hour and minute hands turn at different speeds on a dial."],
    `.$ { position: relative; width: 56px; height: 56px; border-radius: 50%; border: 4px solid var(--fg); }
.$::before, .$::after { content: ""; position: absolute; left: 50%; bottom: 50%; width: 4px; margin-left: -2px; border-radius: 2px; background: var(--fg); transform-origin: 50% 100%; }
.$::before { height: 18px; animation: $-spin 1s linear infinite; }
.$::after { height: 12px; background: var(--accent); animation: $-spin 12s linear infinite; }
${spin}`, box()),
  load("battery-charge", ["电池充电", "电池格子从左到右依次亮起。"], ["Battery Charging", "Battery cells light up left to right."],
    `.$ { position: relative; display: flex; gap: 3px; padding: 4px; width: 76px; height: 34px; box-sizing: border-box; border: 3px solid var(--fg); border-radius: 7px; }
.$::after { content: ""; position: absolute; right: -8px; top: 8px; width: 5px; height: 12px; border-radius: 0 3px 3px 0; background: var(--fg); }
.$ i { flex: 1; border-radius: 2px; background: #22c55e; opacity: 0; animation: $-k 2s infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.3}s; }`)}
@keyframes $-k { 0% { opacity: 0; } 10%, 75% { opacity: 1; } 100% { opacity: 0; } }`, n(4)),
  load("wifi-signal", ["信号搜索", "Wi-Fi 信号弧线由内向外依次亮起。"], ["Wi-Fi Search", "Wi-Fi arcs light up from the inside out."],
    `.$ { position: relative; width: 70px; height: 70px; }
.$ i { position: absolute; left: 50%; bottom: 0; border-radius: 50%; border: 5px solid transparent; border-top-color: var(--accent); transform: translateX(-50%); animation: $-k 1.6s infinite; opacity: .2; }
${times(3, (i) => `.$ i:nth-child(${i + 1}) { width: ${24 + i * 22}px; height: ${24 + i * 22}px; bottom: ${-12 - i * 11}px; animation-delay: ${i * 0.2}s; }`)}
.$::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--accent); }
@keyframes $-k { 0%, 20% { opacity: .2; } 40%, 80% { opacity: 1; } 100% { opacity: .2; } }`, n(3), ["tech"]),
  load("radar-sweep", ["雷达扫描", "雷达扫描线转动，扫过的地方留下渐隐余辉。"], ["Radar Sweep", "A radar beam rotates, leaving a fading trail."],
    `.$ { position: relative; width: 90px; height: 90px; border-radius: 50%; border: 2px solid color-mix(in oklab, #22c55e 50%, transparent); background: radial-gradient(circle, transparent 30%, color-mix(in oklab, #22c55e 15%, transparent) 31%, transparent 32%, transparent 62%, color-mix(in oklab, #22c55e 15%, transparent) 63%, transparent 64%); overflow: hidden; }
.$::before { content: ""; position: absolute; inset: 0; background: conic-gradient(from 0deg, transparent 70%, rgb(34 197 94 / .6)); animation: $-spin 2s linear infinite; }
.$::after { content: ""; position: absolute; left: 60%; top: 30%; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: $-blip 2s infinite; }
@keyframes $-blip { 0%, 20% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
${spin}`, box(), ["tech"]),
  load("ball-bounce", ["弹球落地", "小球弹跳，落地时压扁，地面影子随之缩放。"], ["Bouncing Ball", "A ball bounces and squashes while its shadow scales."],
    `.$ { position: relative; width: 50px; height: 80px; }
.$::before { content: ""; position: absolute; left: 10px; top: 0; width: 30px; height: 30px; border-radius: 50%; background: var(--accent); animation: $-b .6s cubic-bezier(.5,0,.5,1) infinite alternate; }
.$::after { content: ""; position: absolute; left: 8px; bottom: 0; width: 34px; height: 6px; border-radius: 50%; background: rgb(0 0 0 / .25); animation: $-s .6s cubic-bezier(.5,0,.5,1) infinite alternate; }
@keyframes $-b { 0% { transform: translateY(0) scale(1.15, .85); } 15% { transform: translateY(-4px) scale(1); } 100% { transform: translateY(-46px); } }
@keyframes $-s { from { transform: scale(1); } to { transform: scale(.45); opacity: .4; } }`, box(), ["game"]),
  load("jumping-squares", ["跳跃方块", "方块翻滚着前进，像在跳跃。"], ["Tumbling Square", "A square tumbles forward as if jumping."],
    `.$ { width: 36px; height: 36px; border-radius: 6px; background: var(--accent); animation: $-k .6s linear infinite; }
@keyframes $-k { 17% { border-bottom-right-radius: 3px; } 25% { transform: translateY(9px) rotate(22.5deg); } 50% { transform: translateY(18px) scale(1, .9) rotate(45deg); border-bottom-right-radius: 40px; } 75% { transform: translateY(9px) rotate(67.5deg); } 100% { transform: translateY(0) rotate(90deg); } }`, box(), ["game"]),
  load("chasing-squares", ["方块追逐", "两个方块沿方框四边互相追逐。"], ["Chasing Squares", "Two squares chase each other around a frame."],
    `.$ { position: relative; width: 56px; height: 56px; }
.$ i { position: absolute; width: 16px; height: 16px; background: var(--accent); animation: $-k 1.8s infinite ease-in-out; }
.$ i:nth-child(2) { background: #ec4899; animation-delay: -.9s; }
@keyframes $-k { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(40px, 0) rotate(-90deg) scale(.6); } 50% { transform: translate(40px, 40px) rotate(-180deg); } 75% { transform: translate(0, 40px) rotate(-270deg) scale(.6); } }`, n(2)),
  load("morph-blob", ["变形色块", "圆角不断变化，色块在圆与方之间变形并旋转。"], ["Morphing Blob", "A blob morphs between circle and square while rotating."],
    `.$ { width: 56px; height: 56px; background: linear-gradient(135deg, var(--accent), #ec4899); animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { border-radius: 50%; transform: rotate(0); } 33% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(120deg); } 66% { border-radius: 12%; transform: rotate(240deg); } }`, box(), ["elegant"]),
  load("dna-helix", ["DNA 双螺旋", "两排圆点交错上下，像旋转的双螺旋。"], ["DNA Helix", "Two rows of dots weave up and down like a spinning helix."],
    `.$ { display: flex; gap: 6px; height: 56px; align-items: center; }
.$ i { position: relative; width: 8px; height: 100%; }
.$ i::before, .$ i::after { content: ""; position: absolute; left: 0; width: 8px; height: 8px; border-radius: 50%; animation: $-k 1.6s ease-in-out infinite; animation-delay: inherit; }
.$ i::before { background: var(--accent); top: 0; }
.$ i::after { background: #ec4899; bottom: 0; animation-direction: reverse; }
${times(8, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${-i * 0.15}s; }`)}
@keyframes $-k { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(var(--y, 48px)) scale(.6); } }
.$ i::after { --y: -48px; }`, n(8), ["tech"]),
  load("tri-circles", ["三圆旋转", "三个半透明圆重叠旋转，交叠处产生混色。"], ["Spinning Trio", "Three translucent circles overlap and spin, blending where they meet."],
    `.$ { position: relative; width: 70px; height: 70px; animation: $-spin 3s linear infinite; }
.$ i { position: absolute; width: 38px; height: 38px; border-radius: 50%; mix-blend-mode: multiply; opacity: .85; animation: $-k 1.5s ease-in-out infinite alternate; }
:root[data-theme="dark"] .$ i { mix-blend-mode: screen; }
.$ i:nth-child(1) { background: #f43f5e; top: 0; left: 16px; }
.$ i:nth-child(2) { background: #22c55e; bottom: 0; left: 0; }
.$ i:nth-child(3) { background: #3b82f6; bottom: 0; right: 0; }
@keyframes $-k { to { transform: scale(.7); } }
${spin}`, n(3), ["elegant"]),
  load("text-loading", ["文字波浪加载", "「加载中」几个字依次跳动并变亮。"], ["Loading Text Wave", "The letters of “Loading” hop and brighten in turn."],
    `.$ { display: flex; font-size: 8cqw; font-weight: 800; color: var(--muted); }
.$ .c { animation: $-k 1.4s ease-in-out infinite; animation-delay: calc(var(--i) * .1s); }
@keyframes $-k { 0%, 40%, 100% { transform: none; color: var(--muted); } 20% { transform: translateY(-20%); color: var(--accent); } }`,
    (t) => `<div class="$" role="status">${chars(t)}</div>`, ["feedback"]),
  load("percent-loader", ["百分比进度", "圆环进度从 0 填满到 100%，中间显示百分比。"], ["Percentage Ring", "A ring fills from 0 to 100% with the percentage in the middle."],
    `@property --$-p { syntax: "<integer>"; initial-value: 0; inherits: false; }
.$ { --$-p: 0; width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(closest-side, var(--stage) 78%, transparent 80%), conic-gradient(var(--accent) calc(var(--$-p) * 1%), var(--line) 0); counter-reset: p var(--$-p); animation: $-k 3s ease-in-out infinite; font-weight: 800; }
.$::after { content: counter(p) "%"; }
@keyframes $-k { 0% { --$-p: 0; } 80%, 100% { --$-p: 100; } }`, box(), ["feedback"]),
  load("gear-loader", ["齿轮转动", "一大一小两个齿轮咬合转动。"], ["Meshing Gears", "A large and a small gear turn together."],
    `.$ { position: relative; width: 90px; height: 70px; font-size: 52px; line-height: 1; }
.$ i { position: absolute; font-style: normal; color: var(--fg); animation: $-spin 3s linear infinite; }
.$ i:first-child { left: 0; top: 4px; }
.$ i:last-child { right: 4px; top: 0; font-size: 32px; color: var(--accent); animation-direction: reverse; animation-duration: 1.8s; }
${spin}`, box("<i>⚙</i><i>⚙</i>"), ["tech"]),
  load("pendulum", ["钟摆", "一个小球像钟摆一样左右摆动。"], ["Pendulum", "A ball swings left and right like a pendulum."],
    `.$ { width: 2px; height: 60px; background: var(--muted); transform-origin: top; animation: $-k 1.4s ease-in-out infinite alternate; position: relative; align-self: start; margin-top: 50px; }
.$::after { content: ""; position: absolute; bottom: -12px; left: -11px; width: 24px; height: 24px; border-radius: 50%; background: var(--accent); }
@keyframes $-k { from { transform: rotate(35deg); } to { transform: rotate(-35deg); } }`, box(), ["elegant"]),
];
