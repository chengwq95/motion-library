import type { ContextKind } from "../types";
import { charCss, charHtml, esc, list, times, type SnippetDef } from "./helpers";

type Opts = Parameters<typeof charCss>[1];

// Per-character effects: same keyframes on every character, staggered.
const perChar = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], keyframes: string, o?: Opts): SnippetDef =>
  ({ id, zh, en, c: "text", t: "auto", m, css: charCss(keyframes, o), html: charHtml });

// Whole-word effects.
const word = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], css: string, html?: SnippetDef["html"], extra?: Partial<SnippetDef>): SnippetDef =>
  ({ id, zh, en, c: "text", t: "auto", m, css, html: html ?? ((t) => `<div class="$">${esc(t)}</div>`), ...extra });

const big = "font-weight: 900; font-size: 14cqw; line-height: 1.1; white-space: nowrap;";

export const textSnippets: SnippetDef[] = [
  perChar("wave-text", ["波浪文字", "文字依次上下起伏，像水面的波浪。"], ["Wave Text", "Letters rise and fall one after another like a wave."], ["showcase"],
    "0%, 40%, 100% { transform: translateY(0); } 20% { transform: translateY(-25%); }"),
  perChar("bounce-text", ["弹跳文字", "每个字跳起再落地，落地时轻微压扁。"], ["Bouncy Letters", "Each letter jumps and squashes a little on landing."], ["game"],
    "0%, 100% { transform: translateY(0) scale(1); } 30% { transform: translateY(-35%) scale(.95, 1.08); } 50% { transform: translateY(0) scale(1.12, .88); } 62% { transform: scale(1); }",
    { dur: "1.4s", char: "transform-origin: 50% 100%;" }),
  perChar("fade-up-text", ["逐字上浮", "文字从下方逐个淡入，停留后向上淡出。"], ["Fade Up Letters", "Letters fade in from below one by one, then drift up and out."], ["elegant"],
    "0% { opacity: 0; transform: translateY(40%); } 20%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-30%); }",
    { dur: "3s", step: "0.1s" }),
  perChar("blur-in-text", ["模糊显现", "文字由模糊到清晰逐个显现。"], ["Blur In", "Letters sharpen into focus one at a time."], ["elegant"],
    "0% { opacity: 0; filter: blur(10px); } 25%, 80% { opacity: 1; filter: blur(0); } 100% { opacity: 0; filter: blur(10px); }",
    { dur: "3s", step: "0.12s" }),
  perChar("pop-text", ["逐字弹出", "文字从零放大并略微回弹。"], ["Pop In", "Letters scale up from nothing with a small overshoot."], ["game"],
    "0% { transform: scale(0); } 12% { transform: scale(1.3); } 20%, 85% { transform: scale(1); } 100% { transform: scale(0); }",
    { dur: "2.6s", ease: "cubic-bezier(.34,1.56,.64,1)" }),
  perChar("spin-in-text", ["旋转入场", "文字旋转着缩放进场。"], ["Spin In", "Letters spin and scale into place."], ["impact"],
    "0% { opacity: 0; transform: rotate(-180deg) scale(0); } 25%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; transform: rotate(90deg) scale(.5); }",
    { dur: "2.8s" }),
  perChar("flip-x-text", ["横轴翻转", "每个字沿水平轴翻一圈。"], ["Flip X", "Each letter flips a full turn around the horizontal axis."], ["game"],
    "0%, 60%, 100% { transform: rotateX(0); } 30% { transform: rotateX(360deg); }",
    { root: "perspective: 600px;" }),
  perChar("drop-text", ["从天而降", "文字从上方掉落并弹两下。"], ["Drop In", "Letters fall from above and bounce twice."], ["impact"],
    "0% { opacity: 0; transform: translateY(-160%); } 14% { opacity: 1; transform: translateY(0); } 20% { transform: translateY(-14%); } 26% { transform: translateY(0); } 30% { transform: translateY(-5%); } 34%, 80% { transform: translateY(0); opacity: 1; } 100% { opacity: 0; }",
    { dur: "3s", ease: "ease-in" }),
  perChar("rise-text", ["升起消散", "文字从右到左依次上升消失，再从下方回来。"], ["Rise Away", "Letters float up and vanish right to left, then return from below."], ["elegant"],
    "0%, 20% { opacity: 1; transform: none; } 50% { opacity: 0; transform: translateY(-60%); } 51% { opacity: 0; transform: translateY(60%); } 80%, 100% { opacity: 1; transform: none; }",
    { by: "r", dur: "2.6s" }),
  perChar("jelly-text", ["果冻文字", "文字像果冻一样被挤压又弹回。"], ["Jelly Text", "Letters squash and wobble back like jelly."], ["game"],
    "0%, 60%, 100% { transform: scale(1); } 15% { transform: scale(1.25, .75); } 22% { transform: scale(.75, 1.25); } 30% { transform: scale(1.15, .85); } 40% { transform: scale(.95, 1.05); } 50% { transform: scale(1.05, .95); }",
    { dur: "2s", step: "0.06s" }),
  perChar("swing-text", ["钟摆摇曳", "每个字像挂在线上一样左右摇摆。"], ["Swinging Letters", "Letters sway as if hanging from a string."], ["game"],
    "0%, 100% { transform: rotate(0); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); }",
    { dur: "2s", char: "transform-origin: 50% 0;" }),
  perChar("shake-text", ["震动文字", "文字从中间向两侧依次快速抖动。"], ["Shaky Text", "Letters jitter rapidly, spreading out from the middle."], ["impact"],
    "0%, 50%, 100% { transform: none; } 5%, 15%, 25%, 35%, 45% { transform: translateX(-8%) rotate(-3deg); } 10%, 20%, 30%, 40% { transform: translateX(8%) rotate(3deg); }",
    { by: "d", dur: "1.6s", step: "0.1s" }),
  perChar("skew-text", ["倾斜扫过", "一道倾斜的波浪从左到右扫过文字。"], ["Skew Sweep", "A skewing wave sweeps across the letters."], ["tech"],
    "0%, 40%, 100% { transform: skewX(0); } 20% { transform: skewX(-25deg) translateX(6%); }",
    { dur: "1.6s", step: "0.06s" }),
  perChar("rainbow-letters", ["彩虹波", "颜色像彩虹一样在文字间流动。"], ["Rainbow Wave", "Rainbow colors ripple through the letters."], ["game"],
    "0%, 100% { color: #f43f5e; } 20% { color: #f59e0b; } 40% { color: #10b981; } 60% { color: #3b82f6; } 80% { color: #a855f7; }",
    { dur: "2.4s", ease: "linear", step: "0.15s" }),
  perChar("glow-letters", ["逐字发光", "文字依次亮起，带有霓虹光晕。"], ["Glow Chase", "Letters light up in turn with a neon halo."], ["tech"],
    "0%, 40%, 100% { color: var(--muted); text-shadow: none; } 20% { color: var(--fg); text-shadow: 0 0 10px var(--accent), 0 0 24px var(--accent); }",
    { dur: "2s", step: "0.15s" }),
  perChar("zoom-letters", ["放大脉冲", "放大效果像脉冲一样从左传到右。"], ["Zoom Pulse", "A zoom pulse travels from left to right."], ["impact"],
    "0%, 30%, 100% { transform: scale(1); } 15% { transform: scale(1.4); }",
    { dur: "1.8s", step: "0.1s" }),
  perChar("spin-letters", ["逐字旋转", "每个字依次原地转一圈。"], ["Spinning Letters", "Each letter spins once in turn."], ["game"],
    "0% { transform: rotate(0); } 30%, 100% { transform: rotate(360deg); }",
    { dur: "2.4s", step: "0.12s" }),
  perChar("slide-through-text", ["横向穿梭", "文字从左侧滑入，再向右侧滑出。"], ["Slide Through", "Letters slide in from the left and out to the right."], ["tech"],
    "0% { opacity: 0; transform: translateX(-120%); } 20%, 75% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateX(120%); }",
    { dur: "3s", step: "0.07s", root: "overflow: hidden;" }),
  perChar("elastic-letters", ["弹性拉伸", "文字被纵向拉长后弹性回弹。"], ["Elastic Stretch", "Letters stretch tall and spring back."], ["game"],
    "0%, 80%, 100% { transform: scaleY(1); } 20% { transform: scaleY(1.6); } 35% { transform: scaleY(.7); } 50% { transform: scaleY(1.2); } 65% { transform: scaleY(.92); }",
    { dur: "2s", char: "transform-origin: 50% 100%;" }),
  perChar("flicker-letters", ["随机闪烁", "文字以随机顺序快速闪烁，像接触不良的灯牌。"], ["Random Flicker", "Letters flicker in random order like a faulty sign."], ["tech"],
    "0%, 100% { opacity: 1; } 3% { opacity: .1; } 6% { opacity: 1; } 9% { opacity: .2; } 12% { opacity: 1; }",
    { by: "s", dur: "2.4s", ease: "steps(1)", step: "0.3s" }),
  perChar("center-out-text", ["中心扩散", "文字从中间向两边依次浮现。"], ["Center Out", "Letters appear from the center outward."], ["elegant"],
    "0% { opacity: 0; transform: translateY(40%) scale(.8); } 25%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; }",
    { by: "d", dur: "2.8s", step: "0.15s" }),
  perChar("random-pop-text", ["随机弹出", "文字以随机顺序弹出。"], ["Random Pop", "Letters pop in a random order."], ["game"],
    "0% { transform: scale(0) rotate(-20deg); } 15% { transform: scale(1.25) rotate(5deg); } 25%, 85% { transform: none; } 100% { transform: scale(0); }",
    { by: "s", dur: "2.8s", step: "0.12s" }),
  perChar("fall-apart-text", ["散落掉落", "文字依次掉落下去，再从上方落回原位。"], ["Fall Apart", "Letters tumble away one by one, then drop back into place."], ["impact"],
    "0%, 30% { opacity: 1; transform: none; } 55% { opacity: 0; transform: translateY(120%) rotate(calc((var(--i) - 2) * 20deg)); } 56% { opacity: 0; transform: translateY(-120%); } 80%, 100% { opacity: 1; transform: none; }",
    { dur: "3s", ease: "ease-in", step: "0.1s" }),
  perChar("roll-3d-text", ["立体翻滚", "文字像立方体一样向前翻滚。"], ["3D Roll", "Letters roll forward like the faces of a cube."], ["tech"],
    "0% { opacity: 0; transform: rotateX(-90deg); } 20%, 75% { opacity: 1; transform: rotateX(0); } 100% { opacity: 0; transform: rotateX(90deg); }",
    { dur: "3s", root: "perspective: 500px;", char: "transform-origin: 50% 50% -0.5em;" }),
  perChar("hop-text", ["跳格子", "文字快速轮流跳起，像在跳格子。"], ["Hopscotch", "Letters take quick turns hopping up."], ["game"],
    "0%, 20%, 100% { transform: translateY(0); } 10% { transform: translateY(-30%); }",
    { dur: "1.2s", ease: "ease-out", step: "0.1s" }),
  perChar("breathe-letters", ["呼吸文字", "文字依次轻轻放大变亮，像在呼吸。"], ["Breathing Letters", "Letters gently grow and brighten as if breathing."], ["elegant"],
    "0%, 100% { opacity: .35; transform: scale(.92); } 50% { opacity: 1; transform: scale(1); }",
    { dur: "2.4s", step: "0.2s" }),
  perChar("squash-drop-text", ["挤压落地", "文字落下时被压扁，再恢复原状。"], ["Squash Landing", "Letters land with a squash, then recover."], ["game"],
    "0% { transform: translateY(-60%) scale(.85, 1.2); } 25% { transform: translateY(0) scale(1.3, .7); } 40% { transform: scale(.9, 1.1); } 55%, 100% { transform: scale(1); }",
    { dur: "1.8s", ease: "ease-in", char: "transform-origin: 50% 100%;" }),
  perChar("wobble-letters", ["左右摇头", "每个字持续左右摇摆。"], ["Wobble", "Each letter keeps tilting side to side."], ["game"],
    "0%, 100% { transform: rotate(0); } 25% { transform: rotate(-12deg); } 75% { transform: rotate(12deg); }",
    { dur: "1.2s", step: "0.15s" }),
  perChar("float-letters", ["漂浮环绕", "每个字绕着小圆圈缓缓漂浮。"], ["Floating Orbit", "Letters drift slowly in small circles."], ["elegant"],
    "0%, 100% { transform: translate(0, 0); } 25% { transform: translate(6%, -8%); } 50% { transform: translate(0, -16%); } 75% { transform: translate(-6%, -8%); }",
    { dur: "3s", ease: "linear", step: "0.25s" }),
  perChar("mirror-letters", ["镜像翻转", "文字依次水平镜像再翻回来。"], ["Mirror Flip", "Letters mirror horizontally in turn, then flip back."], ["tech"],
    "0%, 35%, 100% { transform: scaleX(1); } 15%, 20% { transform: scaleX(-1); }",
    { dur: "2.4s", step: "0.12s" }),
  perChar("heartbeat-letters", ["心跳文字", "文字依次像心跳一样跳动两下。"], ["Heartbeat Letters", "Letters pulse twice like a heartbeat, in turn."], ["feedback"],
    "0%, 40%, 100% { transform: scale(1); } 10% { transform: scale(1.25); } 20% { transform: scale(1); } 28% { transform: scale(1.15); }",
    { dur: "1.8s", step: "0.12s" }),
  perChar("split-letters", ["上下交错", "奇数字向上、偶数字向下，交错移动。"], ["Zigzag Split", "Alternate letters move up and down in opposite directions."], ["tech"],
    "0%, 100% { transform: translateY(0); } 50% { transform: translateY(calc((var(--p) * 2 - 1) * 30%)); }",
    { dur: "1.6s", step: "0s" }),
  perChar("cascade-text", ["瀑布落下", "文字从左上方斜着依次落入。"], ["Cascade", "Letters cascade in diagonally from the top left."], ["showcase"],
    "0% { opacity: 0; transform: translate(-60%, -120%) rotate(-30deg); } 20%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; }",
    { dur: "3s", ease: "cubic-bezier(.22,1,.36,1)", step: "0.1s" }),
  perChar("lift-letters", ["悬浮抬起", "文字依次被抬起，下方出现投影。"], ["Lift Off", "Letters lift up in turn with a shadow beneath."], ["elegant"],
    "0%, 50%, 100% { transform: translateY(0); text-shadow: 0 0 0 transparent; } 25% { transform: translateY(-14%); text-shadow: 0 0.18em 0.12em rgb(0 0 0 / .25); }",
    { dur: "2s", step: "0.12s" }),
  perChar("gradient-letters", ["渐变扫字", "强调色像扫描光一样逐字掠过。"], ["Accent Sweep", "An accent color scans across the letters."], ["tech"],
    "0%, 30%, 100% { color: var(--fg); transform: none; } 12% { color: var(--accent); transform: translateY(-6%); }",
    { dur: "2s", step: "0.08s" }),
  perChar("stretch-letters", ["横向拉伸", "文字依次被横向拉宽再还原。"], ["Wide Stretch", "Letters stretch wide and settle back in turn."], ["impact"],
    "0%, 40%, 100% { transform: scaleX(1); } 20% { transform: scaleX(1.5); }",
    { dur: "1.8s", step: "0.1s" }),
  perChar("tilt-in-text", ["倾斜进场", "文字从倾斜状态立起来。"], ["Tilt Up", "Letters tip upright from a slant."], ["showcase"],
    "0% { opacity: 0; transform: rotate(-35deg) translateY(30%); } 20%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; transform: rotate(20deg); }",
    { dur: "3s", step: "0.1s", char: "transform-origin: 0 100%;" }),
  perChar("type-scale-text", ["缩放打字", "文字从大到小依次落位，像盖章。"], ["Stamp In", "Letters stamp down from large to normal size."], ["impact"],
    "0% { opacity: 0; transform: scale(3); } 12%, 85% { opacity: 1; transform: scale(1); } 100% { opacity: 0; }",
    { dur: "3s", ease: "cubic-bezier(.5,0,.75,0)", step: "0.15s" }),

  word("gradient-flow-text", ["渐变流动", "多彩渐变在文字内部不停流动。"], ["Gradient Flow", "A colorful gradient flows through the text."], ["showcase"],
    `.$ { ${big} background: linear-gradient(90deg, #f472b6, #a78bfa, #38bdf8, #34d399, #f472b6); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 4s linear infinite; }
@keyframes $-k { to { background-position: 300% 0; } }`),
  word("neon-sign", ["霓虹灯牌", "粉色霓虹灯，偶尔闪烁一下。"], ["Neon Sign", "A pink neon sign that flickers now and then."], ["tech"],
    `.$ { ${big} color: #fff0f6; text-shadow: 0 0 4px #fff, 0 0 10px #f472b6, 0 0 22px #ec4899, 0 0 44px #db2777; animation: $-k 3s infinite; }
@keyframes $-k { 0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: .35; text-shadow: none; } }`),
  word("glitch-text", ["故障文字", "红青两色错位切片，像信号故障。"], ["Glitch", "Red and cyan slices jump out of place like a bad signal."], ["tech"],
    `.$ { ${big} position: relative; color: var(--fg); }
.$::before, .$::after { content: attr(data-t); position: absolute; inset: 0; }
.$::before { color: #ef4444; animation: $-a 2s infinite steps(1); }
.$::after { color: #06b6d4; animation: $-b 2s infinite steps(1); }
@keyframes $-a { 0%, 100% { clip-path: inset(0 0 100% 0); } 10% { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 0); } 20% { clip-path: inset(50% 0 20% 0); transform: translate(3px, 0); } 30% { clip-path: inset(0 0 100% 0); } }
@keyframes $-b { 0%, 100% { clip-path: inset(0 0 100% 0); } 12% { clip-path: inset(60% 0 10% 0); transform: translate(4px, 0); } 22% { clip-path: inset(20% 0 55% 0); transform: translate(-3px, 0); } 32% { clip-path: inset(0 0 100% 0); } }`,
    (t) => `<div class="$" data-t="${esc(t)}">${esc(t)}</div>`),
  word("stroke-draw-text", ["描边书写", "SVG 描边像用笔写出文字，再填满颜色。"], ["Handwritten Stroke", "An SVG stroke writes out the text, then fills it in."], ["elegant"],
    `.$ { width: 90%; height: 70%; }
.$ text { font-weight: 900; font-size: 64px; fill: transparent; stroke: var(--fg); stroke-width: 1.5; stroke-dasharray: 400; stroke-dashoffset: 400; animation: $-k 4s ease-in-out infinite; }
@keyframes $-k { 0% { stroke-dashoffset: 400; fill: transparent; } 50% { stroke-dashoffset: 0; fill: transparent; } 70%, 90% { stroke-dashoffset: 0; fill: var(--fg); } 100% { stroke-dashoffset: 0; fill: transparent; } }`,
    (t) => `<svg class="$" viewBox="0 0 400 100"><text x="50%" y="70%" text-anchor="middle">${esc(t)}</text></svg>`, { tech: "SVG" }),
  word("liquid-fill-text", ["描边填充", "空心文字从下往上被颜色灌满。"], ["Outline Fill", "Hollow text fills up with color from the bottom."], ["showcase"],
    `.$ { ${big} color: transparent; -webkit-text-stroke: 2px var(--accent); background: linear-gradient(var(--accent), var(--accent)) no-repeat 0 100% / 100% 0%; -webkit-background-clip: text; background-clip: text; animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 10% { background-size: 100% 0%; } 60%, 85% { background-size: 100% 100%; } 100% { background-size: 100% 0%; } }`),
  word("highlighter-text", ["荧光笔", "一道荧光笔从左到右涂过文字。"], ["Highlighter", "A highlighter stroke sweeps across the text."], ["elegant"],
    `.$ { ${big} color: var(--fg); padding: 0 .1em; background: linear-gradient(transparent 55%, #fde047 55%, #fde047 90%, transparent 90%) no-repeat 0 0 / 0% 100%; animation: $-k 3s ease-in-out infinite; }
:root[data-theme="dark"] .$ { background-image: linear-gradient(transparent 55%, #a16207 55%, #a16207 90%, transparent 90%); }
@keyframes $-k { 0%, 10% { background-size: 0% 100%; } 50%, 85% { background-size: 100% 100%; } 100% { background-size: 0% 100%; } }`),
  word("underline-grow-text", ["下划线生长", "下划线从左侧长出，再从右侧收回。"], ["Underline Grow", "An underline grows from the left and retracts to the right."], ["elegant"],
    `.$ { ${big} position: relative; color: var(--fg); }
.$::after { content: ""; position: absolute; left: 0; right: 0; bottom: -0.05em; height: .08em; border-radius: 1em; background: var(--accent); transform-origin: left; animation: $-k 2.6s ease-in-out infinite; }
@keyframes $-k { 0% { transform: scaleX(0); transform-origin: left; } 45% { transform: scaleX(1); transform-origin: left; } 55% { transform: scaleX(1); transform-origin: right; } 100% { transform: scaleX(0); transform-origin: right; } }`),
  word("strike-text", ["删除线划过", "一条删除线划过文字，文字随之变淡。"], ["Strike Through", "A line strikes through the text as it fades."], ["feedback"],
    `.$ { ${big} position: relative; color: var(--fg); animation: $-f 3s infinite; }
.$::after { content: ""; position: absolute; left: -4%; top: 52%; height: .07em; width: 108%; background: #ef4444; transform-origin: left; animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 15% { transform: scaleX(0); } 45%, 85% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes $-f { 0%, 30%, 100% { opacity: 1; } 50%, 85% { opacity: .45; } }`),
  word("long-shadow-text", ["长投影", "长长的斜向投影在文字后方摆动。"], ["Long Shadow", "A long diagonal shadow swings behind the text."], ["showcase"],
    `.$ { ${big} color: var(--accent); animation: $-k 3s ease-in-out infinite alternate; }
@keyframes $-k { from { text-shadow: ${list(10, (i) => `${i + 1}px ${i + 1}px 0 color-mix(in oklab, var(--accent) ${40 - i * 3}%, transparent)`)}; } to { text-shadow: ${list(10, (i) => `-${i + 1}px ${i + 1}px 0 color-mix(in oklab, var(--accent) ${40 - i * 3}%, transparent)`)}; } }`),
  word("extrude-text", ["立体字", "层层叠加的阴影让文字像 3D 浮雕，并缓慢倾斜。"], ["3D Extrude", "Stacked shadows make the text look extruded as it tilts."], ["impact"],
    `.$ { ${big} color: var(--fg); text-shadow: ${list(6, (i) => `0 ${i + 1}px 0 var(--accent)`)}, 0 8px 12px rgb(0 0 0 / .3); animation: $-k 4s ease-in-out infinite; }
.$-w { perspective: 400px; }
@keyframes $-k { 0%, 100% { transform: rotateX(15deg) rotateY(-15deg); } 50% { transform: rotateX(15deg) rotateY(15deg); } }`,
    (t) => `<div class="$-w"><div class="$">${esc(t)}</div></div>`),
  word("blur-breathe-text", ["呼吸模糊", "文字在模糊与清晰之间缓慢切换，字距也随之变化。"], ["Breathing Blur", "Text slowly drifts in and out of focus, its spacing breathing with it."], ["elegant"],
    `.$ { ${big} color: var(--fg); animation: $-k 4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { filter: blur(0); letter-spacing: 0; } 50% { filter: blur(4px); letter-spacing: .12em; opacity: .6; } }`),
  word("tracking-text", ["字距展开", "字母间距缓缓拉开再收拢。"], ["Tracking Expand", "Letter spacing opens up and closes again."], ["elegant"],
    `.$ { ${big} font-size: 11cqw; color: var(--fg); animation: $-k 3s cubic-bezier(.65,0,.35,1) infinite; }
@keyframes $-k { 0%, 100% { letter-spacing: -0.02em; } 50% { letter-spacing: .35em; } }`),
  word("mask-reveal-text", ["遮罩揭示", "文字被遮罩从左到右揭开，再收回。"], ["Mask Reveal", "A mask uncovers the text left to right, then covers it again."], ["showcase"],
    `.$ { ${big} color: var(--fg); animation: $-k 3s cubic-bezier(.77,0,.18,1) infinite; }
@keyframes $-k { 0% { clip-path: inset(0 100% 0 0); } 40%, 70% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }`),
  word("split-reveal-text", ["上下开合", "文字上下两半分开又合上。"], ["Split Open", "The top and bottom halves of the text part and close."], ["impact"],
    `.$ { ${big} position: relative; color: var(--fg); }
.$ span { display: block; }
.$ span + span { position: absolute; inset: 0; }
.$ span:first-child { clip-path: inset(0 0 50% 0); animation: $-t 2.4s ease-in-out infinite; }
.$ span + span { clip-path: inset(50% 0 0 0); animation: $-b 2.4s ease-in-out infinite; }
@keyframes $-t { 0%, 20%, 80%, 100% { transform: none; } 40%, 60% { transform: translateY(-18%); } }
@keyframes $-b { 0%, 20%, 80%, 100% { transform: none; } 40%, 60% { transform: translateY(18%); } }`,
    (t) => `<div class="$"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)}</span></div>`),
  word("slot-text", ["文字滚轮", "文字像老虎机滚轮一样向上翻动停下。"], ["Slot Reel", "The text rolls up like a slot machine reel and stops."], ["game"],
    `.$ { ${big} height: 1.1em; overflow: hidden; color: var(--fg); }
.$ div { animation: $-k 3s cubic-bezier(.7,0,.3,1) infinite; }
.$ div span { display: block; height: 1.1em; }
.$ div span:nth-child(2) { color: var(--accent); }
@keyframes $-k { 0%, 25% { transform: translateY(0); } 33%, 58% { transform: translateY(-1.1em); } 66%, 91% { transform: translateY(-2.2em); } 100% { transform: translateY(-3.3em); } }`,
    (t) => `<div class="$"><div>${times(4, (i) => `<span${i ? ' aria-hidden="true"' : ""}>${esc(t)}</span>`)}</div></div>`),
  word("chromatic-text", ["色差漂移", "红蓝色差在文字两侧来回漂移。"], ["Chromatic Drift", "Red and blue fringes drift back and forth around the text."], ["tech"],
    `.$ { ${big} color: var(--fg); animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { text-shadow: -3px 0 rgb(239 68 68 / .8), 3px 0 rgb(59 130 246 / .8); } 50% { text-shadow: 3px 1px rgb(239 68 68 / .8), -3px -1px rgb(59 130 246 / .8); } }`),
  word("hue-text", ["彩虹变色", "整段文字的颜色在色环上循环变化。"], ["Hue Cycle", "The whole word cycles around the color wheel."], ["game"],
    `.$ { ${big} color: #f43f5e; animation: $-k 4s linear infinite; }
@keyframes $-k { to { filter: hue-rotate(360deg); } }`),
  word("glow-pulse-text", ["辉光脉冲", "文字外围的光晕有节奏地明暗变化。"], ["Glow Pulse", "A soft glow around the text pulses rhythmically."], ["tech"],
    `.$ { ${big} color: var(--fg); animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { text-shadow: 0 0 0 transparent; } 50% { text-shadow: 0 0 12px var(--accent), 0 0 32px var(--accent); } }`),
  word("metal-text", ["金属光泽", "银色金属质感文字，光泽来回扫过。"], ["Metallic Sheen", "Silver metallic text with a sheen gliding across."], ["elegant"],
    `.$ { ${big} background: linear-gradient(100deg, #6b7280 20%, #f9fafb 40%, #9ca3af 50%, #f3f4f6 60%, #6b7280 80%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 3s ease-in-out infinite alternate; }
@keyframes $-k { from { background-position: 100% 0; } to { background-position: 0 0; } }`),
  word("fire-text", ["火焰文字", "橙红色火焰在文字上方跳动。"], ["Fire Text", "Orange flames flicker above the letters."], ["impact"],
    `.$ { ${big} color: #fff7ed; animation: $-k 1.2s ease-in-out infinite alternate; }
@keyframes $-k { from { text-shadow: 0 0 4px #fff, 0 -6px 10px #fbbf24, 0 -12px 18px #f97316, 0 -20px 28px #dc2626; } to { text-shadow: 0 0 4px #fff, 2px -9px 12px #fbbf24, -2px -16px 20px #f97316, 1px -26px 32px #dc2626; } }`),
  word("reflection-text", ["水面倒影", "文字下方有淡淡倒影，随水波轻轻晃动。"], ["Water Reflection", "A faint reflection below the text sways like water."], ["elegant"],
    `.$ { ${big} color: var(--fg); display: flex; flex-direction: column; align-items: center; line-height: 1; }
.$ span + span { transform: scaleY(-1); opacity: .35; -webkit-mask-image: linear-gradient(transparent 30%, #000); mask-image: linear-gradient(transparent 30%, #000); animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: scaleY(-1) skewX(0); } 50% { transform: scaleY(-1.05) skewX(6deg); } }`,
    (t) => `<div class="$"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)}</span></div>`),
  word("jitter-text", ["手绘抖动", "文字微微逐帧抖动，像手绘动画。"], ["Hand-drawn Jitter", "Text jitters frame by frame like hand-drawn animation."], ["game"],
    `.$ { ${big} color: var(--fg); animation: $-k .5s steps(1) infinite; }
@keyframes $-k { 0% { transform: translate(0, 0) rotate(0); } 25% { transform: translate(1px, -1px) rotate(-1deg); } 50% { transform: translate(-1px, 1px) rotate(1deg); } 75% { transform: translate(1px, 1px) rotate(-.5deg); } }`),
  word("focus-zoom-text", ["聚焦缩放", "文字从放大模糊状态拉近到清晰。"], ["Focus Pull", "Text pulls from large and blurry into sharp focus."], ["impact"],
    `.$ { ${big} color: var(--fg); animation: $-k 3s cubic-bezier(.16,1,.3,1) infinite; }
@keyframes $-k { 0% { opacity: 0; transform: scale(1.8); filter: blur(12px); } 35%, 80% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; } }`),
  word("wavy-underline-text", ["波浪下划线", "文字下方有一条持续流动的波浪线。"], ["Wavy Underline", "A wavy line flows continuously under the text."], ["game"],
    `.$ { ${big} color: var(--fg); position: relative; padding-bottom: .15em; }
.$::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: .14em; background: radial-gradient(circle at 50% 100%, transparent 38%, var(--accent) 40%, var(--accent) 60%, transparent 62%) 0 0 / .3em 100% repeat-x, radial-gradient(circle at 50% 0, transparent 38%, var(--accent) 40%, var(--accent) 60%, transparent 62%) .15em 0 / .3em 100% repeat-x; animation: $-k 1s linear infinite; }
@keyframes $-k { to { background-position: .3em 0, .45em 0; } }`),
  word("circle-text", ["环形文字", "文字沿着圆环排列并持续旋转。"], ["Circular Text", "Text runs around a circle and keeps rotating."], ["showcase"],
    `.$ { width: 150px; height: 150px; animation: $-k 10s linear infinite; }
.$ text { font-weight: 700; font-size: 15px; letter-spacing: 3px; fill: var(--fg); }
.$ circle { fill: var(--accent); }
@keyframes $-k { to { transform: rotate(360deg); } }`,
    (t) => `<svg class="$" viewBox="0 0 150 150"><defs><path id="$-p" d="M75 75 m-55 0 a55 55 0 1 1 110 0 a55 55 0 1 1 -110 0"/></defs><text><textPath href="#$-p">${esc(`${t} • `.repeat(Math.max(3, Math.ceil(24 / Math.max(1, Array.from(t).length)))))}</textPath></text><circle cx="75" cy="75" r="6"/></svg>`, { tech: "SVG" }),
  word("stripe-fill-text", ["斜纹镂空", "斜条纹在文字内部不停移动。"], ["Striped Cutout", "Diagonal stripes keep scrolling inside the text."], ["showcase"],
    `.$ { ${big} background: repeating-linear-gradient(45deg, var(--accent) 0 8px, var(--fg) 8px 16px); background-size: 200% 200%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: $-k 3s linear infinite; }
@keyframes $-k { to { background-position: 45px 0; } }`),
  word("scanline-text", ["扫描线", "一道亮光扫描线从上到下扫过文字。"], ["Scanline", "A bright scanline sweeps down over the text."], ["tech"],
    `.$ { ${big} color: var(--fg); position: relative; }
.$::after { content: ""; position: absolute; left: -10%; right: -10%; height: 12%; background: linear-gradient(transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent); animation: $-k 2s linear infinite; }
@keyframes $-k { from { top: -15%; } to { top: 105%; } }`),
  word("echo-text", ["层叠回声", "几层半透明的文字向外扩散，像回声。"], ["Echo", "Translucent copies ripple outward like an echo."], ["impact"],
    `.$ { ${big} position: relative; color: var(--fg); }
.$ span + span { position: absolute; inset: 0; color: var(--accent); animation: $-k 2s ease-out infinite; }
.$ span:nth-child(3) { animation-delay: .4s; }
.$ span:nth-child(4) { animation-delay: .8s; }
@keyframes $-k { from { opacity: .7; transform: scale(1); } to { opacity: 0; transform: scale(1.6); } }`,
    (t) => `<div class="$"><span>${esc(t)}</span>${times(3, () => `<span aria-hidden="true">${esc(t)}</span>`)}</div>`),
  word("rubber-band-text", ["橡皮筋", "文字像橡皮筋一样被拉伸又弹回。"], ["Rubber Band", "The word stretches like a rubber band and snaps back."], ["game"],
    `.$ { ${big} color: var(--fg); animation: $-k 2s infinite; }
@keyframes $-k { 0%, 50%, 100% { transform: scale3d(1, 1, 1); } 15% { transform: scale3d(1.25, .75, 1); } 20% { transform: scale3d(.75, 1.25, 1); } 25% { transform: scale3d(1.15, .85, 1); } 32% { transform: scale3d(.95, 1.05, 1); } 37% { transform: scale3d(1.05, .95, 1); } }`),
  word("head-shake-text", ["摇头否定", "文字左右摇摆，像在摇头说不。"], ["Head Shake", "The word shakes side to side like saying no."], ["feedback"],
    `.$ { ${big} color: var(--fg); animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 50%, 100% { transform: none; } 6% { transform: translateX(-6%) rotateY(-9deg); } 18% { transform: translateX(5%) rotateY(7deg); } 31% { transform: translateX(-3%) rotateY(-5deg); } 43% { transform: translateX(2%) rotateY(3deg); } }`),
  word("flip-loop-text", ["整体翻转", "整个文字沿竖轴翻转一圈。"], ["Flip Loop", "The whole word flips around the vertical axis."], ["impact"],
    `.$ { ${big} color: var(--fg); animation: $-k 2.4s cubic-bezier(.65,0,.35,1) infinite; }
.$-w { perspective: 600px; }
@keyframes $-k { 0%, 30% { transform: rotateY(0); } 70%, 100% { transform: rotateY(360deg); } }`,
    (t) => `<div class="$-w"><div class="$">${esc(t)}</div></div>`),
  word("hinge-text", ["铰链掉落", "文字像一边松脱的招牌一样摆动后掉落。"], ["Hinge Drop", "The word swings like a loose sign and falls away."], ["impact"],
    `.$ { ${big} color: var(--fg); transform-origin: top left; animation: $-k 3.5s ease-in-out infinite; }
@keyframes $-k { 0%, 10% { transform: none; opacity: 1; } 25%, 45% { transform: rotate(80deg); } 35%, 55% { transform: rotate(60deg); } 75% { transform: translateY(150%) rotate(80deg); opacity: 0; } 76% { transform: none; opacity: 0; } 100% { opacity: 1; } }`),
  word("puff-text", ["放大消散", "文字放大并模糊消散，再重新出现。"], ["Puff Out", "The word swells, blurs away and comes back."], ["impact"],
    `.$ { ${big} color: var(--fg); animation: $-k 2.6s ease-in-out infinite; }
@keyframes $-k { 0%, 30% { transform: scale(1); filter: blur(0); opacity: 1; } 60% { transform: scale(2); filter: blur(6px); opacity: 0; } 61% { transform: scale(.6); } 90%, 100% { transform: scale(1); opacity: 1; filter: blur(0); } }`),
  word("roll-in-text", ["滚动进场", "文字从左侧旋转滚入。"], ["Roll In", "The word rolls in from the left."], ["showcase"],
    `.$ { ${big} color: var(--fg); animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); } 35%, 80% { opacity: 1; transform: none; } 100% { opacity: 0; } }`),
  word("light-speed-text", ["光速冲入", "文字带着倾斜从右侧高速冲入并急停。"], ["Light Speed", "The word speeds in from the right, skewed, and brakes hard."], ["impact"],
    `.$ { ${big} color: var(--fg); animation: $-k 3s ease-out infinite; }
@keyframes $-k { 0% { opacity: 0; transform: translateX(80%) skewX(-30deg); } 20% { opacity: 1; transform: skewX(20deg); } 28% { transform: skewX(-5deg); } 34%, 80% { transform: none; opacity: 1; } 100% { opacity: 0; transform: translateX(-30%); } }`),
  word("bracket-text", ["括号框选", "四角括号从远处收拢框住文字。"], ["Corner Brackets", "Corner brackets close in to frame the text."], ["tech"],
    `.$ { ${big} font-size: 11cqw; color: var(--fg); position: relative; padding: .2em .4em; }
.$::before, .$::after { content: ""; position: absolute; width: .4em; height: .4em; border: 3px solid var(--accent); animation: $-k 2.4s ease-in-out infinite; }
.$::before { top: 0; left: 0; border-right: 0; border-bottom: 0; --x: -.4em; }
.$::after { bottom: 0; right: 0; border-left: 0; border-top: 0; --x: .4em; }
@keyframes $-k { 0%, 100% { transform: translate(var(--x), var(--x)); opacity: 0; } 40%, 70% { transform: none; opacity: 1; } }`),
  word("sweep-fade-text", ["渐隐扫过", "一段渐变遮罩扫过，文字随之淡入淡出。"], ["Gradient Sweep", "A gradient mask sweeps across, fading the text in and out."], ["elegant"],
    `.$ { ${big} color: var(--fg); -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 30%, #000 70%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 30%, #000 70%, transparent 100%); -webkit-mask-size: 300% 100%; mask-size: 300% 100%; animation: $-k 3s linear infinite; }
@keyframes $-k { from { -webkit-mask-position: 100% 0; mask-position: 100% 0; } to { -webkit-mask-position: 0 0; mask-position: 0 0; } }`),
];
