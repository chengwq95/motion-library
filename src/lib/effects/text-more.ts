import { chars, esc, list, type SnippetDef } from "./helpers";
import { big, perChar, word } from "./text";

const dark = ".$-w { position: absolute; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at 50% 40%, #16122a, #07060b 70%); }";
const wrapDark = (t: string) => `<div class="$-w"><div class="$">${esc(t)}</div></div>`;
const withData = (t: string) => `<div class="$" data-t="${esc(t)}">${esc(t)}</div>`;

export const textMoreSnippets: SnippetDef[] = [
  perChar("underline-chars", ["逐字下划线", "每个字下方的短线依次亮起，像在逐字朗读。"], ["Letter Underlines", "A short underline lights up under each letter in turn, like reading along."], ["elegant"],
    "0%, 30%, 100% { box-shadow: inset 0 -0.08em 0 var(--line); } 12% { box-shadow: inset 0 -0.08em 0 var(--accent); color: var(--accent); }",
    { dur: "2.2s", step: "0.15s" }),
  perChar("block-highlight-chars", ["色块逐字高亮", "强调色色块依次跳到每个字上，文字反白。"], ["Block Highlight", "An accent block hops from letter to letter, inverting each one."], ["tech"],
    "0%, 22%, 100% { background: transparent; color: var(--fg); } 4%, 18% { background: var(--accent); color: var(--accent-fg); }",
    { dur: "2.4s", step: "0.2s", ease: "steps(1)", char: "padding: 0 .04em; border-radius: .08em;" }),
  perChar("outline-fill-chars", ["描边逐字填色", "空心文字从左到右逐字被填上颜色。"], ["Outline Fill Wave", "Hollow letters fill with color one by one, left to right."], ["showcase"],
    "0%, 15% { color: transparent; } 35%, 80% { color: var(--fg); } 100% { color: transparent; }",
    { dur: "3s", step: "0.15s", char: "-webkit-text-stroke: 1.5px var(--fg);" }),
  perChar("wave-3d-chars", ["3D 波浪", "每个字依次沿竖轴转出一个角度，形成立体波浪。"], ["3D Wave", "Each letter swivels on its vertical axis in turn, forming a 3D wave."], ["tech"],
    "0%, 50%, 100% { transform: rotateY(0); } 25% { transform: rotateY(55deg) translateZ(10px); }",
    { dur: "2s", step: "0.1s", root: "perspective: 500px;" }),
  perChar("blinds-in-chars", ["百叶翻入", "文字像百叶片一样从侧面翻转进来。"], ["Blinds In", "Letters swing in from the side like window blinds."], ["showcase"],
    "0% { opacity: 0; transform: rotateY(-90deg); } 20%, 80% { opacity: 1; transform: rotateY(0); } 100% { opacity: 0; transform: rotateY(90deg); }",
    { dur: "3s", step: "0.08s", root: "perspective: 600px;" }),
  perChar("char-glitch", ["字符错位", "个别字符随机跳位并闪出红蓝残影。"], ["Letter Glitch", "Random letters jump out of place with red and blue ghosts."], ["tech"],
    "0%, 90%, 100% { transform: none; text-shadow: none; } 92% { transform: translate(6%, -8%); text-shadow: -2px 0 #ef4444, 2px 0 #06b6d4; } 95% { transform: translate(-6%, 6%); text-shadow: 2px 0 #ef4444, -2px 0 #06b6d4; }",
    { by: "s", dur: "2.2s", step: "0.37s", ease: "steps(1)" }),
  perChar("sink-chars", ["沉没再现", "文字依次沉到基线下方消失，再浮上来。"], ["Sink and Rise", "Letters sink below the baseline one by one, then float back up."], ["elegant"],
    "0%, 15% { transform: none; } 40%, 55% { transform: translateY(110%); } 80%, 100% { transform: none; }",
    { dur: "3s", step: "0.08s", ease: "cubic-bezier(.65,0,.35,1)", root: "overflow: hidden; padding-bottom: .05em;" }),
  perChar("wiggle-chars", ["蠕动文字", "文字上下倾斜扭动，像一条小虫在爬。"], ["Wiggle", "Letters skew up and down in turn, like a crawling worm."], ["game"],
    "0%, 100% { transform: skewY(0); } 25% { transform: skewY(12deg); } 75% { transform: skewY(-12deg); }",
    { dur: "1.2s", step: "0.1s" }),
  perChar("weight-wave-chars", ["字重波浪", "粗细变化像波浪一样从左传到右。"], ["Weight Wave", "A wave of font weight rolls from left to right."], ["elegant"],
    "0%, 100% { font-weight: 200; } 50% { font-weight: 900; }",
    { dur: "2s", step: "0.12s", root: "font-weight: 200;" }),
  perChar("clip-rise-chars", ["裁切上滑", "每个字从下方被裁切着升起，再向上收走。"], ["Clip Rise", "Each letter rises into view through a clip, then exits upward."], ["showcase"],
    "0% { clip-path: inset(100% 0 0 0); transform: translateY(40%); } 20%, 75% { clip-path: inset(0); transform: none; } 100% { clip-path: inset(0 0 100% 0); transform: translateY(-40%); }",
    { dur: "3s", step: "0.07s", ease: "cubic-bezier(.22,1,.36,1)" }),
  perChar("shadow-pop-chars", ["投影弹起", "文字依次抬起，身后露出一块实色投影。"], ["Shadow Pop", "Letters lift in turn, revealing a solid offset shadow."], ["game"],
    "0%, 40%, 100% { transform: none; text-shadow: 0 0 0 var(--accent); } 20% { transform: translate(-4%, -6%); text-shadow: 0.06em 0.08em 0 var(--accent); }",
    { dur: "2s", step: "0.1s" }),
  perChar("random-jump-chars", ["随机跳高", "每个字跳起的高度都不一样，像在比赛。"], ["Random Heights", "Each letter jumps to a different height, as if competing."], ["game"],
    "0%, 50%, 100% { transform: translateY(0); } 25% { transform: translateY(calc(-8% - var(--s) * 9%)); }",
    { dur: "1.4s", step: "0.06s", ease: "ease-out" }),
  perChar("roll-down-chars", ["卷帘展开", "文字像卷帘一样从上往下翻开。"], ["Roll Down", "Letters unroll from the top like a window shade."], ["elegant"],
    "0% { opacity: 0; transform: rotateX(90deg); } 20%, 80% { opacity: 1; transform: rotateX(0); } 100% { opacity: 0; transform: rotateX(-90deg); }",
    { dur: "3s", step: "0.09s", root: "perspective: 500px;", char: "transform-origin: 50% 0;" }),
  perChar("converge-chars", ["汇聚文字", "文字从左右两侧飞向中间聚合成词。"], ["Converge", "Letters fly in from both sides and gather into the word."], ["impact"],
    "0% { opacity: 0; transform: translateX(calc(var(--o) * 90%)) scale(.6); } 25%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateX(calc(var(--o) * -40%)); }",
    { dur: "3s", step: "0s", ease: "cubic-bezier(.22,1,.36,1)" }),
  perChar("spread-chars", ["散开再合", "文字向两侧散开、拉开距离，再收拢回来。"], ["Spread Apart", "Letters drift apart from the center, then close back up."], ["elegant"],
    "0%, 15%, 100% { transform: none; } 45%, 70% { transform: translateX(calc(var(--o) * 30%)); }",
    { dur: "3s", step: "0s", ease: "cubic-bezier(.65,0,.35,1)" }),
  perChar("domino-chars", ["多米诺", "文字像多米诺骨牌一样依次倒下，再立起来。"], ["Dominoes", "Letters topple one after another like dominoes, then stand back up."], ["game"],
    "0%, 10% { transform: rotate(0); } 30%, 60% { transform: rotate(70deg); } 85%, 100% { transform: rotate(0); }",
    { dur: "3s", step: "0.1s", ease: "ease-in", char: "transform-origin: 100% 100%;" }),
  perChar("scatter-y-chars", ["错落排版", "文字在不同高度之间上下错落，像杂志排版。"], ["Staggered Layout", "Letters settle at different heights like magazine type."], ["showcase"],
    "0%, 100% { transform: translateY(0); } 50% { transform: translateY(calc((var(--s) - 2) * 10%)); }",
    { dur: "3s", step: "0s" }),
  perChar("spring-in-chars", ["弹簧落位", "文字从上方弹下来，来回弹几下才停稳。"], ["Spring In", "Letters spring down from above and bounce a few times before settling."], ["game"],
    "0% { transform: translateY(-120%); opacity: 0; } 10% { opacity: 1; } 20% { transform: translateY(12%); } 28% { transform: translateY(-8%); } 36% { transform: translateY(4%); } 44%, 85% { transform: none; opacity: 1; } 100% { opacity: 0; }",
    { dur: "3s", step: "0.08s" }),

  word("halftone-text", ["网点填充", "文字里填满半调网点，网点缓慢移动。"], ["Halftone Fill", "The letters are filled with halftone dots that slowly drift."], ["showcase"],
    `.$ { ${big} background: radial-gradient(circle, var(--accent) 34%, transparent 36%) 0 0 / 7px 7px; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 2s linear infinite; }
@keyframes $-k { to { background-position: 7px 7px; } }`),
  word("outline-shift-text", ["错位描边", "实心字后面跟着一层描边，来回错开又重合。"], ["Offset Outline", "An outline copy slides off the solid text and back."], ["impact"],
    `.$ { ${big} position: relative; color: var(--fg); }
.$::after { content: attr(data-t); position: absolute; inset: 0; color: transparent; -webkit-text-stroke: 1.5px var(--accent); animation: $-k 2.4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: none; } 50% { transform: translate(6px, 6px); } }`, withData),
  word("split-color-text", ["撞色分割", "一条硬边把文字分成两种颜色，分界线来回移动。"], ["Split Color", "A hard edge splits the word into two colors and slides back and forth."], ["impact"],
    `.$ { ${big} background: linear-gradient(90deg, var(--fg) 50%, var(--accent) 50%) 0 0 / 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 3s cubic-bezier(.65,0,.35,1) infinite alternate; }
@keyframes $-k { from { background-position: 100% 0; } to { background-position: 0 0; } }`),
  word("beam-sweep-text", ["光束扫字", "暗淡的文字上有一束光照过，被照到的地方变亮。"], ["Beam Sweep", "A beam of light passes over dim text, brightening what it touches."], ["tech"],
    `.$ { ${big} background: linear-gradient(90deg, color-mix(in oklab, var(--fg) 25%, transparent) 40%, var(--fg) 50%, color-mix(in oklab, var(--fg) 25%, transparent) 60%) 0 0 / 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 2.4s linear infinite; }
@keyframes $-k { from { background-position: 100% 0; } to { background-position: -50% 0; } }`),
  word("block-wipe-text", ["色块擦除", "一块颜色盖住文字，再从另一侧擦开露出文字。"], ["Block Wipe", "A color block covers the word, then wipes away to reveal it."], ["showcase"],
    `.$ { ${big} position: relative; color: var(--fg); animation: $-t 2.8s infinite; }
.$::after { content: ""; position: absolute; inset: 0 -4%; background: var(--accent); transform-origin: left; animation: $-k 2.8s cubic-bezier(.77,0,.18,1) infinite; }
@keyframes $-k { 0% { transform: scaleX(0); transform-origin: left; } 30% { transform: scaleX(1); transform-origin: left; } 31% { transform-origin: right; } 60%, 100% { transform: scaleX(0); transform-origin: right; } }
@keyframes $-t { 0%, 30% { opacity: 0; } 31%, 100% { opacity: 1; } }`),
  word("skew-glitch-text", ["扭曲故障", "文字突然倾斜、错位，像信号干扰。"], ["Skew Glitch", "The word suddenly skews and shifts like signal interference."], ["tech"],
    `.$ { ${big} color: var(--fg); animation: $-k 2.5s steps(1) infinite; }
@keyframes $-k { 0%, 88%, 100% { transform: none; filter: none; } 90% { transform: skewX(-25deg) translateX(-4%); filter: hue-rotate(90deg); } 93% { transform: skewX(18deg) translateX(3%); } 96% { transform: skewX(-6deg); } }`),
  word("neon-outline-text", ["霓虹描边", "空心霓虹灯管字，光晕一明一暗。"], ["Neon Outline", "Hollow neon-tube lettering with a breathing glow."], ["tech"],
    `${dark}
.$ { ${big} color: transparent; -webkit-text-stroke: 1.5px #67e8f9; animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { filter: drop-shadow(0 0 2px #22d3ee); } 50% { filter: drop-shadow(0 0 10px #22d3ee) drop-shadow(0 0 20px #0891b2); } }`, wrapDark),
  word("bounce-word", ["整体弹跳", "整个词跳起来，落地时被压扁。"], ["Word Bounce", "The whole word jumps and squashes on landing."], ["game"],
    `.$ { ${big} color: var(--fg); transform-origin: 50% 100%; animation: $-k 1.2s cubic-bezier(.5,0,.5,1) infinite; }
@keyframes $-k { 0%, 100% { transform: translateY(0) scale(1.1, .9); } 15% { transform: scale(1); } 50% { transform: translateY(-35%) scale(.95, 1.05); } 85% { transform: scale(1); } }`),
  word("swing-sign-text", ["招牌摆动", "文字像挂起来的招牌一样左右摆动。"], ["Swinging Sign", "The word sways like a hanging sign."], ["game"],
    `.$ { ${big} color: var(--fg); padding: .1em .3em; border: 3px solid var(--fg); border-radius: 8px; transform-origin: 50% -40%; animation: $-k 2.4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: rotate(8deg); } 50% { transform: rotate(-8deg); } }`),
  word("candle-text", ["烛光", "文字被暖色烛光照亮，光晕不规则地跳动。"], ["Candlelight", "Warm candlelight flickers irregularly around the text."], ["elegant"],
    `${dark}
.$ { ${big} color: #fde68a; animation: $-k 1.6s infinite; }
@keyframes $-k { 0%, 100% { text-shadow: 0 0 8px #f59e0b, 0 0 24px #b45309; opacity: 1; } 20% { text-shadow: 0 0 4px #f59e0b, 0 0 14px #b45309; opacity: .85; } 45% { text-shadow: 0 0 10px #fbbf24, 0 0 32px #d97706; } 70% { text-shadow: 0 0 6px #f59e0b, 0 0 18px #b45309; opacity: .92; } }`, wrapDark),
  word("ink-bleed-text", ["墨迹晕开", "文字像墨水落在宣纸上，先晕开再收拢成形。"], ["Ink Bleed", "The word bleeds like ink on rice paper, then pulls into shape."], ["elegant"],
    `.$ { ${big} color: var(--fg); animation: $-k 3.2s ease-out infinite; }
@keyframes $-k { 0% { filter: blur(14px); opacity: 0; letter-spacing: .3em; } 40%, 85% { filter: blur(0); opacity: 1; letter-spacing: 0; } 100% { filter: blur(6px); opacity: 0; } }`),
  word("pixel-shadow-text", ["像素阴影", "一层层阶梯状的像素阴影逐级伸出。"], ["Pixel Shadow", "Stair-stepped pixel shadows extend one level at a time."], ["game"],
    `.$ { ${big} color: var(--fg); animation: $-k 1.6s steps(4) infinite alternate; }
@keyframes $-k { from { text-shadow: 0 0 0 var(--accent); } to { text-shadow: ${list(6, (i) => `${(i + 1) * 2}px ${(i + 1) * 2}px 0 var(--accent)`)}; } }`),
  word("hover-tilt-text", ["悬停立体倾斜", "鼠标移上去时，文字向后倾倒并露出厚度。"], ["Hover Tilt", "On hover the word tips back and reveals its depth."], ["interactive"],
    `.$-w { perspective: 400px; }
.$ { ${big} color: var(--fg); cursor: pointer; transition: transform .5s cubic-bezier(.34,1.56,.64,1), text-shadow .5s; }
.$:hover { transform: rotateX(35deg); text-shadow: ${list(6, (i) => `0 ${i + 1}px 0 var(--accent)`)}; }`,
    (t) => `<div class="$-w"><div class="$">${esc(t)}</div></div>`, { t: "hover" }),
  word("hover-fill-text", ["悬停填色", "空心文字在悬停时被颜色从左到右填满。"], ["Hover Fill", "Hollow text fills with color left to right on hover."], ["interactive"],
    `.$ { ${big} cursor: pointer; color: transparent; -webkit-text-stroke: 1.5px var(--fg); background: linear-gradient(var(--accent), var(--accent)) no-repeat 0 0 / 0% 100%; -webkit-background-clip: text; background-clip: text; transition: background-size .6s cubic-bezier(.65,0,.35,1); }
.$:hover { background-size: 100% 100%; }`, undefined, { t: "hover" }),
  word("hover-spread-text", ["悬停散开", "悬停时字距拉开，文字变成强调色。"], ["Hover Spread", "On hover the letters spread apart and turn accent."], ["interactive"],
    `.$ { ${big} cursor: pointer; color: var(--fg); transition: letter-spacing .5s cubic-bezier(.22,1,.36,1), color .3s; }
.$:hover { letter-spacing: .25em; color: var(--accent); }`, undefined, { t: "hover" }),
  word("hover-glitch-text", ["悬停故障", "鼠标移上去时，文字出现红蓝错位故障。"], ["Hover Glitch", "Hovering triggers a red-and-blue glitch on the word."], ["tech"],
    `.$ { ${big} position: relative; cursor: pointer; color: var(--fg); }
.$::before, .$::after { content: attr(data-t); position: absolute; inset: 0; opacity: 0; }
.$::before { color: #ef4444; } .$::after { color: #06b6d4; }
.$:hover::before { opacity: .8; animation: $-k .35s steps(2) infinite; }
.$:hover::after { opacity: .8; animation: $-k .35s steps(2) infinite reverse; }
@keyframes $-k { 0% { transform: translate(-3px, 1px); clip-path: inset(10% 0 50% 0); } 50% { transform: translate(3px, -1px); clip-path: inset(55% 0 5% 0); } 100% { transform: translate(-2px, 0); clip-path: inset(30% 0 30% 0); } }`, withData, { t: "hover" }),
  word("border-spin-text", ["流光框字", "文字被一个渐变光框包住，光沿着边框旋转。"], ["Framed Glow", "The word sits in a frame with light racing around its border."], ["tech"],
    `.$ { ${big} font-size: 10cqw; position: relative; isolation: isolate; overflow: hidden; padding: .15em .5em; border-radius: 14px; color: var(--fg); }
.$::before { content: ""; position: absolute; z-index: -2; left: 50%; top: 50%; width: 200%; aspect-ratio: 1; translate: -50% -50%; background: conic-gradient(transparent 70%, var(--accent), var(--accent-2), transparent); animation: $-k 2.5s linear infinite; }
.$::after { content: ""; position: absolute; z-index: -1; inset: 2px; border-radius: 12px; background: var(--stage); }
@keyframes $-k { to { rotate: 360deg; } }`),
  word("tunnel-text", ["文字隧道", "一层层文字从中心放大飞出，像穿过隧道。"], ["Text Tunnel", "Layers of the word zoom out from the center like a tunnel."], ["impact"],
    `.$ { ${big} position: relative; color: transparent; }
.$ span { position: absolute; inset: 0; color: var(--accent); opacity: 0; animation: $-k 2.4s linear infinite; }
${[0, 1, 2, 3].map((i) => `.$ span:nth-child(${i + 1}) { animation-delay: ${i * 0.6}s; }`).join("\n")}
@keyframes $-k { 0% { transform: scale(.2); opacity: 0; } 20% { opacity: 1; } 100% { transform: scale(2.6); opacity: 0; } }`,
    (t) => `<div class="$">${esc(t)}${[0, 1, 2, 3].map(() => `<span aria-hidden="true">${esc(t)}</span>`).join("")}</div>`),
  word("stamp-text", ["盖章", "红色印章从上方重重盖下，略带歪斜。"], ["Rubber Stamp", "A red stamp slams down from above, slightly askew."], ["impact"],
    `.$ { ${big} font-size: 10cqw; padding: .1em .35em; border: 4px solid #dc2626; border-radius: 10px; color: #dc2626; animation: $-k 2.8s infinite; }
@keyframes $-k { 0% { transform: scale(3) rotate(-12deg); opacity: 0; } 12% { transform: scale(.95) rotate(-12deg); opacity: 1; } 18%, 85% { transform: scale(1) rotate(-12deg); opacity: .9; } 100% { opacity: 0; transform: scale(1) rotate(-12deg); } }`),
  word("rainbow-shadow-text", ["彩虹投影", "多彩阴影绕着文字转圈。"], ["Rainbow Shadow", "Colorful shadows circle around the word."], ["game"],
    `.$ { ${big} color: var(--fg); animation: $-k 3s linear infinite; }
@keyframes $-k { 0%, 100% { text-shadow: 4px 0 #f43f5e, -4px 0 #3b82f6, 0 4px #22c55e; } 33% { text-shadow: 0 4px #f43f5e, 0 -4px #3b82f6, 4px 0 #22c55e; } 66% { text-shadow: -4px 0 #f43f5e, 4px 0 #3b82f6, 0 -4px #22c55e; } }`),
  word("dash-outline-text", ["虚线描边字", "SVG 文字的虚线描边不停流动。"], ["Marching Outline", "The dashed outline of SVG text keeps marching."], ["tech"],
    `.$ { width: 90%; height: 70%; }
.$ text { font-weight: 900; font-size: 64px; fill: color-mix(in oklab, var(--accent) 12%, transparent); stroke: var(--accent); stroke-width: 2; stroke-dasharray: 8 6; animation: $-k 1s linear infinite; }
@keyframes $-k { to { stroke-dashoffset: -14; } }`,
    (t) => `<svg class="$" viewBox="0 0 400 100"><text x="50%" y="70%" text-anchor="middle">${esc(t)}</text></svg>`, { tech: "SVG" }),
  word("vertical-marquee-text", ["竖排滚动", "竖排文字从下往上不停滚动，像书法长卷。"], ["Vertical Scroll", "Vertical text scrolls endlessly upward like a scroll painting."], ["elegant"],
    `.$ { height: 82%; overflow: hidden; -webkit-mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); }
.$ div { display: flex; flex-direction: column; align-items: center; font-size: 7cqw; font-weight: 800; line-height: 1.2; color: var(--fg); animation: $-k 6s linear infinite; }
.$ .c { display: block; }
@keyframes $-k { from { transform: translateY(0); } to { transform: translateY(-50%); } }`,
    (t) => `<div class="$"><div>${chars(`${t}·`.repeat(8))}</div></div>`),
];
