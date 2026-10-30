import { btn, toggle } from "./buttons";
import { chars, esc, times, w, type SnippetDef } from "./helpers";

const solid = ".$ { background: var(--fg); color: var(--page); }";

export const buttonMoreSnippets: SnippetDef[] = [
  btn("glow-aura-btn", ["渐变光晕", "按钮背后有一团彩色光晕，悬停时变得更亮更大。"], ["Gradient Aura", "A colorful aura glows behind the button and intensifies on hover."], ["tech"],
    `.$ { overflow: visible; border: 0; background: var(--fg); color: var(--page); }
.$::before { content: ""; position: absolute; z-index: -1; inset: -2px; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3)); filter: blur(10px); opacity: .5; transition: opacity .35s, filter .35s, inset .35s; }
.$:hover::before, .$:focus-visible::before { opacity: 1; filter: blur(16px); inset: -6px; }`),
  btn("neumorph-btn", ["新拟态按钮", "柔和的凸起阴影，按下时变成凹陷。"], ["Neumorphic", "Soft raised shadows that turn inset when pressed."], ["elegant"],
    `.$ { border: 0; border-radius: 16px; background: var(--stage); box-shadow: 6px 6px 14px rgb(0 0 0 / .18), -6px -6px 14px rgb(255 255 255 / .06); transition: box-shadow .15s; }
:root:not([data-theme="dark"]) .$ { box-shadow: 6px 6px 14px rgb(0 0 0 / .12), -6px -6px 14px rgb(255 255 255 / .9); }
.$:active { box-shadow: inset 4px 4px 10px rgb(0 0 0 / .2), inset -4px -4px 10px rgb(255 255 255 / .05); }`, { t: "click" }),
  btn("pill-expand-btn", ["展开胶囊", "圆形图标按钮在悬停时向右展开，露出文字。"], ["Expanding Pill", "A round icon button stretches out to reveal its label on hover."], ["interactive"],
    `.$ { width: 48px; height: 48px; padding: 0 0 0 14px; border: 0; border-radius: 24px; background: var(--accent); color: var(--accent-fg); white-space: nowrap; transition: width .45s cubic-bezier(.65,0,.35,1); }
.$ i { font-style: normal; font-size: 18px; }
.$ span { opacity: 0; transition: opacity .2s; }
.$:hover, .$:focus-visible { width: 150px; }
.$:hover span, .$:focus-visible span { opacity: 1; transition-delay: .15s; }`,
    { html: (t) => `<button class="$" type="button"><i aria-hidden="true">✦</i><span>${esc(t)}</span></button>` }),
  btn("arrow-circle-btn", ["圆形箭头", "文字旁的圆形箭头在悬停时填满颜色并向右移动。"], ["Arrow Circle", "The round arrow next to the label fills and nudges right on hover."], ["elegant"],
    `.$ { border: 0; padding: 0; gap: 12px; }
.$ i { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; border: 2px solid var(--fg); font-style: normal; transition: background .3s, color .3s, transform .3s; }
.$:hover i, .$:focus-visible i { background: var(--fg); color: var(--page); transform: translateX(6px); }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span><i aria-hidden="true">→</i></button>` }),
  btn("stack-shadow-btn", ["层叠边框", "按钮后有几层错开的边框，悬停时全部收拢。"], ["Stacked Outlines", "Offset outlines stack behind the button and collapse on hover."], ["game"],
    `.$ { overflow: visible; border-radius: 6px; background: var(--card); box-shadow: 4px 4px 0 -2px var(--card), 4px 4px 0 0 var(--fg), 8px 8px 0 -2px var(--card), 8px 8px 0 0 var(--fg); transition: box-shadow .3s, transform .3s; }
.$:hover, .$:focus-visible { transform: translate(4px, 4px); box-shadow: 0 0 0 -2px var(--card), 0 0 0 0 var(--fg), 0 0 0 -2px var(--card), 0 0 0 0 var(--fg); }`),
  btn("flip-3d-btn", ["3D 翻面按钮", "悬停时按钮向上翻转，背面是另一种颜色。"], ["3D Flip Button", "The button flips up on hover to show a differently colored back."], ["showcase"],
    `.$-w { perspective: 400px; }
.$ { overflow: visible; padding: 0; border: 0; width: 170px; height: 48px; transform-style: preserve-3d; transition: transform .5s cubic-bezier(.65,0,.35,1); }
.$ span { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 12px; backface-visibility: hidden; }
.$ span:first-child { background: var(--fg); color: var(--page); transform: translateZ(24px); }
.$ span + span { background: var(--accent); color: var(--accent-fg); transform: rotateX(90deg) translateZ(24px); }
.$:hover, .$:focus-visible { transform: rotateX(-90deg); }`,
    { html: (t) => `<div class="$-w"><button class="$" type="button"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)} →</span></button></div>` }),
  btn("sparkle-btn", ["星光按钮", "悬停时按钮周围亮起闪烁的小星星。"], ["Sparkle Button", "Twinkling stars appear around the button on hover."], ["game"],
    `.$ { overflow: visible; border: 0; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; }
.$ i { position: absolute; font-style: normal; font-size: 12px; color: var(--accent-3); opacity: 0; pointer-events: none; }
${times(5, (i) => `.$ i:nth-of-type(${i + 1}) { left: ${[-8, 20, 50, 80, 102][i]}%; top: ${[-30, -50, 110, -40, 60][i]}%; }`)}
.$:hover i, .$:focus-visible i { animation: $-k 1.2s ease-in-out infinite; }
${times(5, (i) => `.$:hover i:nth-of-type(${i + 1}) { animation-delay: ${i * 0.2}s; }`)}
@keyframes $-k { 0%, 100% { opacity: 0; transform: scale(0) rotate(0); } 50% { opacity: 1; transform: scale(1.3) rotate(90deg); } }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span>${times(5, () => '<i aria-hidden="true">✦</i>')}</button>` }),
  btn("wave-text-btn", ["文字波浪按钮", "悬停时按钮里的字依次跳起来。"], ["Wavy Label", "On hover the letters of the label hop one after another."], ["game"],
    `.$ .c { display: inline-block; }
.$:hover .c, .$:focus-visible .c { animation: $-k .6s ease-in-out; animation-delay: calc(var(--i) * .05s); }
@keyframes $-k { 50% { transform: translateY(-40%); color: var(--accent); } }`,
    { html: (t) => `<button class="$" type="button"><span>${chars(t)}</span></button>` }),
  btn("tracking-btn", ["字距展开按钮", "悬停时按钮文字向两侧散开。"], ["Tracking Button", "The label spreads its letters apart on hover."], ["elegant"],
    `${solid}
.$ span { transition: letter-spacing .4s cubic-bezier(.22,1,.36,1); }
.$:hover span, .$:focus-visible span { letter-spacing: .25em; }`),
  btn("blob-btn", ["液态变形", "悬停时按钮的圆角不停变形，像一滴液体。"], ["Blob Button", "On hover the corners keep morphing like a drop of liquid."], ["game"],
    `.$ { border: 0; background: var(--accent); color: var(--accent-fg); }
.$:hover, .$:focus-visible { animation: $-k 1.6s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; } 50% { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; } }`),
  btn("stripe-btn", ["斜纹按钮", "悬停时按钮表面出现流动的斜条纹。"], ["Striped Button", "Moving diagonal stripes appear on the button when hovered."], ["game"],
    `.$:hover, .$:focus-visible { background: repeating-linear-gradient(45deg, color-mix(in oklab, var(--accent) 30%, transparent) 0 8px, transparent 8px 16px); background-size: 23px 23px; animation: $-k .6s linear infinite; }
@keyframes $-k { to { background-position: 23px 0; } }`),
  btn("glitch-btn", ["故障按钮", "悬停时按钮快速抖动，边缘出现红蓝错位。"], ["Glitch Button", "On hover the button jitters with red and blue fringes."], ["tech"],
    `${solid}
.$:hover, .$:focus-visible { animation: $-k .4s steps(2) infinite; }
@keyframes $-k { 0% { transform: translate(0); box-shadow: -3px 0 #ef4444, 3px 0 #06b6d4; } 50% { transform: translate(-2px, 1px); box-shadow: 3px 0 #ef4444, -3px 0 #06b6d4; } 100% { transform: translate(2px, -1px); box-shadow: -2px 0 #ef4444, 2px 0 #06b6d4; } }`),
  btn("corner-bracket-btn", ["角框按钮", "悬停时四个角的框线向外张开。"], ["Corner Brackets", "Corner brackets pop outward on hover."], ["tech"],
    `.$ { overflow: visible; border-color: transparent; }
.$::before, .$::after { content: ""; position: absolute; width: 14px; height: 14px; border: 2px solid var(--accent); transition: transform .3s; }
.$::before { left: 0; top: 0; border-right: 0; border-bottom: 0; }
.$::after { right: 0; bottom: 0; border-left: 0; border-top: 0; }
.$:hover::before, .$:focus-visible::before { transform: translate(-6px, -6px); }
.$:hover::after, .$:focus-visible::after { transform: translate(6px, 6px); }`),
  btn("dot-fill-btn", ["圆点扩散", "文字前的小圆点在悬停时放大，铺满整个按钮。"], ["Dot Fill", "The little dot before the label grows to fill the whole button on hover."], ["interactive"],
    `.$ { padding-left: 34px; }
.$::before { content: ""; position: absolute; z-index: -1; left: 16px; top: 50%; width: 8px; height: 8px; margin-top: -4px; border-radius: 50%; background: var(--accent); transition: transform .5s cubic-bezier(.65,0,.35,1); }
.$:hover, .$:focus-visible { color: var(--accent-fg); border-color: var(--accent); }
.$:hover::before, .$:focus-visible::before { transform: scale(40); }`),
  btn("gradient-text-btn", ["渐变文字按钮", "悬停时按钮文字变成流动的渐变色。"], ["Gradient Label", "On hover the label turns into a flowing gradient."], ["showcase"],
    `.$ span { background: linear-gradient(90deg, var(--fg), var(--fg)) 0 0 / 100% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; }
.$:hover span, .$:focus-visible span { background-image: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent)); background-size: 300% 100%; animation: $-k 2s linear infinite; }
@keyframes $-k { to { background-position: 300% 0; } }`),
  btn("marching-btn", ["蚂蚁线按钮", "悬停时边框变成流动的虚线。"], ["Marching Ants", "On hover the border becomes a marching dashed line."], ["tech"],
    `.$ { border-color: transparent; background: linear-gradient(90deg, var(--fg) 50%, transparent 0) repeat-x 0 0 / 12px 2px, linear-gradient(90deg, var(--fg) 50%, transparent 0) repeat-x 0 100% / 12px 2px, linear-gradient(0deg, var(--fg) 50%, transparent 0) repeat-y 0 0 / 2px 12px, linear-gradient(0deg, var(--fg) 50%, transparent 0) repeat-y 100% 0 / 2px 12px; border-radius: 0; }
.$:hover, .$:focus-visible { animation: $-k .5s linear infinite; }
@keyframes $-k { to { background-position: 12px 0, -12px 100%, 0 -12px, 100% 12px; } }`),
  btn("press-ring-btn", ["按下光圈", "按下时按钮外扩散出一圈光环。"], ["Press Ring", "Pressing sends a ring of light out from the button."], ["feedback"],
    `.$ { overflow: visible; border: 0; background: var(--accent); color: var(--accent-fg); }
.$::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 0 var(--accent); }
.$:active::after { animation: $-k .5s ease-out; }
.$:active { transform: scale(.97); }
@keyframes $-k { from { box-shadow: 0 0 0 0 var(--accent); opacity: 1; } to { box-shadow: 0 0 0 16px var(--accent); opacity: 0; } }`, { t: "click" }),
  btn("follow-btn", ["关注按钮", "点击后变成「已关注」，并弹出一个对勾。"], ["Follow Button", "On click it becomes “Following” with a popping check."], ["feedback"],
    `.$ { min-width: 140px; justify-content: center; border: 0; border-radius: 999px; background: var(--accent); color: var(--accent-fg); }
.$ b { display: none; }
.$:has(input:checked) { background: transparent; color: var(--fg); box-shadow: inset 0 0 0 2px var(--line); }
.$:has(input:checked) span { display: none; }
.$:has(input:checked) b { display: inline; animation: $-k .4s cubic-bezier(.34,1.56,.64,1); }
@keyframes $-k { from { transform: scale(.5); opacity: 0; } to { transform: none; opacity: 1; } }`,
    { t: "click", html: (_t, l) => toggle(`<span>+ ${w(l, "关注", "Follow")}</span><b>✓ ${w(l, "已关注", "Following")}</b>`) }),
  btn("cart-btn", ["加入购物车", "点击后购物车图标从左滑到右，文字变成「已加入」。"], ["Add to Cart", "On click a cart rolls across and the label changes to “Added”."], ["feedback"],
    `.$ { min-width: 170px; justify-content: center; background: var(--fg); color: var(--page); }
.$ i { position: absolute; left: -30px; font-style: normal; font-size: 18px; }
.$ b { position: absolute; opacity: 0; }
.$:has(input:checked) i { animation: $-cart 1.2s ease-in-out forwards; }
.$:has(input:checked) span { animation: $-out .3s forwards; }
.$:has(input:checked) b { animation: $-in .3s .9s forwards; }
@keyframes $-cart { 0% { left: -30px; } 50% { left: calc(50% - 10px); } 100% { left: calc(100% + 30px); } }
@keyframes $-out { to { opacity: 0; transform: translateY(-10px); } }
@keyframes $-in { to { opacity: 1; } }`,
    { t: "click", html: (_t, l) => toggle(`<i aria-hidden="true">🛒</i><span>${w(l, "加入购物车", "Add to cart")}</span><b>✓ ${w(l, "已加入", "Added")}</b>`) }),
  btn("send-btn", ["发送按钮", "点击后纸飞机从按钮里飞出去，文字变成「已发送」。"], ["Send Button", "On click a paper plane flies out and the label reads “Sent”."], ["feedback"],
    `.$ { min-width: 140px; justify-content: center; overflow: visible; border: 0; background: var(--accent); color: var(--accent-fg); }
.$ i { font-style: normal; transition: transform .6s cubic-bezier(.5,0,.75,0), opacity .6s; }
.$ b { display: none; }
.$:has(input:checked) i { transform: translate(120px, -80px) rotate(-20deg); opacity: 0; }
.$:has(input:checked) span { display: none; }
.$:has(input:checked) b { display: inline; animation: $-k .3s .4s both; }
@keyframes $-k { from { opacity: 0; } }`,
    { t: "click", html: (_t, l) => toggle(`<i aria-hidden="true">✈</i><span>${w(l, "发送", "Send")}</span><b>${w(l, "已发送", "Sent")}</b>`) }),
  btn("delete-confirm-btn", ["删除确认", "第一次点击变红并询问「确定删除？」，防止误操作。"], ["Confirm Delete", "The first click turns it red and asks “Delete?” to prevent mistakes."], ["feedback"],
    `.$ { min-width: 140px; justify-content: center; }
.$ b { display: none; }
.$:has(input:checked) { background: #ef4444; border-color: #ef4444; color: #fff; animation: $-k .4s; }
.$:has(input:checked) span { display: none; }
.$:has(input:checked) b { display: inline; }
@keyframes $-k { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }`,
    { t: "click", html: (_t, l) => toggle(`<span>🗑 ${w(l, "删除", "Delete")}</span><b>${w(l, "确定删除？", "Delete?")}</b>`) }),
  btn("hold-btn", ["长按确认", "按住按钮不放，进度条慢慢填满。"], ["Hold to Confirm", "Press and hold while a progress fill creeps across."], ["feedback"],
    `.$ { min-width: 160px; justify-content: center; }
.$::before { content: ""; position: absolute; z-index: -1; inset: 0; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
.$:active::before { transform: scaleX(1); transition: transform 1.4s linear; }
.$:active { color: var(--accent-fg); }`,
    { t: "click", html: (_t, l) => `<button class="$" type="button"><span>${w(l, "按住确认", "Hold to confirm")}</span></button>` }),
  btn("split-arrow-btn", ["分体箭头", "按钮右侧的箭头区在悬停时变宽并换色。"], ["Split Arrow", "The arrow segment on the right widens and changes color on hover."], ["interactive"],
    `.$ { padding: 0; border: 0; gap: 0; border-radius: 12px; background: var(--fg); color: var(--page); }
.$ span { padding: 15px 22px; }
.$ i { align-self: stretch; display: grid; place-items: center; width: 46px; font-style: normal; border-left: 1px solid color-mix(in oklab, var(--page) 25%, transparent); transition: width .3s, background .3s; }
.$:hover i, .$:focus-visible i { width: 64px; background: var(--accent); color: var(--accent-fg); }`,
    { html: (t) => `<button class="$" type="button"><span>${esc(t)}</span><i aria-hidden="true">→</i></button>` }),
  btn("live-dot-btn", ["直播状态", "按钮里有一个不断脉动的红点，表示正在直播。"], ["Live Badge", "A pulsing red dot inside the button shows it is live."], ["feedback"],
    `.$ { border-color: var(--line); }
.$ i { position: relative; width: 9px; height: 9px; border-radius: 50%; background: #ef4444; }
.$ i::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #ef4444; animation: $-k 1.4s ease-out infinite; }
@keyframes $-k { to { transform: scale(3); opacity: 0; } }`,
    { t: "auto", html: (_t, l) => `<button class="$" type="button"><i></i><span>${w(l, "直播中", "Live now")}</span></button>` }),
  btn("comet-border-btn", ["流光描边", "一道彗星般的亮光沿着按钮边框绕行。"], ["Comet Border", "A comet of light travels around the button's border."], ["tech"],
    `.$ { border: 0; padding: 16px 30px; background: var(--card); }
.$::before { content: ""; position: absolute; z-index: -2; left: 50%; top: 50%; width: 300%; aspect-ratio: 1; translate: -50% -50%; background: conic-gradient(transparent 80%, var(--accent-2), #fff); animation: $-k 2s linear infinite; }
.$::after { content: ""; position: absolute; z-index: -1; inset: 2px; border-radius: 10px; background: var(--card); }
@keyframes $-k { to { rotate: 360deg; } }`, { t: "auto" }),
  btn("tilt-hover-btn", ["悬停后仰", "悬停时按钮向后倾倒，露出底部厚度。"], ["Tilt Back", "On hover the button tips back to reveal its thickness."], ["impact"],
    `.$-w { perspective: 300px; }
.$ { background: var(--accent); color: var(--accent-fg); border: 0; box-shadow: 0 0 0 color-mix(in oklab, var(--accent) 50%, #000); }
.$:hover, .$:focus-visible { transform: rotateX(25deg); box-shadow: 0 8px 0 color-mix(in oklab, var(--accent) 50%, #000); }`,
    { html: (t) => `<div class="$-w"><button class="$" type="button"><span>${esc(t)}</span></button></div>` }),
  btn("retro-btn", ["复古像素按钮", "8 位游戏风的方块按钮，点击时被按下去。"], ["Retro Pixel", "A chunky 8-bit style button that sinks when clicked."], ["game"],
    `.$ { border: 0; border-radius: 0; background: #facc15; color: #111; font-family: ui-monospace, monospace; letter-spacing: 1px; box-shadow: 0 4px 0 #a16207, 4px 0 0 #111, -4px 0 0 #111, 0 -4px 0 #111, 0 8px 0 #111; transition: transform .05s, box-shadow .05s; }
.$:active { transform: translateY(4px); box-shadow: 0 0 0 #a16207, 4px 0 0 #111, -4px 0 0 #111, 0 -4px 0 #111, 0 4px 0 #111; }`, { t: "click" }),
  btn("play-ring-btn", ["播放按钮", "圆形播放按钮外有一圈光环，悬停时扩散得更明显。"], ["Play Ring", "A round play button with a halo that ripples stronger on hover."], ["showcase"],
    `.$ { overflow: visible; width: 64px; height: 64px; padding: 0 0 0 4px; justify-content: center; border: 0; border-radius: 50%; background: var(--fg); color: var(--page); font-size: 20px; }
.$::before, .$::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--fg); animation: $-k 2s ease-out infinite; }
.$::after { animation-delay: 1s; }
.$:hover::before, .$:hover::after { border-color: var(--accent); animation-duration: 1.2s; }
@keyframes $-k { from { transform: scale(1); opacity: .6; } to { transform: scale(1.8); opacity: 0; } }`,
    { html: (_t, l) => `<button class="$" type="button" aria-label="${w(l, "播放", "Play")}">▶</button>` }),
  btn("bounce-in-btn", ["弹入按钮", "按钮从小弹出放大，再回弹到正常大小，适合首次出现。"], ["Bounce In", "The button pops in from small with an overshoot, great for first appearance."], ["showcase"],
    `${solid}
.$ { animation: $-k 2.6s cubic-bezier(.34,1.56,.64,1) infinite; }
@keyframes $-k { 0% { transform: scale(0); opacity: 0; } 20%, 85% { transform: scale(1); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }`, { t: "enter" }),
  btn("cube-roll-btn", ["立方翻滚", "悬停时按钮像立方体一样向前滚到下一面。"], ["Cube Roll", "On hover the button rolls forward like a cube to its next face."], ["tech"],
    `.$-w { perspective: 500px; }
.$ { overflow: visible; padding: 0; border: 0; width: 170px; height: 48px; transform-style: preserve-3d; transform: translateZ(-24px); transition: transform .5s cubic-bezier(.65,0,.35,1); }
.$ span { position: absolute; inset: 0; display: grid; place-items: center; border: 2px solid var(--fg); border-radius: 10px; background: var(--card); }
.$ span:first-child { transform: translateZ(24px); }
.$ span + span { background: var(--fg); color: var(--page); transform: rotateX(-90deg) translateZ(24px); }
.$:hover, .$:focus-visible { transform: translateZ(-24px) rotateX(90deg); }`,
    { html: (t) => `<div class="$-w"><button class="$" type="button"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)}</span></button></div>` }),
  btn("spotlight-sweep-btn", ["探照光扫过", "悬停时一束斜向的白光从左到右扫过按钮。"], ["Spotlight Sweep", "On hover a slanted beam of light sweeps across the button from left to right."], ["elegant"],
    `.$ { border: 0; background: var(--accent); color: var(--accent-fg); }
.$::after { content: ""; position: absolute; top: -50%; left: -60%; width: 40%; height: 200%; background: linear-gradient(90deg, transparent, rgb(255 255 255 / .7), transparent); transform: skewX(-20deg); transition: left .9s ease-in-out; }
.$:hover::after, .$:focus-visible::after { left: 130%; }`),
];
