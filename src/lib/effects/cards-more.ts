import { card, cardHint, face, photo } from "./cards";
import { esc, times, w, type SnippetDef } from "./helpers";

// Default body: title + hint, same as every other card preview.
const body = (t: string, hint: string) => `<b>${esc(t)}</b><span>${hint}</span>`;

export const cardMoreSnippets: SnippetDef[] = [
  card("card-hover-gradient", ["悬停渐变卡", "悬停时卡片背景淡入一层彩色渐变，文字变白。"], ["Hover Gradient", "On hover a colorful gradient fades into the card and the text turns white."], ["showcase"], "hover",
    `${face}
.$ { overflow: hidden; isolation: isolate; }
.$::before { content: ""; position: absolute; z-index: -1; inset: 0; background: ${photo}; opacity: 0; transition: opacity .4s; }
.$:hover { color: #fff; } .$:hover span { color: rgb(255 255 255 / .8); }
.$:hover::before { opacity: 1; }`),
  card("card-sweep-light", ["光斑掠过", "悬停时一团柔光从卡片左上角移到右下角。"], ["Light Pass", "On hover a soft light drifts from the top-left corner to the bottom-right."], ["elegant"], "hover",
    `${face}
.$ { overflow: hidden; }
.$::after { content: ""; position: absolute; width: 180px; height: 180px; left: -90px; top: -90px; border-radius: 50%; background: radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%); transition: transform .9s cubic-bezier(.22,1,.36,1); }
.$:hover::after { transform: translate(260px, 160px); }`),
  card("card-stack-peek", ["叠卡露出", "悬停时后面两张卡从底下错开露出来。"], ["Stack Peek", "On hover two cards behind slide out from underneath."], ["showcase"], "hover",
    `.$-w { position: relative; width: var(--card-w); height: var(--card-h); }
.$-w i { position: absolute; inset: 0; border-radius: 18px; border: 1px solid var(--line); background: var(--card); transition: transform .45s cubic-bezier(.34,1.4,.64,1); }
.$-w i:first-child { background: color-mix(in oklab, var(--accent) 35%, var(--card)); }
.$-w i:nth-child(2) { background: color-mix(in oklab, var(--accent-2) 30%, var(--card)); }
${face}
.$ { position: absolute; inset: 0; width: auto; height: auto; }
.$-w:hover i:first-child { transform: translate(18px, -14px) rotate(6deg); }
.$-w:hover i:nth-child(2) { transform: translate(-16px, -10px) rotate(-5deg); }`,
    (t, l) => `<div class="$-w"><i></i><i></i><div class="$">${body(t, cardHint("hover", l))}</div></div>`),
  card("card-perspective-hover", ["悬停透视", "悬停时卡片向一侧转出立体角度，阴影随之加深。"], ["Perspective Turn", "On hover the card turns to an angle in 3D and its shadow deepens."], ["tech"], "hover",
    `.$-w { width: 100%; height: 100%; display: grid; place-items: center; perspective: 700px; }
${face}
.$ { transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s; }
.$:hover { transform: rotateY(-18deg) rotateX(8deg); box-shadow: 18px 18px 40px rgb(0 0 0 / .25); }`,
    (t, l) => `<div class="$-w"><div class="$">${body(t, cardHint("hover", l))}</div></div>`),
  card("card-image-slide", ["图文切换", "悬停时一张图片从右侧滑入，盖住文字面。"], ["Image Slide-over", "On hover an image slides in from the right over the text side."], ["showcase"], "hover",
    `${face}
.$ { overflow: hidden; }
.$ i { position: absolute; inset: 0; background: ${photo}; transform: translateX(101%); transition: transform .5s cubic-bezier(.65,0,.35,1); }
.$:hover i { transform: none; }`,
    (t, l) => `<div class="$"><i></i>${body(t, cardHint("hover", l))}</div>`),
  card("card-skeleton-swap", ["加载完成", "卡片先显示骨架占位，加载完后内容淡入，循环演示。"], ["Skeleton to Content", "The card shows skeleton placeholders, then fades in real content, on a loop."], ["feedback"], "auto",
    `${face}
.$ i { position: absolute; left: 18px; right: 18px; border-radius: 6px; background: var(--line); animation: $-sk 4s infinite; }
.$ i:nth-of-type(1) { bottom: 40px; height: 16px; right: 40%; }
.$ i:nth-of-type(2) { bottom: 18px; height: 10px; }
.$ b, .$ span { animation: $-ct 4s infinite; }
@keyframes $-sk { 0%, 45% { opacity: 1; } 55%, 95% { opacity: 0; } 100% { opacity: 1; } }
@keyframes $-ct { 0%, 50% { opacity: 0; transform: translateY(6px); } 60%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; } }`,
    (t, l) => `<div class="$"><i></i><i></i>${body(t, cardHint("auto", l))}</div>`),
  card("card-ribbon", ["新品丝带", "卡片右上角的「新」丝带轻轻摆动。"], ["New Ribbon", "A “New” ribbon in the top-right corner gently sways."], ["feedback"], "auto",
    `${face}
.$ { overflow: hidden; }
.$ em { position: absolute; top: 14px; right: -34px; width: 120px; padding: 4px 0; text-align: center; font-style: normal; font-size: 11px; font-weight: 800; background: var(--accent-2); color: #fff; transform: rotate(45deg); transform-origin: 50% 50%; animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: rotate(45deg); } 50% { transform: rotate(41deg) translateY(2px); } }`,
    (t, l) => `<div class="$"><em>${w(l, "新品", "NEW")}</em>${body(t, cardHint("auto", l))}</div>`),
  card("card-gradient-edge", ["悬停彩边", "悬停时卡片边框变成一圈渐变色。"], ["Gradient Edge", "On hover the card border turns into a gradient ring."], ["elegant"], "hover",
    `${face}
.$ { border: 2px solid transparent; background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(var(--line), var(--line)) border-box; }
.$:hover { background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, var(--accent), var(--accent-2), var(--accent-3)) border-box; }`),
  card("card-select", ["点击选中", "点击卡片后边框变成强调色，右上角弹出对勾。"], ["Selectable Card", "Clicking turns the border accent and pops a check into the corner."], ["interactive"], "click",
    `${face}
.$ { cursor: pointer; }
.$ em { position: absolute; top: 12px; right: 12px; width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: var(--accent); color: var(--accent-fg); font-style: normal; font-size: 13px; transform: scale(0); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
.$:has(input:checked) { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); }
.$:has(input:checked) em { transform: scale(1); }`,
    (t, l) => `<label class="$"><input type="checkbox" hidden><em>✓</em>${body(t, cardHint("click", l))}</label>`),
  card("card-like-count", ["点赞计数卡", "点击爱心，计数向上翻一格，爱心变红。"], ["Like Counter", "Click the heart: the count rolls up by one and the heart turns red."], ["feedback"], "click",
    `${face}
.$ label { position: absolute; top: 14px; right: 14px; display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); cursor: pointer; font-size: 13px; }
.$ label i { font-style: normal; color: var(--muted); transition: color .2s, transform .3s; }
.$ label div { height: 1.2em; overflow: hidden; line-height: 1.2; }
.$ label p { margin: 0; transition: transform .3s cubic-bezier(.34,1.4,.64,1); }
.$:has(input:checked) label i { color: #f43f5e; transform: scale(1.25); }
.$:has(input:checked) label p { transform: translateY(-1.2em); }`,
    (t, l) => `<div class="$"><label><input type="checkbox" hidden><i>♥</i><div><p>128</p><p>129</p></div></label>${body(t, cardHint("click", l))}</div>`),
  card("card-read-more", ["展开全文", "点击「更多」，卡片向下展开显示完整内容。"], ["Read More", "Click “More” and the card grows to show the full text."], ["interactive"], "click",
    `${face}
.$ { height: auto; justify-content: flex-start; }
.$ div { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s; }
.$ div p { overflow: hidden; margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }
.$ label { margin-top: 6px; font-size: 12px; font-weight: 700; color: var(--accent); cursor: pointer; }
.$:has(input:checked) div { grid-template-rows: 1fr; }
.$:has(input:checked) label { opacity: .6; }`,
    (t, l) => `<div class="$"><b>${esc(t)}</b><div><p>${w(l, "用 grid-template-rows 从 0fr 过渡到 1fr，内容多高都能顺滑展开，不用写死高度。", "Animating grid-template-rows from 0fr to 1fr expands content of any height smoothly.")}</p></div><label><input type="checkbox" hidden>${w(l, "更多 ▾", "More ▾")}</label></div>`),
  card("card-flip-x", ["上下翻转卡", "悬停时卡片沿水平轴向上翻到背面。"], ["Vertical Flip", "On hover the card flips up around the horizontal axis to its back."], ["showcase"], "hover",
    `.$ { width: var(--card-w); height: var(--card-h); perspective: 800px; }
.$ div { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .7s cubic-bezier(.65,0,.35,1); }
.$:hover div { transform: rotateX(180deg); }
.$ p { position: absolute; inset: 0; margin: 0; padding: 18px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; border-radius: 18px; backface-visibility: hidden; }
.$ b { font-size: 18px; } .$ span { font-size: 12px; color: var(--muted); }
.$ p:first-child { background: var(--card); border: 1px solid var(--line); }
.$ p + p { background: ${photo}; color: #fff; transform: rotateX(180deg); }
.$ p + p span { color: rgb(255 255 255 / .8); }`,
    (t, l) => `<div class="$"><div><p>${body(t, cardHint("hover", l))}</p><p>${body(t, w(l, "这是背面", "This is the back"))}</p></div></div>`),
  card("card-living-gradient", ["流动渐变卡", "卡片背景是不停流动的彩色渐变。"], ["Living Gradient", "The card background is a colorful gradient that never stops flowing."], ["showcase"], "auto",
    `${face}
.$ { border: 0; color: #fff; background: linear-gradient(-45deg, #6366f1, #ec4899, #f59e0b, #06b6d4); background-size: 300% 300%; animation: $-k 6s ease infinite; }
.$ span { color: rgb(255 255 255 / .8); }
@keyframes $-k { 0%, 100% { background-position: 0 50%; } 50% { background-position: 100% 50%; } }`),
  card("card-float", ["漂浮卡片", "卡片缓缓上下漂浮，阴影随高度变化。"], ["Floating Card", "The card bobs gently up and down while its shadow follows."], ["elegant"], "auto",
    `${face}
.$ { animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: translateY(0); box-shadow: 0 6px 12px rgb(0 0 0 / .12); } 50% { transform: translateY(-12px); box-shadow: 0 22px 30px rgb(0 0 0 / .18); } }`),
  card("card-pop-in", ["弹出卡片", "卡片从中心放大弹出，略微回弹后停住。"], ["Pop-in Card", "The card pops out from the center with a slight overshoot."], ["showcase"], "enter",
    `${face}
.$ { animation: $-k 3s cubic-bezier(.34,1.56,.64,1) infinite; }
@keyframes $-k { 0% { transform: scale(.4); opacity: 0; } 20%, 85% { transform: scale(1); opacity: 1; } 100% { transform: scale(.9); opacity: 0; } }`),
  card("card-slide-in", ["侧滑进场", "卡片从左侧带着轻微旋转滑入。"], ["Slide In", "The card slides in from the left with a slight rotation."], ["showcase"], "enter",
    `${face}
.$ { animation: $-k 3s cubic-bezier(.22,1,.36,1) infinite; }
@keyframes $-k { 0% { transform: translateX(-80%) rotate(-8deg); opacity: 0; } 25%, 85% { transform: none; opacity: 1; } 100% { transform: translateX(30%); opacity: 0; } }`),
  card("card-actions", ["滑出操作", "悬停时右侧滑出编辑、分享、删除按钮。"], ["Hover Actions", "On hover edit, share and delete buttons slide out on the right."], ["interactive"], "hover",
    `${face}
.$ { overflow: hidden; }
.$ div { position: absolute; top: 12px; right: 12px; display: grid; gap: 6px; }
.$ div i { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 10px; background: color-mix(in oklab, var(--fg) 8%, transparent); font-style: normal; font-size: 13px; transform: translateX(50px); transition: transform .35s cubic-bezier(.34,1.4,.64,1); }
${times(3, (i) => `.$:hover div i:nth-child(${i + 1}) { transform: none; transition-delay: ${i * 0.06}s; }`)}`,
    (t, l) => `<div class="$"><div><i>✎</i><i>⤴</i><i>🗑</i></div>${body(t, cardHint("hover", l))}</div>`),
  card("card-ticket", ["票券卡片", "带缺口和虚线的票券，悬停时右侧票根稍稍撕开。"], ["Ticket", "A notched ticket with a perforation; on hover the stub tears away a little."], ["game"], "hover",
    `.$ { position: relative; display: flex; width: var(--card-w); height: var(--card-h); filter: drop-shadow(0 8px 14px rgb(0 0 0 / .15)); }
.$ div { padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; background: var(--card); }
.$ div:first-child { flex: 1; border-radius: 18px 0 0 18px; -webkit-mask: radial-gradient(circle 10px at 100% 50%, transparent 98%, #000); mask: radial-gradient(circle 10px at 100% 50%, transparent 98%, #000); }
.$ div + div { width: 22%; padding: 0; align-items: center; justify-content: center; border-radius: 0 18px 18px 0; border-left: 2px dashed var(--line); background: var(--accent); color: var(--accent-fg); font-weight: 800; transform-origin: left bottom; transition: transform .4s cubic-bezier(.34,1.4,.64,1); -webkit-mask: radial-gradient(circle 10px at 0 50%, transparent 98%, #000); mask: radial-gradient(circle 10px at 0 50%, transparent 98%, #000); }
.$ b { font-size: 18px; } .$ span { font-size: 12px; color: var(--muted); }
.$:hover div + div { transform: rotate(8deg) translateX(6px); }`,
    (t, l) => `<div class="$"><div>${body(t, cardHint("hover", l))}</div><div>★</div></div>`),
  card("card-music", ["音乐卡片", "唱片在旋转，旁边的均衡器跟着节奏跳动。"], ["Now Playing", "A record spins while an equalizer bounces along to the beat."], ["showcase"], "auto",
    `${face}
.$ em { position: absolute; top: 16px; left: 18px; width: 54px; height: 54px; border-radius: 50%; background: radial-gradient(circle, var(--card) 14%, #111 15%, #111 30%, #333 31%, #111 33%, #111 60%, #333 61%, #111 63%); animation: $-spin 3s linear infinite; }
.$ div { position: absolute; top: 24px; right: 18px; display: flex; align-items: flex-end; gap: 3px; height: 36px; }
.$ div i { width: 5px; height: 100%; border-radius: 2px; background: var(--accent); transform-origin: bottom; animation: $-eq .9s ease-in-out infinite; }
${times(4, (i) => `.$ div i:nth-child(${i + 1}) { animation-delay: -${i * 0.2}s; animation-duration: ${[0.9, 0.7, 1.1, 0.8][i]}s; }`)}
@keyframes $-spin { to { transform: rotate(360deg); } }
@keyframes $-eq { 0%, 100% { transform: scaleY(.25); } 50% { transform: scaleY(1); } }`,
    (t, l) => `<div class="$"><em></em><div>${times(4, () => "<i></i>")}</div>${body(t, w(l, "正在播放", "Now playing"))}</div>`),
  card("card-weather", ["天气卡片", "太阳缓缓转动，云朵从前面飘过。"], ["Weather Card", "The sun slowly turns as a cloud drifts past in front."], ["elegant"], "auto",
    `${face}
.$ { overflow: hidden; background: linear-gradient(160deg, color-mix(in oklab, #38bdf8 30%, var(--card)), var(--card) 70%); }
.$ em { position: absolute; top: 14px; right: 22px; width: 40px; height: 40px; border-radius: 50%; background: #fbbf24; box-shadow: 0 0 0 6px rgb(251 191 36 / .25), 0 0 0 12px rgb(251 191 36 / .12); animation: $-sun 4s ease-in-out infinite; }
.$ i { position: absolute; top: 34px; width: 54px; height: 18px; border-radius: 18px; background: #fff; box-shadow: 12px -8px 0 -2px #fff; opacity: .95; animation: $-cloud 6s linear infinite; }
@keyframes $-sun { 50% { box-shadow: 0 0 0 9px rgb(251 191 36 / .25), 0 0 0 18px rgb(251 191 36 / .1); } }
@keyframes $-cloud { from { left: -70px; } to { left: 110%; } }`,
    (_t, l) => `<div class="$"><em></em><i></i><b>26°</b><span>${w(l, "晴，微风", "Sunny, light breeze")}</span></div>`),
  card("card-task-progress", ["任务进度卡", "卡片底部的进度条不断填满，百分比随之增加。"], ["Task Progress", "A progress bar fills along the bottom as the percentage climbs."], ["feedback"], "auto",
    `@property --$-p { syntax: "<integer>"; initial-value: 0; inherits: false; }
${face}
.$ { counter-reset: p var(--$-p); animation: $-k 4s ease-in-out infinite; }
.$ em { font-style: normal; font-size: 12px; color: var(--muted); }
.$ em::after { content: counter(p) "%"; float: right; color: var(--fg); font-weight: 700; }
.$ i { height: 6px; border-radius: 6px; background: linear-gradient(90deg, var(--accent) calc(var(--$-p) * 1%), var(--line) 0); }
@keyframes $-k { 0% { --$-p: 0; } 75%, 100% { --$-p: 100; } }`,
    (t, l) => `<div class="$"><b>${esc(t)}</b><em>${w(l, "进度", "Progress")}</em><i></i></div>`),
  card("card-chat", ["聊天卡片", "聊天气泡一条接一条地弹出来。"], ["Chat Thread", "Chat bubbles pop up one after another."], ["interactive"], "auto",
    `${face}
.$ { justify-content: center; gap: 6px; padding: 14px; }
.$ p { margin: 0; max-width: 75%; padding: 6px 10px; border-radius: 12px; font-size: 12px; opacity: 0; animation: $-k 4.5s infinite; }
.$ p:nth-child(odd) { align-self: flex-start; background: color-mix(in oklab, var(--fg) 8%, transparent); border-bottom-left-radius: 4px; }
.$ p:nth-child(even) { align-self: flex-end; background: var(--accent); color: var(--accent-fg); border-bottom-right-radius: 4px; }
${times(3, (i) => `.$ p:nth-child(${i + 1}) { animation-delay: ${i * 0.7}s; }`)}
@keyframes $-k { 0% { opacity: 0; transform: translateY(8px) scale(.9); } 8%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }`,
    (t, l) => `<div class="$"><p>${w(l, "这个动效怎么做？", "How is this made?")}</p><p>${esc(t)}?</p><p>${w(l, "复制提示词就行 ✨", "Just copy the prompt ✨")}</p></div>`),
  card("card-avatars", ["头像组", "叠在一起的头像在悬停时散开，显示更多人。"], ["Avatar Stack", "Overlapping avatars fan out on hover to show more people."], ["interactive"], "hover",
    `${face}
.$ div { position: absolute; top: 18px; left: 18px; display: flex; }
.$ div i { width: 34px; height: 34px; margin-right: -12px; border-radius: 50%; border: 3px solid var(--card); transition: margin .35s cubic-bezier(.34,1.4,.64,1); }
${times(4, (i) => `.$ div i:nth-child(${i + 1}) { background: ${["#6366f1", "#ec4899", "#f59e0b", "#10b981"][i]}; }`)}
.$:hover div i { margin-right: 4px; }`,
    (t, l) => `<div class="$"><div>${times(4, () => "<i></i>")}</div>${body(t, cardHint("hover", l))}</div>`),
  card("card-quote", ["引言卡片", "引号先画出来，再淡入引用的文字。"], ["Quote Card", "The quote mark appears first, then the quoted text fades in."], ["elegant"], "auto",
    `${face}
.$ em { position: absolute; top: 4px; left: 16px; font-style: normal; font-family: Georgia, serif; font-size: 64px; color: var(--accent); animation: $-q 4s infinite; }
.$ b, .$ span { animation: $-t 4s infinite; }
@keyframes $-q { 0% { opacity: 0; transform: scale(.5) rotate(-20deg); } 15%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes $-t { 0%, 20% { opacity: 0; transform: translateY(6px); } 35%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }`,
    (t, l) => `<div class="$"><em>“</em>${body(t, w(l, "少即是多", "Less is more"))}</div>`),
  card("card-layer-parallax", ["悬停视差", "悬停时卡片里的背景层和前景层朝相反方向移动。"], ["Layer Parallax", "On hover the background and foreground layers drift in opposite directions."], ["tech"], "hover",
    `${face}
.$ { overflow: hidden; color: #fff; border: 0; }
.$ i { position: absolute; inset: -12%; background: ${photo}; transition: transform .6s cubic-bezier(.22,1,.36,1); }
.$ em { position: absolute; top: 18px; right: 22px; width: 34px; height: 34px; border-radius: 50%; background: rgb(255 255 255 / .85); transition: transform .6s cubic-bezier(.22,1,.36,1); }
.$ b, .$ span { position: relative; transition: transform .6s cubic-bezier(.22,1,.36,1); }
.$ span { color: rgb(255 255 255 / .8); }
.$:hover i { transform: translate(6%, 4%); }
.$:hover em { transform: translate(-14px, 8px); }
.$:hover b, .$:hover span { transform: translateX(10px); }`,
    (t, l) => `<div class="$"><i></i><em></em>${body(t, cardHint("hover", l))}</div>`),
];
