import { btn } from "./buttons";
import { bg, pct } from "./backgrounds";
import { box, load } from "./loaders";
import { chars, esc, rnd, times, type SnippetDef } from "./helpers";
import { big, word } from "./text";

// Chinese-style effects: brush, seal, scroll, ink and lanterns. All tagged "chinese".

const serif = `font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", serif;`;
const SEAL = "#c8102e";

export const chineseSnippets: SnippetDef[] = [
  word("brush-write-text", ["毛笔书写", "文字像被毛笔一笔一笔写出来,墨色从左到右慢慢铺开。"], ["Brush Writing", "The word is written out as if with a brush, the ink spreading from left to right."], ["chinese", "elegant"],
    `.$ { ${big} ${serif} color: var(--fg); text-shadow: 0 0 1px currentColor; -webkit-mask: linear-gradient(90deg, #000 40%, transparent 60%) 100% 0 / 260% 100% no-repeat; mask: linear-gradient(90deg, #000 40%, transparent 60%) 100% 0 / 260% 100% no-repeat; animation: $-k 3.2s cubic-bezier(.5,0,.3,1) infinite; }
@keyframes $-k { 0% { -webkit-mask-position: 100% 0; mask-position: 100% 0; } 65%, 90% { -webkit-mask-position: 0 0; mask-position: 0 0; opacity: 1; } 100% { -webkit-mask-position: 0 0; mask-position: 0 0; opacity: 0; } }`),

  word("seal-stamp-text", ["印章盖下", "文字刻成一枚朱红印章,从空中重重盖下,带一点回弹。"], ["Seal Stamp", "The word becomes a vermilion seal that slams down from above with a little bounce."], ["chinese", "impact"],
    `.$ { display: inline-grid; place-items: center; padding: .18em .3em; border: .07em solid ${SEAL}; border-radius: .14em; color: ${SEAL}; ${serif} font-weight: 900; font-size: 11cqw; line-height: 1.05; letter-spacing: .04em; white-space: nowrap; box-shadow: inset 0 0 0 .03em ${SEAL}; background: color-mix(in oklab, ${SEAL} 6%, transparent); animation: $-k 2.6s cubic-bezier(.2,.9,.25,1.2) infinite; }
@keyframes $-k { 0% { transform: translateY(-30%) scale(1.9) rotate(-14deg); opacity: 0; } 22% { transform: scale(.94) rotate(-6deg); opacity: 1; } 30%, 85% { transform: scale(1) rotate(-6deg); opacity: 1; } 100% { transform: scale(1) rotate(-6deg); opacity: 0; } }`),

  word("vertical-reveal-text", ["竖排浮现", "文字竖着排列,一个字一个字从墨雾中浮现,像古书里的诗句。"], ["Vertical Reveal", "Characters stand in a vertical column and emerge one by one from an inky haze, like lines in an old book."], ["chinese", "elegant"],
    `.$ { display: flex; flex-direction: column; align-items: center; gap: .08em; ${serif} font-size: 10cqw; font-weight: 700; color: var(--fg); line-height: 1; }
.$ .c { opacity: 0; filter: blur(8px); transform: translateY(-.2em); animation: $-k 3.6s ease-out infinite; animation-delay: calc(var(--i) * .35s); }
@keyframes $-k { 0% { opacity: 0; filter: blur(8px); transform: translateY(-.2em); } 22%, 80% { opacity: 1; filter: blur(0); transform: none; } 100% { opacity: 0; filter: blur(4px); } }`,
    (t) => `<div class="$">${chars(t)}</div>`),

  word("scroll-unroll-text", ["卷轴展开", "两根卷轴向左右拉开,宣纸慢慢展开,露出中间的字。"], ["Scroll Unroll", "Two rods roll apart and the paper unfurls to reveal the word in the middle."], ["chinese", "showcase"],
    `.$ { position: relative; display: grid; place-items: center; height: 46%; width: 0; background: linear-gradient(#f4ecd8, #ebe0c4); box-shadow: inset 0 0 18px rgba(120,90,40,.25); animation: $-k 3.6s cubic-bezier(.65,0,.35,1) infinite; }
.$ span { ${serif} font-weight: 900; font-size: 9cqw; color: #2b2118; white-space: nowrap; overflow: hidden; }
.$::before, .$::after { content: ""; position: absolute; top: -8%; bottom: -8%; width: 5cqw; border-radius: 1cqw; background: linear-gradient(90deg, #5b3a1f, #a0703f 45%, #5b3a1f); box-shadow: 0 2px 6px rgba(0,0,0,.35); }
.$::before { left: -2.5cqw; } .$::after { right: -2.5cqw; }
@keyframes $-k { 0% { width: 0; } 40%, 85% { width: 64%; } 100% { width: 0; } }`,
    (t) => `<div class="$"><span>${esc(t)}</span></div>`),

  btn("seal-press-btn", ["按下盖章", "按下按钮的瞬间,一枚朱红印章盖在右上角。"], ["Seal Press", "The moment you press the button, a vermilion seal is stamped on its corner."], ["chinese", "feedback"],
    `.$ { overflow: visible; ${serif} border-color: var(--fg); }
.$::after { content: "印"; position: absolute; right: -14px; top: -16px; display: grid; place-items: center; width: 30px; height: 30px; border: 2px solid ${SEAL}; border-radius: 5px; color: ${SEAL}; font-size: 15px; font-weight: 900; background: color-mix(in oklab, ${SEAL} 10%, var(--card)); opacity: 0; transform: scale(2.2) rotate(-20deg); transition: transform .25s cubic-bezier(.2,.9,.25,1.3), opacity .2s; pointer-events: none; }
.$:active::after, .$:focus-visible::after { opacity: 1; transform: scale(1) rotate(-10deg); }
.$:active { transform: translateY(1px); }`, { t: "click" }),

  btn("ink-wash-btn", ["水墨晕染", "悬停时,一滴墨从中心晕开,把按钮染成墨色。"], ["Ink Wash", "On hover a drop of ink blooms from the center and washes the button dark."], ["chinese", "elegant"],
    `.$ { border-color: var(--fg); ${serif} }
.$::before { content: ""; position: absolute; z-index: -1; left: 50%; top: 50%; width: 140%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, var(--fg) 55%, color-mix(in oklab, var(--fg) 50%, transparent) 68%, transparent 72%); filter: blur(2px); transform: translate(-50%, -50%) scale(0); transition: transform .7s cubic-bezier(.3,.7,.2,1); }
.$:hover, .$:focus-visible { color: var(--page); }
.$:hover::before, .$:focus-visible::before { transform: translate(-50%, -50%) scale(1); }`),

  load("ink-drop-loader", ["墨滴涟漪", "一滴墨落下,在水面荡开一圈圈涟漪。"], ["Ink Drop", "A drop of ink falls and spreads ripples across the water."],
    `.$ { position: relative; width: 80px; height: 80px; }
.$ b { position: absolute; left: 50%; top: 0; width: 10px; height: 14px; margin-left: -5px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: var(--fg); animation: $-drop 2s cubic-bezier(.5,0,1,.6) infinite; }
.$ i { position: absolute; left: 50%; top: 70%; width: 60px; height: 18px; margin: -9px 0 0 -30px; border-radius: 50%; border: 2px solid var(--fg); opacity: 0; animation: $-ring 2s ease-out infinite; }
.$ i:nth-of-type(2) { animation-delay: .25s; } .$ i:nth-of-type(3) { animation-delay: .5s; }
@keyframes $-drop { 0% { transform: translateY(0); opacity: 1; } 45% { transform: translateY(42px); opacity: 1; } 50%, 100% { transform: translateY(42px) scale(.2); opacity: 0; } }
@keyframes $-ring { 0%, 45% { transform: scale(.1); opacity: 0; } 50% { opacity: .9; } 100% { transform: scale(1); opacity: 0; } }`,
    box(`<b></b>${times(3, () => "<i></i>")}`), ["chinese", "feedback"]),

  load("lantern-loader", ["红灯笼", "三盏红灯笼轻轻摇晃,依次亮起。"], ["Red Lanterns", "Three red lanterns sway gently and glow one after another."],
    `.$ { display: flex; gap: 14px; align-items: flex-start; height: 70px; }
.$ i { position: relative; width: 26px; height: 32px; margin-top: 12px; border-radius: 45%; background: radial-gradient(circle at 50% 40%, #ff6b5a, ${SEAL} 70%); box-shadow: 0 0 0 #ff9a3c; transform-origin: 50% -12px; animation: $-sway 1.8s ease-in-out infinite, $-glow 1.8s ease-in-out infinite; }
.$ i::before { content: ""; position: absolute; left: 50%; top: -12px; width: 1px; height: 12px; background: var(--muted); }
.$ i::after { content: ""; position: absolute; left: 50%; bottom: -10px; width: 2px; height: 10px; margin-left: -1px; background: #f0b45e; }
.$ i:nth-child(2) { animation-delay: -.3s, .6s; } .$ i:nth-child(3) { animation-delay: -.6s, 1.2s; }
@keyframes $-sway { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes $-glow { 0%, 100% { box-shadow: 0 0 0 rgba(255,154,60,0); } 30% { box-shadow: 0 0 18px rgba(255,154,60,.9); } }`,
    box(times(3, () => "<i></i>")), ["chinese", "feedback"]),

  bg("bg-ink-mountains", ["水墨远山", "几层水墨山峦缓缓横移,远淡近浓,山间飘着薄雾。"], ["Ink Mountains", "Layers of ink-wash mountains drift sideways, pale in the distance and dark up close, with mist in between."], ["chinese", "elegant"],
    `.$ { background: linear-gradient(#f3efe6, #e4ddcf); color: #1f1a16; }
.$ i { position: absolute; left: 0; bottom: 0; width: 200%; animation: $-k linear infinite; background: currentColor; -webkit-mask: var(--m) repeat-x 0 100% / 50% 100%; mask: var(--m) repeat-x 0 100% / 50% 100%; }
.$ i:nth-child(1) { height: 70%; opacity: .18; animation-duration: 60s; }
.$ i:nth-child(2) { height: 55%; opacity: .32; animation-duration: 40s; }
.$ i:nth-child(3) { height: 38%; opacity: .62; animation-duration: 26s; }
.$::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(transparent 40%, rgba(243,239,230,.65) 62%, transparent 80%); }
.$ .t { ${serif} color: #1f1a16; }
@keyframes $-k { to { transform: translateX(-50%); } }`,
    () => [
      "M0 100 L0 60 Q8 30 16 52 Q24 18 34 46 Q42 28 50 50 Q60 12 70 44 Q80 30 88 54 Q94 40 100 58 L100 100 Z",
      "M0 100 L0 70 Q10 44 22 64 Q32 38 44 62 Q56 46 66 66 Q78 40 90 62 Q96 54 100 66 L100 100 Z",
      "M0 100 L0 78 Q12 60 24 76 Q36 58 50 74 Q62 62 74 78 Q86 64 100 76 L100 100 Z",
    ].map((d) => `<i style="--m: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='${d}'/%3E%3C/svg%3E&quot;)"></i>`).join("")),

  bg("bg-falling-petals", ["梅花飘落", "朱红色的梅花瓣一边旋转一边缓缓飘落。"], ["Falling Petals", "Vermilion plum petals twirl as they drift slowly down."], ["chinese", "elegant"],
    `.$ { background: radial-gradient(ellipse at top, color-mix(in oklab, ${SEAL} 8%, var(--stage)), var(--stage)); }
.$ i { position: absolute; top: -10%; width: 12px; height: 9px; border-radius: 80% 0 80% 0; background: linear-gradient(135deg, #ff8a8a, ${SEAL}); opacity: .85; animation: $-fall linear infinite, $-spin ease-in-out infinite alternate; }
.$ .t { ${serif} }
@keyframes $-fall { to { top: 110%; translate: var(--x) 0; } }
@keyframes $-spin { from { rotate: 0deg; scale: 1 .8; } to { rotate: 260deg; scale: .7 1; } }`,
    () => times(18, (i) => `<i style="left:${pct(i, 91)};--x:${((rnd(i, 92) - 0.5) * 120).toFixed(0)}px;animation-duration:${(5 + rnd(i, 93) * 5).toFixed(1)}s,${(1.5 + rnd(i, 94) * 2).toFixed(1)}s;animation-delay:-${(rnd(i, 95) * 9).toFixed(1)}s,0s"></i>`)),
];
