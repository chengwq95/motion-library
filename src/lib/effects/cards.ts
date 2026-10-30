import type { ContextKind, TriggerKind } from "../types";
import { esc, times, w, type SnippetDef } from "./helpers";

const card = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], t: TriggerKind, css: string, html?: SnippetDef["html"]): SnippetDef => ({
  id, zh, en, c: "card", t, m, css,
  html: html ?? ((text, l) => `<div class="$"><b>${esc(text)}</b><span>${w(l, "把鼠标移上来看看", "Hover to see it move")}</span></div>`),
});

// The default card body: a title and a hint line.
const face = `.$ { position: relative; width: 62%; height: 64%; box-sizing: border-box; padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; border-radius: 18px; background: var(--card); border: 1px solid var(--line); color: var(--fg); transition: transform .35s cubic-bezier(.34,1.3,.64,1), box-shadow .35s, border-color .35s; }
.$ b { font-size: 18px; } .$ span { font-size: 12px; color: var(--muted); }`;

// Gradient "photo" used by image-style cards.
const photo = "linear-gradient(135deg, #6366f1, #ec4899 55%, #f59e0b)";

export const cardSnippets: SnippetDef[] = [
  card("card-flip", ["3D 翻转卡片", "悬停时卡片沿竖轴翻到背面。"], ["3D Flip Card", "The card flips over to its back on hover."], ["showcase"], "hover",
    `.$ { width: 62%; height: 64%; perspective: 800px; }
.$ div { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .7s cubic-bezier(.65,0,.35,1); }
.$:hover div { transform: rotateY(180deg); }
.$ p { position: absolute; inset: 0; margin: 0; display: grid; place-items: center; border-radius: 18px; backface-visibility: hidden; font-weight: 800; font-size: 18px; }
.$ p:first-child { background: var(--card); border: 1px solid var(--line); }
.$ p + p { background: ${photo}; color: #fff; transform: rotateY(180deg); }`,
    (t, l) => `<div class="$"><div><p>${esc(t)}</p><p>${w(l, "背面", "Back side")}</p></div></div>`),
  card("card-lift", ["悬浮卡片", "悬停时卡片上浮并投下更深的阴影。"], ["Lifting Card", "The card rises and casts a deeper shadow on hover."], ["elegant"], "hover",
    `${face}\n.$:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgb(0 0 0 / .18); }`),
  card("card-gradient-border", ["渐变边框卡片", "彩色渐变边框沿卡片四周不停旋转。"], ["Spinning Border Card", "A colorful gradient border spins around the card."], ["tech"], "auto",
    `${face}
.$ { border: 0; overflow: hidden; isolation: isolate; }
.$::before { content: ""; position: absolute; z-index: -2; left: 50%; top: 50%; width: 200%; aspect-ratio: 1; translate: -50% -50%; background: conic-gradient(transparent 60%, #6366f1, #ec4899, transparent); animation: $-k 3s linear infinite; }
.$::after { content: ""; position: absolute; z-index: -1; inset: 2px; border-radius: 16px; background: var(--card); }
@keyframes $-k { to { rotate: 360deg; } }`),
  card("card-glow-border", ["发光描边", "悬停时卡片边框亮起，外围出现柔光。"], ["Glowing Edge", "The border lights up with a soft outer glow on hover."], ["tech"], "hover",
    `${face}\n.$:hover { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 0 30px color-mix(in oklab, var(--accent) 45%, transparent); }`),
  card("card-zoom-image", ["图片放大", "悬停时卡片里的图片缓缓放大，标题上移。"], ["Image Zoom", "The image slowly zooms in and the caption lifts on hover."], ["showcase"], "hover",
    `.$ { position: relative; width: 62%; height: 64%; border-radius: 18px; overflow: hidden; color: #fff; }
.$ i { position: absolute; inset: 0; background: ${photo}; transition: transform .8s cubic-bezier(.22,1,.36,1); }
.$ i::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent 40%, rgb(0 0 0 / .55)); }
.$ b { position: absolute; left: 16px; bottom: 14px; font-size: 18px; transition: transform .4s; }
.$:hover i { transform: scale(1.15) rotate(2deg); }
.$:hover b { transform: translateY(-6px); }`,
    (t) => `<div class="$"><i></i><b>${esc(t)}</b></div>`),
  card("card-overlay", ["信息浮层", "悬停时详情浮层从底部滑上来。"], ["Slide-up Overlay", "A details panel slides up from the bottom on hover."], ["showcase"], "hover",
    `.$ { position: relative; width: 62%; height: 64%; border-radius: 18px; overflow: hidden; background: ${photo}; }
.$ div { position: absolute; inset: auto 0 0; padding: 16px; background: var(--card); color: var(--fg); transform: translateY(calc(100% - 46px)); transition: transform .4s cubic-bezier(.22,1,.36,1); }
.$ b { display: block; margin-bottom: 6px; } .$ span { font-size: 12px; color: var(--muted); }
.$:hover div { transform: none; }`,
    (t, l) => `<div class="$"><div><b>${esc(t)}</b><span>${w(l, "这里放更多介绍文字，平时隐藏，悬停时出现。", "More details live here, hidden until you hover.")}</span></div></div>`),
  card("card-glass", ["毛玻璃卡片", "半透明磨砂卡片，背后彩色光球缓慢移动。"], ["Glass Card", "A frosted translucent card over slowly drifting color orbs."], ["elegant"], "auto",
    `.$-w { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; }
.$-w::before, .$-w::after { content: ""; position: absolute; width: 110px; height: 110px; border-radius: 50%; animation: $-k 5s ease-in-out infinite alternate; }
.$-w::before { background: #f472b6; left: 18%; top: 8%; }
.$-w::after { background: #60a5fa; right: 18%; bottom: 8%; animation-direction: alternate-reverse; }
${face}
.$ { z-index: 1; background: rgb(255 255 255 / .16); border-color: rgb(255 255 255 / .35); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
@keyframes $-k { to { transform: translate(-40px, 30px); } }`,
    (t, l) => `<div class="$-w"><div class="$"><b>${esc(t)}</b><span>${w(l, "毛玻璃质感", "Frosted glass")}</span></div></div>`),
  card("card-shine", ["光泽扫过卡片", "悬停时一道斜向高光从卡片表面扫过。"], ["Card Shine", "A diagonal glint sweeps across the card on hover."], ["elegant"], "hover",
    `${face}
.$ { overflow: hidden; }
.$::after { content: ""; position: absolute; top: -50%; left: -80%; width: 50%; height: 200%; background: linear-gradient(90deg, transparent, rgb(255 255 255 / .45), transparent); transform: rotate(20deg); }
.$:hover::after { left: 140%; transition: left .9s ease; }`),
  card("card-border-trace", ["边框描线", "悬停时一条线沿卡片边框绕一圈。"], ["Border Trace", "A line traces all the way around the border on hover."], ["elegant"], "hover",
    `${face}
.$ svg { position: absolute; inset: -1px; width: calc(100% + 2px); height: calc(100% + 2px); overflow: visible; }
.$ rect { width: calc(100% - 2px); height: calc(100% - 2px); fill: none; stroke: var(--accent); stroke-width: 2; stroke-dasharray: 1000; stroke-dashoffset: 1000; transition: stroke-dashoffset 1s ease; }
.$:hover rect { stroke-dashoffset: 0; }`,
    (t, l) => `<div class="$"><svg aria-hidden="true"><rect x="1" y="1" rx="18" pathLength="1000"/></svg><b>${esc(t)}</b><span>${w(l, "把鼠标移上来看看", "Hover to see it move")}</span></div>`),
  card("card-focus-group", ["聚焦卡片组", "悬停某张卡片时，其他卡片变暗缩小。"], ["Focus Group", "Hovering one card dims and shrinks the others."], ["interactive"], "hover",
    `.$ { display: flex; gap: 12px; }
.$ i { width: 70px; height: 96px; border-radius: 14px; background: ${photo}; transition: transform .3s, opacity .3s, filter .3s; }
.$ i:nth-child(2) { background: linear-gradient(135deg, #22c55e, #06b6d4); }
.$ i:nth-child(3) { background: linear-gradient(135deg, #f59e0b, #ef4444); }
.$:hover i { opacity: .4; transform: scale(.92); filter: grayscale(.6); }
.$:hover i:hover { opacity: 1; transform: scale(1.08); filter: none; }`,
    () => `<div class="$">${times(3, () => "<i></i>")}</div>`),
  card("card-fan", ["扇形展开", "悬停时叠在一起的卡片像扇子一样散开。"], ["Fan Out", "Stacked cards spread like a fan on hover."], ["game"], "hover",
    `.$ { position: relative; width: 80px; height: 110px; }
.$ i { position: absolute; inset: 0; border-radius: 12px; border: 1px solid var(--line); background: var(--card); box-shadow: 0 4px 10px rgb(0 0 0 / .12); transform-origin: 50% 120%; transition: transform .45s cubic-bezier(.34,1.4,.64,1); }
.$ i:last-child { background: ${photo}; }
${times(4, (i) => `.$:hover i:nth-child(${i + 1}) { transform: rotate(${(i - 1.5) * 18}deg); }`)}`,
    () => `<div class="$">${times(4, () => "<i></i>")}</div>`),
  card("card-shuffle", ["卡片洗牌", "最上面的卡片抽出后放到最底下，循环洗牌。"], ["Card Shuffle", "The top card slides out and tucks underneath, over and over."], ["game"], "auto",
    `.$ { position: relative; width: 120px; height: 84px; }
.$ i { position: absolute; inset: 0; border-radius: 12px; animation: $-k 4.5s infinite; }
.$ i:nth-child(1) { background: #6366f1; } .$ i:nth-child(2) { background: #ec4899; animation-delay: -1.5s; } .$ i:nth-child(3) { background: #f59e0b; animation-delay: -3s; }
@keyframes $-k { 0% { transform: translateY(0) scale(1); z-index: 3; } 20% { transform: translateX(110%) rotate(8deg); z-index: 3; } 25% { z-index: 1; } 33% { transform: translateY(16px) scale(.9); z-index: 1; } 66% { transform: translateY(8px) scale(.95); z-index: 2; } 100% { transform: translateY(0) scale(1); z-index: 3; } }`,
    () => `<div class="$">${times(3, () => "<i></i>")}</div>`),
  card("card-expand", ["展开卡片", "悬停时卡片变宽，显示隐藏的额外内容。"], ["Expanding Card", "The card widens to reveal extra content on hover."], ["interactive"], "hover",
    `.$ { display: flex; align-items: center; gap: 14px; height: 70px; width: 70px; padding: 0 12px; box-sizing: border-box; overflow: hidden; border-radius: 18px; background: var(--card); border: 1px solid var(--line); white-space: nowrap; transition: width .45s cubic-bezier(.65,0,.35,1); }
.$ i { flex: none; width: 46px; height: 46px; border-radius: 12px; background: ${photo}; }
.$ div { opacity: 0; transition: opacity .3s; }
.$ span { display: block; font-size: 12px; color: var(--muted); }
.$:hover { width: 240px; }
.$:hover div { opacity: 1; transition-delay: .2s; }`,
    (t, l) => `<div class="$"><i></i><div><b>${esc(t)}</b><span>${w(l, "悬停展开更多内容", "Hover to expand")}</span></div></div>`),
  card("card-notification", ["通知卡片", "通知卡片从右侧滑入，停留后滑出，下方进度条倒计时。"], ["Notification Toast", "A toast slides in from the right, waits, and leaves as a timer bar runs down."], ["feedback"], "auto",
    `.$ { position: relative; display: flex; align-items: center; gap: 12px; width: 75%; padding: 14px; box-sizing: border-box; overflow: hidden; border-radius: 14px; background: var(--card); border: 1px solid var(--line); box-shadow: 0 10px 30px rgb(0 0 0 / .15); animation: $-k 4s cubic-bezier(.22,1,.36,1) infinite; }
.$ em { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #22c55e; color: #fff; font-style: normal; }
.$ span { display: block; font-size: 12px; color: var(--muted); }
.$::after { content: ""; position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--accent); transform-origin: left; animation: $-bar 4s linear infinite; }
@keyframes $-k { 0% { transform: translateX(130%); } 12%, 85% { transform: none; } 100% { transform: translateX(130%); } }
@keyframes $-bar { 0%, 12% { transform: scaleX(1); } 85%, 100% { transform: scaleX(0); } }`,
    (t, l) => `<div class="$" role="status"><em>✓</em><div><b>${esc(t)}</b><span>${w(l, "已保存到云端", "Saved to the cloud")}</span></div></div>`),
  card("card-stack-toasts", ["堆叠通知", "多条通知层叠在一起，新通知从上方压入。"], ["Stacked Toasts", "Notifications stack up as new ones push in from the top."], ["feedback"], "auto",
    `.$ { position: relative; width: 70%; height: 120px; }
.$ i { position: absolute; left: 0; right: 0; top: 30px; height: 52px; border-radius: 12px; background: var(--card); border: 1px solid var(--line); box-shadow: 0 6px 16px rgb(0 0 0 / .12); animation: $-k 3s infinite; }
${times(3, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${-i}s; }`)}
@keyframes $-k { 0% { transform: translateY(-40px) scale(1); opacity: 0; z-index: 3; } 15%, 33% { transform: translateY(0) scale(1); opacity: 1; z-index: 3; } 48%, 66% { transform: translateY(12px) scale(.94); opacity: .8; z-index: 2; } 81%, 100% { transform: translateY(24px) scale(.88); opacity: 0; z-index: 1; } }`,
    () => `<div class="$">${times(3, () => "<i></i>")}</div>`),
  card("card-polaroid", ["拍立得照片", "照片从上方落下并轻轻摆动，最后停住。"], ["Polaroid Drop", "A photo drops in from above, swings and settles."], ["game"], "auto",
    `.$ { padding: 10px 10px 30px; border-radius: 4px; background: #fff; box-shadow: 0 10px 24px rgb(0 0 0 / .2); color: #111; text-align: center; font-weight: 700; font-size: 13px; transform-origin: 50% -30px; animation: $-k 3.5s ease-out infinite; }
.$ i { display: block; width: 110px; height: 90px; margin-bottom: 8px; background: ${photo}; }
@keyframes $-k { 0% { transform: translateY(-200px) rotate(-10deg); opacity: 0; } 20% { transform: rotate(8deg); opacity: 1; } 30% { transform: rotate(-5deg); } 40% { transform: rotate(3deg); } 50%, 90% { transform: rotate(-2deg); opacity: 1; } 100% { opacity: 0; } }`,
    (t) => `<div class="$"><i></i>${esc(t)}</div>`),
  card("card-sticky-note", ["便利贴", "便利贴的一角被风吹起又落下。"], ["Sticky Note", "A corner of the sticky note lifts in the breeze and settles."], ["game"], "auto",
    `.$ { position: relative; width: 130px; height: 120px; padding: 16px; box-sizing: border-box; background: #fde047; color: #422006; font-weight: 700; box-shadow: 0 6px 14px rgb(0 0 0 / .18); transform-origin: top; animation: $-k 3s ease-in-out infinite; }
.$::before { content: ""; position: absolute; top: -10px; left: 50%; width: 50px; height: 18px; margin-left: -25px; background: rgb(255 255 255 / .5); }
@keyframes $-k { 0%, 100% { transform: rotate(-2deg) skewX(0); } 50% { transform: rotate(2deg) skewX(-3deg) scaleY(.97); } }`,
    (t) => `<div class="$">${esc(t)}</div>`),
  card("card-peel", ["卷角揭开", "悬停时卡片右下角像纸一样卷起。"], ["Page Peel", "The bottom-right corner curls up like paper on hover."], ["elegant"], "hover",
    `${face}
.$::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 0; height: 0; border-radius: 0 0 18px 0; background: linear-gradient(315deg, var(--stage) 45%, color-mix(in oklab, var(--line) 80%, #000) 50%, var(--card) 56%); box-shadow: -4px -4px 8px rgb(0 0 0 / .12); transition: width .35s, height .35s; }
.$:hover::after { width: 50px; height: 50px; }`),
  card("card-carousel-3d", ["3D 旋转木马", "几张卡片围成一圈，在 3D 空间里持续旋转。"], ["3D Carousel", "Cards arranged in a ring keep rotating in 3D."], ["showcase"], "auto",
    `.$ { width: 70px; height: 90px; perspective: 600px; }
.$ div { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: $-k 10s linear infinite; }
.$ i { position: absolute; inset: 0; border-radius: 10px; opacity: .9; }
${times(6, (i) => `.$ i:nth-child(${i + 1}) { transform: rotateY(${i * 60}deg) translateZ(100px); background: hsl(${i * 60} 80% 60%); }`)}
@keyframes $-k { to { transform: rotateY(-360deg); } }`,
    () => `<div class="$"><div>${times(6, () => "<i></i>")}</div></div>`),
  card("card-masonry-in", ["瀑布流入场", "一组卡片从下方依次弹入，排成网格。"], ["Staggered Grid", "A set of cards springs up into a grid one by one."], ["showcase"], "enter",
    `.$ { display: grid; grid-template-columns: repeat(4, 46px); gap: 8px; }
.$ i { height: 46px; border-radius: 10px; background: color-mix(in oklab, var(--accent) 70%, var(--card)); animation: $-k 3.2s cubic-bezier(.34,1.56,.64,1) infinite both; }
${times(8, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${(i % 4) * 0.08 + Math.floor(i / 4) * 0.16}s; }`)}
@keyframes $-k { 0% { opacity: 0; transform: translateY(30px) scale(.8); } 20%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }`,
    () => `<div class="$">${times(8, () => "<i></i>")}</div>`),
  card("card-pricing", ["推荐价格卡", "推荐方案卡片放大突出，角标轻轻弹跳。"], ["Featured Plan", "The recommended plan stands out larger with a bouncing badge."], ["feedback"], "hover",
    `.$ { display: flex; gap: 10px; align-items: center; }
.$ i { width: 64px; height: 92px; border-radius: 12px; background: var(--card); border: 1px solid var(--line); transition: transform .3s; }
.$ i:nth-child(2) { position: relative; height: 112px; border: 2px solid var(--accent); transform: translateY(-4px); box-shadow: 0 12px 24px color-mix(in oklab, var(--accent) 30%, transparent); }
.$ i:nth-child(2)::before { content: "★"; position: absolute; top: -12px; left: 50%; width: 24px; height: 24px; margin-left: -12px; display: grid; place-items: center; border-radius: 50%; background: var(--accent); color: var(--accent-fg); font-style: normal; font-size: 12px; animation: $-k 1.4s ease-in-out infinite; }
.$ i:hover { transform: translateY(-8px); }
@keyframes $-k { 50% { transform: translateY(-4px); } }`,
    () => `<div class="$">${times(3, () => "<i></i>")}</div>`),
  card("card-profile", ["个人名片", "悬停时头像放大，社交图标依次弹出。"], ["Profile Card", "The avatar grows and social icons pop out in turn on hover."], ["interactive"], "hover",
    `.$ { width: 62%; padding: 16px; box-sizing: border-box; display: grid; justify-items: center; gap: 8px; border-radius: 18px; background: var(--card); border: 1px solid var(--line); }
.$ i { width: 54px; height: 54px; border-radius: 50%; background: ${photo}; transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
.$ p { display: flex; gap: 8px; margin: 0; }
.$ p span { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; background: color-mix(in oklab, var(--fg) 8%, transparent); font-size: 12px; transform: scale(0); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
.$:hover i { transform: scale(1.12); }
.$:hover p span { transform: scale(1); }
${times(3, (i) => `.$:hover p span:nth-child(${i + 1}) { transition-delay: ${i * 0.07}s; }`)}`,
    (t) => `<div class="$"><i></i><b>${esc(t)}</b><p><span>✉</span><span>☎</span><span>⌂</span></p></div>`),
  card("card-swipe-hint", ["滑动提示", "卡片左右轻摆，提示可以左右滑动。"], ["Swipe Hint", "The card nudges side to side, hinting that it can be swiped."], ["feedback"], "auto",
    `${face}
.$ { animation: $-k 2.4s ease-in-out infinite; }
.$::before, .$::after { position: absolute; top: 50%; translate: 0 -50%; font-size: 20px; color: var(--muted); }
.$::before { content: "‹"; left: -24px; } .$::after { content: "›"; right: -24px; }
@keyframes $-k { 0%, 50%, 100% { transform: none; } 15% { transform: translateX(-16px) rotate(-3deg); } 35% { transform: translateX(16px) rotate(3deg); } }`),
  card("card-reveal-blur", ["模糊揭晓", "卡片内容先是模糊的，悬停后变清晰。"], ["Blur Reveal", "The card content is blurred until you hover over it."], ["interactive"], "hover",
    `${face}
.$ b, .$ span { filter: blur(6px); transition: filter .4s; }
.$::after { content: "👁"; position: absolute; inset: 0; display: grid; place-items: center; font-size: 24px; transition: opacity .3s; }
.$:hover b, .$:hover span { filter: none; }
.$:hover::after { opacity: 0; }`),
];
