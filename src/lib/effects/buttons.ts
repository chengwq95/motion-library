import type { ContextKind, TriggerKind } from "../types";
import { esc, w, type SnippetDef } from "./helpers";

// Shared base so every button starts from the same look.
export const base = `.$ { position: relative; isolation: isolate; overflow: hidden; display: inline-flex; align-items: center; gap: .5em; padding: 14px 28px; border: 2px solid var(--fg); border-radius: 12px; background: transparent; color: var(--fg); font-family: inherit; font-weight: 700; font-size: 15px; line-height: 1; cursor: pointer; transition: color .35s, background-color .35s, transform .35s, box-shadow .35s, border-color .35s; }`;

export const btn = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], css: string, o: { t?: TriggerKind; html?: SnippetDef["html"]; noBase?: boolean } = {}): SnippetDef => ({
  id, zh, en, c: "button", t: o.t ?? "hover", m,
  css: `${o.noBase ? "" : base}\n${css}`,
  html: o.html ?? ((t) => `<button class="$" type="button"><span>${esc(t)}</span></button>`),
});

// A pseudo-element that covers the button and slides in on hover.
export const fill = (from: string, to: string, extra = "") => `.$::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--fg); transform: ${from}; transition: transform .4s cubic-bezier(.65,0,.35,1); ${extra} }
.$:hover, .$:focus-visible { color: var(--page); }
.$:hover::before, .$:focus-visible::before { transform: ${to}; }`;

// A checkbox wrapped in a label lets pure CSS react to clicks.
export const toggle = (inner: string) => `<label class="$"><input type="checkbox" hidden>${inner}</label>`;

export const buttonSnippets: SnippetDef[] = [
  btn("fill-left-btn", ["左侧填充", "悬停时颜色从左侧推满按钮。"], ["Fill From Left", "Color pushes in from the left on hover."], ["interactive"],
    fill("scaleX(0)", "scaleX(1)", "transform-origin: left;")),
  btn("fill-right-btn", ["右侧填充", "悬停时颜色从右侧推满按钮。"], ["Fill From Right", "Color pushes in from the right on hover."], ["interactive"],
    fill("scaleX(0)", "scaleX(1)", "transform-origin: right;")),
  btn("fill-up-btn", ["底部升起", "悬停时颜色从底部升起填满。"], ["Fill Up", "Color rises from the bottom on hover."], ["interactive"],
    fill("scaleY(0)", "scaleY(1)", "transform-origin: bottom;")),
  btn("fill-down-btn", ["顶部落下", "悬停时颜色像帘子一样从顶部落下。"], ["Curtain Down", "Color drops from the top like a curtain."], ["interactive"],
    fill("scaleY(0)", "scaleY(1)", "transform-origin: top;")),
  btn("fill-circle-btn", ["圆形扩散", "悬停时一个圆从中心扩散填满。"], ["Circle Fill", "A circle spreads from the center to fill the button."], ["interactive"],
    fill("scale(0)", "scale(1)", "inset: 50% auto auto 50%; width: 250%; aspect-ratio: 1; margin: -125% 0 0 -125%; border-radius: 50%;")),
  btn("fill-diagonal-btn", ["斜向扫入", "悬停时一块倾斜色块从左扫过填满。"], ["Diagonal Sweep", "A slanted block sweeps in from the left."], ["interactive"],
    fill("translateX(-110%) skewX(-20deg)", "translateX(0) skewX(-20deg)", "inset: 0 -20%;")),
  btn("border-draw-btn", ["边框描绘", "悬停时边框沿四周被画出来。"], ["Border Draw", "The border draws itself around the button on hover."], ["elegant"],
    `.$ { border-color: var(--line); }
.$::before, .$::after { content: ""; position: absolute; width: 0; height: 0; border: 2px solid transparent; border-radius: 12px; transition: width .25s, height .25s .25s, border-color 0s .5s; }
.$::before { top: -2px; left: -2px; }
.$::after { bottom: -2px; right: -2px; }
.$:hover::before, .$:focus-visible::before { width: calc(100% + 4px); height: calc(100% + 4px); border-top-color: var(--accent); border-right-color: var(--accent); transition: width .25s, height .25s .25s; }
.$:hover::after, .$:focus-visible::after { width: calc(100% + 4px); height: calc(100% + 4px); border-bottom-color: var(--accent); border-left-color: var(--accent); transition: border-color 0s .5s, width .25s .5s, height .25s .75s; }`),
  btn("glow-btn", ["辉光按钮", "悬停时按钮发出强调色光晕。"], ["Glow Button", "The button emits an accent glow on hover."], ["tech"],
    `.$ { border-color: var(--accent); color: var(--accent); }
.$:hover, .$:focus-visible { background: var(--accent); color: var(--accent-fg); box-shadow: 0 0 12px var(--accent), 0 0 40px color-mix(in oklab, var(--accent) 60%, transparent); }`),
  btn("shine-btn", ["光泽扫过", "悬停时一道高光从左到右扫过。"], ["Shine Sweep", "A highlight glints across on hover."], ["elegant"],
    `.$ { background: var(--fg); color: var(--page); border-color: var(--fg); }
.$::after { content: ""; position: absolute; top: 0; bottom: 0; left: -60%; width: 40%; background: linear-gradient(90deg, transparent, rgb(255 255 255 / .55), transparent); transform: skewX(-20deg); }
.$:hover::after, .$:focus-visible::after { left: 130%; transition: left .7s ease; }`),
  btn("lift-btn", ["悬浮抬升", "悬停时按钮上浮，阴影变大。"], ["Lift", "The button floats up with a deeper shadow on hover."], ["elegant"],
    `.$ { background: var(--fg); color: var(--page); box-shadow: 0 2px 6px rgb(0 0 0 / .15); }
.$:hover, .$:focus-visible { transform: translateY(-4px); box-shadow: 0 14px 24px rgb(0 0 0 / .25); }`),
  btn("press-3d-btn", ["立体按压", "按钮有厚度，点击时被按下去。"], ["3D Press", "A chunky button that sinks down when pressed."], ["game"],
    `.$ { background: var(--accent); color: var(--accent-fg); border: 0; box-shadow: 0 6px 0 color-mix(in oklab, var(--accent) 60%, #000); transition: transform .08s, box-shadow .08s; }
.$:active { transform: translateY(6px); box-shadow: 0 0 0 color-mix(in oklab, var(--accent) 60%, #000); }`, { t: "click" }),
  btn("gradient-shift-btn", ["渐变流动", "悬停时按钮的渐变背景开始流动。"], ["Gradient Shift", "The gradient background starts flowing on hover."], ["showcase"],
    `.$ { border: 0; color: #fff; background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #6366f1); background-size: 300% 100%; }
.$:hover, .$:focus-visible { animation: $-k 2s linear infinite; }
@keyframes $-k { to { background-position: 300% 0; } }`),
  btn("arrow-btn", ["箭头滑出", "悬停时文字左移，箭头从右侧滑入。"], ["Arrow Slide", "The label shifts left as an arrow slides in."], ["interactive"],
    `.$ span { transition: transform .3s; }
.$ i { font-style: normal; position: absolute; right: 18px; opacity: 0; transform: translateX(-10px); transition: .3s; }
.$:hover span, .$:focus-visible span { transform: translateX(-10px); }
.$:hover i, .$:focus-visible i { opacity: 1; transform: none; }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span><i aria-hidden="true">→</i></button>` }),
  btn("jelly-btn", ["果冻按钮", "悬停时按钮像果冻一样晃动。"], ["Jelly Button", "The button wobbles like jelly on hover."], ["game"],
    `.$ { background: var(--accent); color: var(--accent-fg); border: 0; }
.$:hover, .$:focus-visible { animation: $-k .7s; }
@keyframes $-k { 0%, 100% { transform: scale(1, 1); } 25% { transform: scale(.9, 1.1); } 50% { transform: scale(1.1, .9); } 75% { transform: scale(.95, 1.05); } }`),
  btn("pulse-ring-btn", ["脉冲光环", "按钮周围不断扩散出光环，吸引点击。"], ["Pulse Ring", "Rings keep pulsing out from the button to draw attention."], ["feedback"],
    `.$ { overflow: visible; background: var(--accent); color: var(--accent-fg); border: 0; }
.$::before, .$::after { content: ""; position: absolute; inset: 0; border-radius: inherit; border: 2px solid var(--accent); animation: $-k 2s ease-out infinite; }
.$::after { animation-delay: 1s; }
@keyframes $-k { from { opacity: .8; transform: scale(1); } to { opacity: 0; transform: scale(1.5, 1.9); } }`, { t: "auto" }),
  btn("shake-btn", ["抖动提醒", "悬停时按钮快速左右抖动。"], ["Shake", "The button shakes quickly on hover."], ["feedback"],
    `.$:hover, .$:focus-visible { animation: $-k .5s; border-color: #ef4444; color: #ef4444; }
@keyframes $-k { 0%, 100% { transform: none; } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }`),
  btn("roll-text-btn", ["文字翻滚", "悬停时文字向上滚动，换成另一行。"], ["Text Roll", "The label rolls up to reveal a second copy."], ["interactive"],
    `.$ { padding: 0 28px; height: 46px; }
.$ span { display: flex; flex-direction: column; height: 1.2em; overflow: hidden; line-height: 1.2; }
.$ b { transition: transform .35s cubic-bezier(.65,0,.35,1); }
.$ b + b { color: var(--accent); }
.$:hover b, .$:focus-visible b { transform: translateY(-100%); }`,
    { html: (t) => `<button class="$" type="button"><span><b>${esc(t)}</b><b aria-hidden="true">${esc(t)}</b></span></button>` }),
  btn("neon-border-btn", ["霓虹边框", "悬停时边框亮起霓虹光并闪烁。"], ["Neon Border", "The border lights up with flickering neon on hover."], ["tech"],
    `.$ { border-color: #22d3ee; color: #22d3ee; }
.$:hover, .$:focus-visible { box-shadow: 0 0 6px #22d3ee, inset 0 0 6px #22d3ee, 0 0 24px #0891b2; text-shadow: 0 0 6px #22d3ee; animation: $-k 1.5s infinite; }
@keyframes $-k { 0%, 19%, 23%, 100% { opacity: 1; } 21% { opacity: .5; } }`),
  btn("loading-btn", ["加载状态", "点击后按钮收缩成圆形并转圈。"], ["Loading State", "On click the button shrinks into a spinning circle."], ["feedback"],
    `.$ { width: 160px; height: 48px; justify-content: center; padding: 0; background: var(--fg); color: var(--page); transition: width .35s, border-radius .35s, background .35s; }
.$:has(input:checked) { width: 48px; border-radius: 50%; background: transparent; border-color: var(--line); border-top-color: var(--accent); animation: $-k .8s linear infinite .35s; }
.$:has(input:checked) span { opacity: 0; }
@keyframes $-k { to { transform: rotate(360deg); } }`,
    { t: "click", html: (t) => toggle(`<span>${esc(t)}</span>`) }),
  btn("success-btn", ["提交成功", "点击后按钮变绿并显示对勾。"], ["Success State", "On click the button turns green and shows a check mark."], ["feedback"],
    `.$ { min-width: 150px; justify-content: center; background: var(--fg); color: var(--page); }
.$ i { position: absolute; font-style: normal; font-size: 20px; transform: scale(0); transition: transform .35s cubic-bezier(.34,1.56,.64,1) .1s; }
.$ span { transition: opacity .2s, transform .2s; }
.$:has(input:checked) { background: #22c55e; border-color: #22c55e; color: #fff; }
.$:has(input:checked) span { opacity: 0; transform: translateY(-10px); }
.$:has(input:checked) i { transform: scale(1); }`,
    { t: "click", html: (t) => toggle(`<span>${esc(t)}</span><i aria-hidden="true">✓</i>`) }),
  btn("icon-spin-btn", ["图标旋转", "悬停时加号图标旋转 90 度。"], ["Icon Spin", "The plus icon rotates 90° on hover."], ["interactive"],
    `.$ i { font-style: normal; font-size: 20px; line-height: 0; transition: transform .35s; }
.$:hover i, .$:focus-visible i { transform: rotate(90deg); }`,
    { html: (t) => `<button class="$" type="button"><i aria-hidden="true">+</i><span>${esc(t)}</span></button>` }),
  btn("liquid-btn", ["液体填充", "悬停时波浪状的液体升起灌满按钮。"], ["Liquid Fill", "A wavy liquid rises to fill the button on hover."], ["showcase"],
    `.$ { border-color: var(--accent); }
.$::before { content: ""; position: absolute; z-index: -1; left: -50%; width: 200%; aspect-ratio: 1; top: 100%; border-radius: 42%; background: var(--accent); animation: $-k 4s linear infinite; transition: top .7s ease; }
.$:hover, .$:focus-visible { color: var(--accent-fg); }
.$:hover::before, .$:focus-visible::before { top: -110%; }
@keyframes $-k { to { transform: rotate(360deg); } }`),
  btn("ghost-btn", ["幽灵按钮", "平时只有文字，悬停时边框和底色淡入。"], ["Ghost Button", "Just a label until hover fades in a border and tint."], ["elegant"],
    `.$ { border-color: transparent; }
.$:hover, .$:focus-visible { border-color: var(--line); background: color-mix(in oklab, var(--fg) 8%, transparent); }`),
  btn("skew-btn", ["斜切按钮", "倾斜的平行四边形按钮，悬停时摆正。"], ["Skewed Button", "A slanted parallelogram button that straightens on hover."], ["impact"],
    `.$ { transform: skewX(-12deg); border-radius: 4px; background: var(--fg); color: var(--page); }
.$ span { display: inline-block; transform: skewX(12deg); transition: transform .35s; }
.$:hover, .$:focus-visible { transform: skewX(0); }
.$:hover span, .$:focus-visible span { transform: none; }`),
  btn("offset-shadow-btn", ["粗野阴影", "实色偏移阴影，悬停时按钮压进阴影里。"], ["Brutalist Shadow", "A hard offset shadow; hovering pushes the button into it."], ["game"],
    `.$ { border-radius: 4px; background: var(--card); box-shadow: 6px 6px 0 var(--accent); transition: transform .15s, box-shadow .15s; }
.$:hover, .$:focus-visible { transform: translate(4px, 4px); box-shadow: 2px 2px 0 var(--accent); }`),
  btn("spin-border-btn", ["旋转渐变边框", "彩色渐变边框沿按钮四周不停旋转。"], ["Spinning Border", "A colorful gradient border keeps rotating around the button."], ["tech"],
    `.$ { border: 0; padding: 16px 30px; background: var(--card); }
.$::before { content: ""; position: absolute; z-index: -2; left: 50%; top: 50%; width: 300%; aspect-ratio: 1; translate: -50% -50%; background: conic-gradient(#6366f1, #ec4899, #f59e0b, #22c55e, #6366f1); animation: $-k 3s linear infinite; }
.$::after { content: ""; position: absolute; z-index: -1; inset: 2px; border-radius: 10px; background: var(--card); }
@keyframes $-k { to { rotate: 360deg; } }`, { t: "auto" }),
  btn("glass-btn", ["毛玻璃按钮", "半透明磨砂玻璃按钮，背后的彩色光斑缓慢移动。"], ["Glass Button", "A frosted glass button over slowly drifting color blobs."], ["elegant"],
    `.$-w { position: relative; padding: 30px; }
.$-w::before, .$-w::after { content: ""; position: absolute; width: 70px; height: 70px; border-radius: 50%; filter: blur(4px); animation: $-k 4s ease-in-out infinite alternate; }
.$-w::before { background: #f472b6; left: 10px; top: 10px; }
.$-w::after { background: #60a5fa; right: 10px; bottom: 10px; animation-direction: alternate-reverse; }
.$ { z-index: 1; border-color: rgb(255 255 255 / .4); background: rgb(255 255 255 / .18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.$:hover, .$:focus-visible { background: rgb(255 255 255 / .32); }
@keyframes $-k { to { transform: translate(40px, -10px); } }`,
    { html: (t) => `<div class="$-w"><button class="$" type="button"><span>${esc(t)}</span></button></div>` }),
  btn("swap-icon-btn", ["文字换图标", "悬停时文字滑出，图标滑入。"], ["Label to Icon", "The label slides out and an icon slides in on hover."], ["interactive"],
    `.$ { min-width: 150px; justify-content: center; }
.$ span, .$ i { transition: transform .35s, opacity .35s; }
.$ i { position: absolute; font-style: normal; font-size: 20px; transform: translateY(150%); opacity: 0; }
.$:hover span, .$:focus-visible span { transform: translateY(-150%); opacity: 0; }
.$:hover i, .$:focus-visible i { transform: none; opacity: 1; }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span><i aria-hidden="true">↓</i></button>` }),
  btn("underline-box-btn", ["下划线变底色", "悬停时底部细线长高，变成整块底色。"], ["Underline to Fill", "The bottom line grows into a full background on hover."], ["elegant"],
    `.$ { border: 0; border-radius: 0; }
.$::before { content: ""; position: absolute; z-index: -1; left: 0; right: 0; bottom: 0; height: 3px; background: var(--accent); transition: height .3s; }
.$:hover, .$:focus-visible { color: var(--accent-fg); }
.$:hover::before, .$:focus-visible::before { height: 100%; }`),
  btn("split-btn", ["对开门", "悬停时两扇色块向左右打开。"], ["Split Doors", "Two color panels slide apart like doors on hover."], ["showcase"],
    `.$ { color: var(--page); }
.$::before, .$::after { content: ""; position: absolute; z-index: -1; top: 0; bottom: 0; width: 51%; background: var(--fg); transition: transform .4s cubic-bezier(.65,0,.35,1); }
.$::before { left: 0; }
.$::after { right: 0; }
.$:hover, .$:focus-visible { color: var(--fg); }
.$:hover::before, .$:focus-visible::before { transform: translateX(-100%); }
.$:hover::after, .$:focus-visible::after { transform: translateX(100%); }`),
  btn("scan-btn", ["扫描光条", "一道光条不停地扫过按钮表面。"], ["Scanning Light", "A light bar keeps scanning across the button."], ["tech"],
    `.$ { background: var(--fg); color: var(--page); }
.$::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 30%; background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent); animation: $-k 2s linear infinite; }
@keyframes $-k { from { transform: translateX(-100%); } to { transform: translateX(400%); } }`, { t: "auto" }),
  btn("breathing-btn", ["呼吸按钮", "按钮持续轻微放大缩小，光晕随之明暗。"], ["Breathing CTA", "The button gently swells and glows on a loop."], ["feedback"],
    `.$ { overflow: visible; border: 0; background: var(--accent); color: var(--accent-fg); animation: $-k 2.4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 50%, transparent); } 50% { transform: scale(1.05); box-shadow: 0 0 0 12px transparent; } }`, { t: "auto" }),
  btn("rainbow-border-btn", ["彩虹描边", "彩虹渐变在按钮边框上流动。"], ["Rainbow Border", "A rainbow gradient flows along the button border."], ["game"],
    `.$ { border: 2px solid transparent; background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(90deg, #f43f5e, #f59e0b, #22c55e, #3b82f6, #a855f7, #f43f5e) border-box; background-size: 100% 100%, 300% 100%; animation: $-k 3s linear infinite; }
@keyframes $-k { to { background-position: 0 0, 300% 0; } }`, { t: "auto" }),
  btn("tooltip-btn", ["悬停提示", "悬停时上方弹出一个小提示气泡。"], ["Tooltip Pop", "A small tooltip pops up above the button on hover."], ["feedback"],
    `.$ { overflow: visible; }
.$ em { position: absolute; bottom: calc(100% + 10px); left: 50%; translate: -50% 0; padding: 6px 10px; border-radius: 8px; background: var(--fg); color: var(--page); font-family: inherit; font-weight: 500; font-size: 12px; line-height: 1; font-style: normal; white-space: nowrap; opacity: 0; transform: translateY(6px) scale(.9); transition: .2s; pointer-events: none; }
.$ em::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border: 5px solid transparent; border-top-color: var(--fg); }
.$:hover em, .$:focus-visible em { opacity: 1; transform: none; }`,
    { html: (t, l) => `<button class="$" type="button"><span>${esc(t)}</span><em role="tooltip">${w(l, "点我试试", "Try me")}</em></button>` }),
  btn("copy-feedback-btn", ["复制反馈", "点击后文字变成「已复制」，再自动恢复。"], ["Copy Feedback", "On click the label switches to “Copied” and then resets."], ["feedback"],
    `.$ { min-width: 130px; justify-content: center; }
.$ span, .$ b { transition: transform .25s, opacity .25s; }
.$ b { position: absolute; color: #22c55e; transform: translateY(120%); opacity: 0; }
.$:active span, .$:focus span { animation: $-out 1.6s; }
.$:active b, .$:focus b { animation: $-in 1.6s; }
@keyframes $-out { 0% { transform: none; opacity: 1; } 15%, 85% { transform: translateY(-120%); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes $-in { 0% { transform: translateY(120%); opacity: 0; } 15%, 85% { transform: none; opacity: 1; } 100% { transform: translateY(120%); opacity: 0; } }`,
    { t: "click", html: (t, l) => `<button class="$" type="button"><span>${esc(t)}</span><b aria-hidden="true">✓ ${w(l, "已复制", "Copied")}</b></button>` }),
  btn("download-progress-btn", ["下载进度", "点击后按钮内出现进度条，填满后显示完成。"], ["Download Progress", "On click a progress bar fills the button, then shows done."], ["feedback"],
    `.$ { min-width: 170px; justify-content: center; background: var(--card); }
.$::before { content: ""; position: absolute; z-index: -1; inset: 0; background: var(--accent); transform: scaleX(0); transform-origin: left; }
.$ b { position: absolute; opacity: 0; }
.$:has(input:checked)::before { animation: $-k 2s ease-in-out forwards; }
.$:has(input:checked) { color: var(--accent-fg); }
.$:has(input:checked) span { animation: $-hide 2s forwards; }
.$:has(input:checked) b { animation: $-show 2s forwards; }
@keyframes $-k { to { transform: scaleX(1); } }
@keyframes $-hide { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
@keyframes $-show { 0%, 90% { opacity: 0; } 100% { opacity: 1; } }`,
    { t: "click", html: (t, l) => toggle(`<span>${esc(t)}</span><b aria-hidden="true">✓ ${w(l, "完成", "Done")}</b>`) }),
  btn("corner-fold-btn", ["折角按钮", "悬停时右上角折起一个三角。"], ["Corner Fold", "A triangle folds down from the top-right corner on hover."], ["elegant"],
    `.$ { background: var(--fg); color: var(--page); border-radius: 4px; }
.$::after { content: ""; position: absolute; top: 0; right: 0; border-style: solid; border-width: 0; border-color: var(--stage) var(--stage) color-mix(in oklab, var(--accent) 80%, #000) color-mix(in oklab, var(--accent) 80%, #000); transition: border-width .3s; }
.$:hover::after, .$:focus-visible::after { border-width: 0 18px 18px 0; }`),
  btn("magnetic-dots-btn", ["跳动圆点", "悬停时文字后出现三个依次跳动的小圆点。"], ["Bouncing Dots", "Three dots bounce after the label on hover."], ["game"],
    `.$ i { display: inline-flex; gap: 3px; width: 0; overflow: hidden; transition: width .3s; }
.$ i b { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.$:hover i, .$:focus-visible i { width: 22px; }
.$:hover i b, .$:focus-visible i b { animation: $-k .8s infinite; }
.$ i b:nth-child(2) { animation-delay: .15s !important; }
.$ i b:nth-child(3) { animation-delay: .3s !important; }
@keyframes $-k { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span><i aria-hidden="true"><b></b><b></b><b></b></i></button>` }),
];
