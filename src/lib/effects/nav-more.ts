import { esc, times, w, type SnippetDef } from "./helpers";
import { items, linkBase, nav, underline } from "./nav";

const radios = (labels: string[]) => labels.map((x, i) => `<label><input type="radio" name="$" hidden${i ? "" : " checked"}>${esc(x)}</label>`).join("");

export const navMoreSnippets: SnippetDef[] = [
  underline("link-arrow", ["链接箭头", "悬停时文字右侧滑出一个箭头。"], ["Link Arrow", "An arrow slides out after the text on hover."],
    `.$::after { content: "→"; display: inline-block; margin-left: .2em; color: var(--accent); opacity: 0; transform: translateX(-.4em); transition: .3s; }
.$:hover::after, .$:focus-visible::after { opacity: 1; transform: none; }`),
  underline("link-color-sweep", ["颜色扫过", "悬停时强调色从左到右扫过文字。"], ["Color Sweep", "On hover the accent color sweeps across the text from left to right."],
    `.$ { background: linear-gradient(90deg, var(--accent) 50%, var(--fg) 50%) 100% 0 / 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; transition: background-position .5s cubic-bezier(.65,0,.35,1); }
.$:hover, .$:focus-visible { background-position: 0 0; }`),
  nav("link-circle", ["手绘圈出", "悬停时一个手绘椭圆把文字圈起来。"], ["Hand-drawn Circle", "On hover a hand-drawn ellipse circles the word."], ["elegant"], "hover",
    `${linkBase}
.$ svg { position: absolute; left: -18%; top: -30%; width: 136%; height: 160%; overflow: visible; pointer-events: none; }
.$ path { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 100; stroke-dashoffset: 100; transition: stroke-dashoffset .6s ease; }
.$:hover path, .$:focus-visible path { stroke-dashoffset: 0; }`,
    (t) => `<span class="$" role="link" tabindex="0">${esc(t)}<svg viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M78 8C55 0 14 4 6 22c-8 18 30 26 58 22 26-4 36-18 26-30-6-7-22-10-38-8"/></svg></span>`, ),
  nav("link-scribble", ["涂鸦下划线", "悬停时文字下面画出一条弯弯曲曲的线。"], ["Scribble Underline", "On hover a squiggly line is drawn beneath the text."], ["game"], "hover",
    `${linkBase}
.$ svg { position: absolute; left: 0; bottom: -10px; width: 100%; height: 12px; overflow: visible; }
.$ path { fill: none; stroke: var(--accent-2); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 100; stroke-dashoffset: 100; transition: stroke-dashoffset .5s ease; }
.$:hover path, .$:focus-visible path { stroke-dashoffset: 0; }`,
    (t) => `<span class="$" role="link" tabindex="0">${esc(t)}<svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M2 8 Q12 2 22 8 T42 8 T62 8 T82 8 T98 8"/></svg></span>`),
  nav("nav-magic-line", ["跟随下划线", "鼠标移到哪个链接，下划线就滑到哪里并改变宽度。"], ["Magic Line", "The underline slides to whichever link you hover."], ["interactive"], "hover",
    `.$ { position: relative; display: flex; gap: 28px; }
.$ span { padding: 10px 0; font-weight: 600; color: var(--muted); cursor: pointer; transition: color .3s; }
.$ span:hover { color: var(--fg); }
.$ b { position: absolute; bottom: 0; left: 0; width: var(--w0); height: 3px; border-radius: 3px; background: var(--accent); transition: transform .35s cubic-bezier(.65,0,.35,1), width .35s; }
.$:has(span:nth-child(2):hover) b { transform: translateX(var(--x1)); width: var(--w1); }
.$:has(span:nth-child(3):hover) b { transform: translateX(var(--x2)); width: var(--w2); }`,
    (t, l) => { const labels = items(t, l); const widths = labels.map((x) => Array.from(x).length * (l === "zh" ? 16 : 9)); const x1 = widths[0] + 28; const x2 = x1 + widths[1] + 28;
      return `<div class="$" style="--w0:${widths[0]}px;--w1:${widths[1]}px;--w2:${widths[2]}px;--x1:${x1}px;--x2:${x2}px">${labels.map((x) => `<span>${esc(x)}</span>`).join("")}<b></b></div>`; }),
  nav("nav-dot", ["圆点指示", "悬停的链接下方出现一个小圆点，选中项常亮。"], ["Dot Indicator", "A small dot appears under the hovered link; the current one stays lit."], ["elegant"], "hover",
    `.$ { display: flex; gap: 26px; }
.$ span { position: relative; padding: 8px 0; font-weight: 600; color: var(--muted); cursor: pointer; transition: color .25s; }
.$ span::after { content: ""; position: absolute; left: 50%; bottom: -4px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: var(--accent); transform: scale(0); transition: transform .3s cubic-bezier(.34,1.8,.64,1); }
.$ span:first-child, .$ span:hover { color: var(--fg); }
.$ span:first-child::after, .$ span:hover::after { transform: scale(1); }`,
    (t, l) => `<div class="$">${items(t, l).map((x) => `<span>${esc(x)}</span>`).join("")}</div>`),
  nav("grid-menu", ["九宫格菜单", "点击后九个点旋转聚拢成一个叉号。"], ["Grid Menu", "On click nine dots spin and collapse into a close icon."], ["interactive"], "click",
    `.$ { position: relative; width: 64px; height: 64px; display: grid; place-items: center; border-radius: 16px; border: 1px solid var(--line); background: var(--card); cursor: pointer; }
.$ div { display: grid; grid-template-columns: repeat(3, 6px); gap: 5px; transition: transform .45s cubic-bezier(.65,0,.35,1); }
.$ i { width: 6px; height: 6px; border-radius: 50%; background: var(--fg); transition: transform .45s, opacity .3s; }
.$:has(input:checked) div { transform: rotate(45deg); }
.$:has(input:checked) i:nth-child(odd):not(:nth-child(5)) { opacity: 0; transform: scale(0); }
.$:has(input:checked) i:nth-child(2) { transform: translateY(5px); } .$:has(input:checked) i:nth-child(8) { transform: translateY(-5px); }
.$:has(input:checked) i:nth-child(4) { transform: translateX(5px); } .$:has(input:checked) i:nth-child(6) { transform: translateX(-5px); }`,
    (_t, l) => `<label class="$" aria-label="${w(l, "菜单", "Menu")}"><input type="checkbox" hidden><div>${times(9, () => "<i></i>")}</div></label>`),
  nav("tabs-vertical", ["竖向标签", "点击左侧标签，竖向指示条滑到对应位置。"], ["Vertical Tabs", "Click a tab on the left and the vertical indicator slides to it."], ["interactive"], "click",
    `.$ { position: relative; display: grid; padding-left: 14px; border-left: 2px solid var(--line); }
.$ label { padding: 9px 0; font-weight: 600; color: var(--muted); cursor: pointer; transition: color .3s, transform .3s; }
.$ label:has(input:checked) { color: var(--fg); transform: translateX(4px); }
.$ b { position: absolute; left: -2px; top: 0; width: 2px; height: 38px; background: var(--accent); transition: transform .35s cubic-bezier(.65,0,.35,1); }
.$:has(label:nth-of-type(2) input:checked) b { transform: translateY(38px); }
.$:has(label:nth-of-type(3) input:checked) b { transform: translateY(76px); }`,
    (t, l) => `<div class="$">${radios(items(t, l))}<b></b></div>`),
  nav("shrink-header", ["收缩导航栏", "模拟页面滚动后，导航栏变矮并加上毛玻璃背景。"], ["Shrinking Header", "Simulates scrolling: the header gets shorter and gains a frosted backdrop."], ["elegant"], "scroll",
    `.$ { position: absolute; inset: 0; overflow: hidden; }
.$ header { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 18px; padding: 0 18px; font-size: 13px; font-weight: 600; animation: $-k 4s ease-in-out infinite; }
.$ header b { margin-right: auto; font-size: 16px; }
.$ i { position: absolute; left: 18px; right: 18px; height: 10px; border-radius: 6px; background: var(--line); animation: $-c 4s ease-in-out infinite; }
${times(5, (i) => `.$ i:nth-of-type(${i + 1}) { top: ${80 + i * 26}px; width: ${[80, 60, 72, 50, 66][i]}%; }`)}
@keyframes $-k { 0%, 20%, 100% { height: 64px; background: transparent; box-shadow: none; } 45%, 80% { height: 44px; background: color-mix(in oklab, var(--card) 75%, transparent); backdrop-filter: blur(8px); box-shadow: 0 1px 0 var(--line); } }
@keyframes $-c { 0%, 20%, 100% { transform: none; } 45%, 80% { transform: translateY(-50px); } }`,
    (t, l) => `<div class="$">${times(5, () => "<i></i>")}<header><b>${esc(t)}</b>${items(t, l).slice(1).map((x) => `<span>${esc(x)}</span>`).join("")}</header></div>`),
  nav("mega-menu", ["宽幅菜单", "悬停时下方展开一个宽面板，格子依次淡入。"], ["Mega Menu", "On hover a wide panel drops down and its tiles fade in one by one."], ["showcase"], "hover",
    `.$ { position: relative; align-self: start; margin-top: 22px; }
.$ > span { display: inline-block; padding: 8px 14px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.$:hover > span, .$:focus-within > span { background: color-mix(in oklab, var(--fg) 8%, transparent); }
.$ div { position: absolute; top: calc(100% + 8px); left: 50%; width: 250px; padding: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; border-radius: 14px; border: 1px solid var(--line); background: var(--card); box-shadow: 0 16px 40px rgb(0 0 0 / .18); opacity: 0; visibility: hidden; transform: translate(-50%, -8px); transition: .25s; }
.$ i { height: 34px; border-radius: 8px; background: color-mix(in oklab, var(--accent) 18%, transparent); opacity: 0; transform: translateY(6px); transition: .3s; }
.$:hover div, .$:focus-within div { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
.$:hover i, .$:focus-within i { opacity: 1; transform: none; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { transition-delay: ${0.05 + i * 0.05}s; }`)}`,
    (t) => `<div class="$"><span tabindex="0">${esc(t)} ▾</span><div>${times(4, () => "<i></i>")}</div></div>`),
  nav("nav-search", ["导航搜索", "点击导航里的放大镜，搜索框展开并把其他链接挤开。"], ["Nav Search", "Click the magnifier in the nav: the search box expands and pushes the links aside."], ["interactive"], "focus",
    `.$ { display: flex; align-items: center; gap: 18px; font-weight: 600; }
.$ input { width: 34px; height: 34px; box-sizing: border-box; padding: 0 0 0 32px; border: 1px solid var(--line); border-radius: 17px; background: var(--card) no-repeat; color: var(--fg); font: inherit; font-size: 13px; outline: none; cursor: pointer; transition: width .4s cubic-bezier(.65,0,.35,1), border-color .3s; }
.$ label { position: relative; display: flex; align-items: center; }
.$ label::before { content: "⌕"; position: absolute; left: 10px; font-size: 16px; pointer-events: none; }
.$ input:focus { width: 170px; border-color: var(--accent); cursor: text; }`,
    (t, l) => `<div class="$">${items(t, l).slice(0, 2).map((x) => `<span>${esc(x)}</span>`).join("")}<label><input aria-label="${w(l, "搜索", "Search")}" placeholder="${w(l, "搜索…", "Search…")}"></label></div>`),
  nav("pagination-slide", ["页码切换", "点击页码时，圆形高亮滑到对应数字下。"], ["Sliding Pagination", "Click a page number and the round highlight slides beneath it."], ["interactive"], "click",
    `.$ { position: relative; display: flex; gap: 6px; }
.$ label { position: relative; z-index: 1; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; font-weight: 700; color: var(--muted); cursor: pointer; transition: color .3s; }
.$ label:has(input:checked) { color: var(--accent-fg); }
.$ b { position: absolute; left: 0; top: 0; width: 36px; height: 36px; border-radius: 50%; background: var(--accent); transition: transform .4s cubic-bezier(.34,1.4,.64,1); }
${times(4, (i) => `.$:has(label:nth-of-type(${i + 2}) input:checked) b { transform: translateX(${(i + 1) * 42}px); }`)}`,
    () => `<div class="$">${radios(["1", "2", "3", "4", "5"])}<b></b></div>`),
  nav("reading-progress", ["阅读进度条", "页面顶部的进度条随阅读进度填满。"], ["Reading Progress", "A bar across the top fills as you read."], ["feedback"], "scroll",
    `.$ { position: absolute; inset: 0; overflow: hidden; }
.$::before { content: ""; position: absolute; top: 0; left: 0; height: 4px; width: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transform-origin: left; animation: $-bar 5s linear infinite; z-index: 1; }
.$ div { position: absolute; left: 22px; right: 22px; top: 24px; display: grid; gap: 10px; animation: $-scroll 5s linear infinite; }
.$ b { font-size: 18px; }
.$ i { height: 8px; border-radius: 5px; background: var(--line); }
.$ i:nth-of-type(3n) { width: 70%; }
@keyframes $-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes $-scroll { from { transform: translateY(0); } to { transform: translateY(-140px); } }`,
    (t) => `<div class="$"><div><b>${esc(t)}</b>${times(12, () => "<i></i>")}</div></div>`),
  nav("bottom-sheet", ["底部抽屉", "点击按钮，面板从底部弹起，背景变暗。"], ["Bottom Sheet", "Tap the button and a panel springs up from the bottom as the background dims."], ["showcase"], "click",
    `.$ { position: absolute; inset: 0; overflow: hidden; display: grid; place-items: center; }
.$ label { padding: 10px 18px; border-radius: 999px; background: var(--fg); color: var(--page); font-weight: 600; cursor: pointer; }
.$::after { content: ""; position: absolute; inset: 0; background: rgb(0 0 0 / .4); opacity: 0; transition: opacity .35s; pointer-events: none; }
.$ aside { position: absolute; z-index: 2; left: 10px; right: 10px; bottom: 0; height: 58%; padding: 10px 16px; box-sizing: border-box; border-radius: 18px 18px 0 0; background: var(--card); transform: translateY(100%); transition: transform .45s cubic-bezier(.34,1.2,.64,1); }
.$ aside::before { content: ""; display: block; width: 36px; height: 4px; margin: 0 auto 14px; border-radius: 4px; background: var(--line); }
.$ aside i { display: block; height: 10px; margin-bottom: 10px; border-radius: 5px; background: var(--line); }
.$:has(input:checked) aside { transform: none; }
.$:has(input:checked)::after { opacity: 1; }`,
    (t) => `<div class="$"><label><input type="checkbox" hidden>${esc(t)}</label><aside><b>${esc(t)}</b>${times(3, () => "<i></i>")}</aside></div>`),
  nav("command-palette", ["命令面板", "点击后命令面板从中间放大出现，选项依次滑入。"], ["Command Palette", "On click the command palette zooms in from the center and items slide in."], ["tech"], "click",
    `.$ { position: absolute; inset: 0; display: grid; place-items: center; }
.$ label { display: inline-flex; gap: 8px; align-items: center; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font-size: 13px; cursor: pointer; }
.$ label kbd { padding: 1px 6px; border-radius: 5px; border: 1px solid var(--line); font-family: ui-monospace, monospace; font-size: 11px; }
.$ div { position: absolute; width: 72%; padding: 8px; border-radius: 14px; border: 1px solid var(--line); background: var(--card); box-shadow: 0 20px 50px rgb(0 0 0 / .3); opacity: 0; transform: scale(.92); pointer-events: none; transition: .25s cubic-bezier(.34,1.3,.64,1); }
.$ div p { margin: 0; padding: 8px 10px; border-radius: 8px; font-size: 13px; opacity: 0; transform: translateY(6px); transition: .25s; }
.$ div p:first-child { background: color-mix(in oklab, var(--accent) 18%, transparent); }
.$:has(input:checked) div { opacity: 1; transform: none; pointer-events: auto; }
.$:has(input:checked) div p { opacity: 1; transform: none; }
${times(3, (i) => `.$:has(input:checked) div p:nth-child(${i + 1}) { transition-delay: ${0.08 + i * 0.05}s; }`)}`,
    (t, l) => `<div class="$"><label><input type="checkbox" hidden>⌕ ${w(l, "搜索命令", "Search commands")} <kbd>⌘K</kbd></label><div>${[t, w(l, "打开设置", "Open settings"), w(l, "切换主题", "Toggle theme")].map((x) => `<p>${esc(x)}</p>`).join("")}</div></div>`),
];

