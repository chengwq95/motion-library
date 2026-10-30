import type { ContextKind, Locale, TriggerKind } from "../types";
import { esc, times, w, type SnippetDef } from "./helpers";

const nav = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], t: TriggerKind, css: string, html: SnippetDef["html"]): SnippetDef =>
  ({ id, zh, en, c: "nav", t, m, css, html });

// Preview links have no href so clicking them never leaves the page.
const link = (t: string) => `<span class="$" role="link" tabindex="0">${esc(t)}</span>`;
const linkBase = `.$ { position: relative; font-size: 7cqw; font-weight: 700; color: var(--fg); cursor: pointer; padding: 4px 2px; }`;
const items = (t: string, l: Locale) => [t, w(l, "作品", "Work"), w(l, "关于", "About")];

const underline = (id: string, zh: [string, string], en: [string, string], css: string): SnippetDef =>
  nav(id, zh, en, ["elegant"], "hover", `${linkBase}\n${css}`, link);

// Hamburger icons toggled with a hidden checkbox.
const burgerBase = `.$ { position: relative; display: grid; place-items: center; width: 64px; height: 64px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); cursor: pointer; }
.$ i { position: absolute; left: 18px; right: 18px; height: 3px; border-radius: 3px; background: var(--fg); transition: transform .35s cubic-bezier(.65,0,.35,1), opacity .25s, width .35s, top .35s; }
.$ i:nth-of-type(1) { top: 22px; } .$ i:nth-of-type(2) { top: 30px; } .$ i:nth-of-type(3) { top: 38px; }`;
const burgerHtml = (_t: string, l: Locale) => `<label class="$" aria-label="${w(l, "菜单", "Menu")}"><input type="checkbox" hidden><i></i><i></i><i></i></label>`;
const burger = (id: string, zh: [string, string], en: [string, string], css: string): SnippetDef =>
  nav(id, zh, en, ["interactive"], "click", `${burgerBase}\n${css}`, burgerHtml);
const on = (sel: string) => `.$:has(input:checked) ${sel}`;

export const navSnippets: SnippetDef[] = [
  underline("link-grow-left", ["下划线左起", "悬停时下划线从左向右长出。"], ["Underline From Left", "An underline grows left to right on hover."],
    `.$::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 3px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
.$:hover::after, .$:focus-visible::after { transform: scaleX(1); }`),
  underline("link-grow-center", ["下划线居中展开", "悬停时下划线从中间向两边展开。"], ["Underline From Center", "An underline expands from the middle on hover."],
    `.$::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 3px; background: var(--accent); transform: scaleX(0); transition: transform .3s; }
.$:hover::after, .$:focus-visible::after { transform: scaleX(1); }`),
  underline("link-slide-through", ["下划线穿过", "悬停时下划线从左侧进入，移开时从右侧离开。"], ["Underline Pass-through", "The underline enters from the left and exits right."],
    `.$::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 3px; background: var(--accent); transform: scaleX(0); transform-origin: right; transition: transform .35s; }
.$:hover::after, .$:focus-visible::after { transform: scaleX(1); transform-origin: left; }`),
  underline("link-highlight", ["底色上浮", "悬停时一块底色从下方升起覆盖文字。"], ["Rising Highlight", "A highlight block rises behind the text on hover."],
    `.$ { z-index: 0; transition: color .3s; }
.$::before { content: ""; position: absolute; z-index: -1; left: -4px; right: -4px; bottom: 0; height: 4px; background: var(--accent); transition: height .3s; }
.$:hover, .$:focus-visible { color: var(--accent-fg); }
.$:hover::before, .$:focus-visible::before { height: 100%; }`),
  underline("link-double", ["上下双线", "悬停时上下两条线从相反方向长出。"], ["Double Lines", "Lines grow above and below from opposite sides."],
    `.$::before, .$::after { content: ""; position: absolute; left: 0; width: 100%; height: 2px; background: var(--accent); transform: scaleX(0); transition: transform .3s; }
.$::before { top: 0; transform-origin: right; } .$::after { bottom: 0; transform-origin: left; }
.$:hover::before, .$:hover::after, .$:focus-visible::before, .$:focus-visible::after { transform: scaleX(1); }`),
  underline("link-dotted", ["流动虚线", "悬停时下方的虚线开始流动。"], ["Marching Dashes", "A dashed underline starts marching on hover."],
    `.$::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: repeating-linear-gradient(90deg, var(--accent) 0 6px, transparent 6px 12px); }
.$:hover::after, .$:focus-visible::after { animation: $-k .6s linear infinite; }
@keyframes $-k { to { background-position: 12px 0; } }`),
  underline("link-bracket", ["括号出现", "悬停时文字两侧滑出方括号。"], ["Brackets", "Square brackets slide out beside the text on hover."],
    `.$::before, .$::after { position: absolute; color: var(--accent); opacity: 0; transition: .3s; }
.$::before { content: "["; left: -.2em; } .$::after { content: "]"; right: -.2em; }
.$:hover::before, .$:focus-visible::before { opacity: 1; left: -.6em; }
.$:hover::after, .$:focus-visible::after { opacity: 1; right: -.6em; }`),
  underline("link-strike", ["中线划过", "悬停时一条线从文字中间穿过。"], ["Strike Hover", "A line runs through the middle of the text on hover."],
    `.$::after { content: ""; position: absolute; left: -4px; right: -4px; top: 52%; height: 3px; background: var(--accent); transform: scaleX(0); transition: transform .3s; }
.$:hover::after, .$:focus-visible::after { transform: scaleX(1); }`),

  burger("burger-x", ["汉堡变叉", "点击后三条线变成一个叉号。"], ["Burger to X", "Three lines morph into an X on click."],
    `${on("i:nth-of-type(1)")} { top: 30px; transform: rotate(45deg); }
${on("i:nth-of-type(2)")} { opacity: 0; }
${on("i:nth-of-type(3)")} { top: 30px; transform: rotate(-45deg); }`),
  burger("burger-arrow", ["汉堡变箭头", "点击后三条线变成一个向左的箭头。"], ["Burger to Arrow", "The lines morph into a left arrow on click."],
    `.$ i { transform-origin: left center; }
${on("i:nth-of-type(1)")} { transform: translate(0, 7px) rotate(-40deg) scaleX(.6); }
${on("i:nth-of-type(3)")} { transform: translate(0, -7px) rotate(40deg) scaleX(.6); }`),
  burger("burger-spin", ["旋转变叉", "点击后图标整体旋转并变成叉号。"], ["Spin to X", "The icon spins around as it becomes an X."],
    `.$ { transition: transform .5s; }
.$:has(input:checked) { transform: rotate(180deg); }
${on("i:nth-of-type(1)")} { top: 30px; transform: rotate(45deg); }
${on("i:nth-of-type(2)")} { transform: scaleX(0); }
${on("i:nth-of-type(3)")} { top: 30px; transform: rotate(-45deg); }`),
  burger("burger-minus", ["合并成线", "点击后三条线收拢成一条。"], ["Collapse to Line", "The three lines collapse into one on click."],
    `${on("i")} { top: 30px; }`),
  burger("burger-staggered", ["长短错落", "三条线长短不一，悬停对齐，点击变叉。"], ["Staggered Lines", "Uneven lines align on hover and become an X on click."],
    `.$ i:nth-of-type(2) { right: 26px; } .$ i:nth-of-type(3) { right: 32px; }
.$:hover i { right: 18px; }
${on("i:nth-of-type(1)")} { top: 30px; transform: rotate(45deg); }
${on("i:nth-of-type(2)")} { opacity: 0; }
${on("i:nth-of-type(3)")} { top: 30px; right: 18px; transform: rotate(-45deg); }`),
  burger("burger-plus", ["变成加号", "点击后线条变成一个加号。"], ["Burger to Plus", "The lines turn into a plus sign on click."],
    `${on("i:nth-of-type(1)")} { top: 30px; }
${on("i:nth-of-type(2)")} { transform: rotate(90deg); }
${on("i:nth-of-type(3)")} { top: 30px; opacity: 0; }`),

  nav("tabs-slide", ["标签滑块", "点击标签时，下方的指示条滑到对应位置。"], ["Sliding Tab Indicator", "The indicator slides under the tab you click."], ["interactive"], "click",
    `.$ { position: relative; display: flex; border-bottom: 1px solid var(--line); }
.$ label { width: 84px; padding: 12px 0; text-align: center; font-weight: 600; color: var(--muted); cursor: pointer; transition: color .3s; }
.$ label:has(input:checked) { color: var(--fg); }
.$ b { position: absolute; bottom: -1px; left: 0; width: 84px; height: 3px; border-radius: 3px; background: var(--accent); transition: transform .35s cubic-bezier(.65,0,.35,1); }
.$:has(label:nth-of-type(2) input:checked) b { transform: translateX(84px); }
.$:has(label:nth-of-type(3) input:checked) b { transform: translateX(168px); }`,
    (t, l) => `<div class="$">${items(t, l).map((x, i) => `<label><input type="radio" name="$" hidden${i ? "" : " checked"}>${esc(x)}</label>`).join("")}<b></b></div>`),
  nav("segmented-pill", ["分段胶囊", "点击选项时，背后的胶囊滑块平滑移动。"], ["Segmented Pill", "A pill slides behind the option you pick."], ["interactive"], "click",
    `.$ { position: relative; display: flex; padding: 4px; border-radius: 999px; background: color-mix(in oklab, var(--fg) 8%, transparent); }
.$ label { position: relative; z-index: 1; width: 76px; padding: 10px 0; text-align: center; font-weight: 600; font-size: 14px; color: var(--muted); cursor: pointer; transition: color .3s; }
.$ label:has(input:checked) { color: var(--fg); }
.$ b { position: absolute; top: 4px; bottom: 4px; left: 4px; width: 76px; border-radius: 999px; background: var(--card); box-shadow: 0 2px 8px rgb(0 0 0 / .15); transition: transform .35s cubic-bezier(.34,1.3,.64,1); }
.$:has(label:nth-of-type(2) input:checked) b { transform: translateX(76px); }
.$:has(label:nth-of-type(3) input:checked) b { transform: translateX(152px); }`,
    (t, l) => `<div class="$">${items(t, l).map((x, i) => `<label><input type="radio" name="$" hidden${i ? "" : " checked"}>${esc(x)}</label>`).join("")}<b></b></div>`),
  nav("hover-pill-nav", ["悬停胶囊导航", "鼠标移到哪个链接，背景胶囊就滑到哪里。"], ["Hover Pill Nav", "A background pill slides to whichever link you hover."], ["interactive"], "hover",
    `.$ { position: relative; display: flex; }
.$ span { position: relative; z-index: 1; width: 80px; padding: 10px 0; text-align: center; font-weight: 600; color: var(--fg); cursor: pointer; }
.$ b { position: absolute; top: 0; bottom: 0; left: 0; width: 80px; border-radius: 999px; background: color-mix(in oklab, var(--accent) 22%, transparent); opacity: 0; transition: transform .3s cubic-bezier(.65,0,.35,1), opacity .2s; }
.$:hover b { opacity: 1; }
.$:has(span:nth-child(2):hover) b { transform: translateX(80px); }
.$:has(span:nth-child(3):hover) b { transform: translateX(160px); }`,
    (t, l) => `<div class="$">${items(t, l).map((x) => `<span>${esc(x)}</span>`).join("")}<b></b></div>`),
  nav("dropdown-stagger", ["下拉菜单", "悬停时菜单展开，选项依次滑入。"], ["Staggered Dropdown", "The menu opens on hover and items slide in one by one."], ["showcase"], "hover",
    `.$ { position: relative; align-self: start; margin-top: 24px; }
.$ > span { display: inline-block; padding: 10px 18px; border-radius: 10px; background: var(--fg); color: var(--page); font-weight: 600; cursor: pointer; }
.$ ul { position: absolute; top: calc(100% + 6px); left: 0; min-width: 140px; margin: 0; padding: 6px; list-style: none; border-radius: 12px; background: var(--card); border: 1px solid var(--line); box-shadow: 0 10px 30px rgb(0 0 0 / .15); visibility: hidden; opacity: 0; transform: translateY(-6px); transition: .25s; }
.$ li { padding: 8px 10px; border-radius: 8px; color: var(--fg); opacity: 0; transform: translateX(-8px); transition: .25s; }
.$ li:hover { background: color-mix(in oklab, var(--fg) 8%, transparent); }
.$:hover ul, .$:focus-within ul { visibility: visible; opacity: 1; transform: none; }
.$:hover li, .$:focus-within li { opacity: 1; transform: none; }
${times(3, (i) => `.$ li:nth-child(${i + 1}) { transition-delay: ${0.05 + i * 0.06}s; }`)}`,
    (t, l) => `<div class="$"><span tabindex="0">${esc(t)} ▾</span><ul>${[w(l, "个人资料", "Profile"), w(l, "设置", "Settings"), w(l, "退出登录", "Sign out")].map((x) => `<li>${x}</li>`).join("")}</ul></div>`),
  nav("radial-menu", ["环形菜单", "点击中间按钮，选项沿圆弧弹出。"], ["Radial Menu", "Click the center button and options pop out along an arc."], ["game"], "click",
    `.$ { position: relative; width: 56px; height: 56px; }
.$ label { position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; border-radius: 50%; background: var(--accent); color: var(--accent-fg); font-size: 28px; cursor: pointer; transition: transform .35s; }
.$:has(input:checked) label { transform: rotate(45deg); }
.$ i { position: absolute; inset: 8px; display: grid; place-items: center; border-radius: 50%; background: var(--card); border: 1px solid var(--line); font-style: normal; transition: transform .4s cubic-bezier(.34,1.56,.64,1); }
${times(4, (i) => `.$:has(input:checked) i:nth-of-type(${i + 1}) { transform: rotate(${-90 + i * 60}deg) translateX(70px) rotate(${90 - i * 60}deg); transition-delay: ${i * 0.04}s; }`)}`,
    () => `<div class="$"><label><input type="checkbox" hidden>+</label>${["★", "♥", "✎", "⚑"].map((x) => `<i>${x}</i>`).join("")}</div>`),
  nav("overlay-menu", ["全屏菜单", "点击后一个圆形遮罩扩散出全屏菜单。"], ["Overlay Menu", "A circular mask expands into a full-screen menu on click."], ["showcase"], "click",
    `.$ { position: absolute; inset: 0; display: grid; place-items: center; }
.$ label { position: absolute; top: 14px; left: 14px; z-index: 2; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; background: var(--fg); color: var(--page); cursor: pointer; font-size: 18px; }
.$ ul { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; display: grid; place-content: center; gap: 8px; text-align: center; background: var(--accent); color: var(--accent-fg); font-size: 6cqw; font-weight: 800; clip-path: circle(0 at 34px 34px); transition: clip-path .6s cubic-bezier(.65,0,.35,1); }
.$:has(input:checked) ul { clip-path: circle(150% at 34px 34px); }
.$ li { opacity: 0; transform: translateY(10px); transition: .3s; }
.$:has(input:checked) li { opacity: 1; transform: none; }
${times(3, (i) => `.$:has(input:checked) li:nth-child(${i + 1}) { transition-delay: ${0.25 + i * 0.07}s; }`)}`,
    (t, l) => `<div class="$"><label><input type="checkbox" hidden>☰</label><ul>${items(t, l).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`),
  nav("sidebar-slide", ["侧边栏滑入", "点击按钮，侧边栏从左侧滑入，内容区变暗。"], ["Sidebar Slide", "A sidebar slides in from the left and dims the content."], ["showcase"], "click",
    `.$ { position: absolute; inset: 0; overflow: hidden; }
.$ label { position: absolute; top: 14px; left: 14px; z-index: 3; padding: 8px 12px; border-radius: 8px; background: var(--fg); color: var(--page); font-weight: 600; cursor: pointer; }
.$ aside { position: absolute; z-index: 2; top: 0; bottom: 0; left: 0; width: 55%; padding: 64px 18px; display: grid; align-content: start; gap: 12px; background: var(--card); border-right: 1px solid var(--line); font-weight: 600; transform: translateX(-100%); transition: transform .4s cubic-bezier(.65,0,.35,1); }
.$::after { content: ""; position: absolute; inset: 0; background: rgb(0 0 0 / .4); opacity: 0; transition: opacity .4s; pointer-events: none; }
.$:has(input:checked) aside { transform: none; }
.$:has(input:checked)::after { opacity: 1; }`,
    (t, l) => `<div class="$"><label><input type="checkbox" hidden>☰ ${w(l, "菜单", "Menu")}</label><aside>${items(t, l).map((x) => `<span>${esc(x)}</span>`).join("")}</aside></div>`),
  nav("accordion", ["手风琴展开", "点击标题，内容区域平滑展开或收起。"], ["Accordion", "Click the header to smoothly expand or collapse the content."], ["elegant"], "click",
    `.$ { width: 80%; border: 1px solid var(--line); border-radius: 14px; background: var(--card); overflow: hidden; }
.$ label { display: flex; justify-content: space-between; padding: 14px 16px; font-weight: 700; cursor: pointer; }
.$ label::after { content: "▾"; transition: transform .3s; }
.$:has(input:checked) label::after { transform: rotate(180deg); }
.$ div { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
.$:has(input:checked) div { grid-template-rows: 1fr; }
.$ p { overflow: hidden; margin: 0; padding: 0 16px; color: var(--muted); font-size: 14px; line-height: 1.6; }
.$:has(input:checked) p { padding-bottom: 14px; }`,
    (t, l) => `<div class="$"><label><input type="checkbox" hidden>${esc(t)}</label><div><p>${w(l, "用 grid-template-rows 从 0fr 过渡到 1fr，高度不固定也能平滑展开。", "Transitioning grid-template-rows from 0fr to 1fr animates content of any height.")}</p></div></div>`),
  nav("tab-bar-bubble", ["底部标签栏", "点击图标时，气泡跳到选中的标签下。"], ["Bubble Tab Bar", "A bubble hops under the tab you select."], ["game"], "click",
    `.$ { position: relative; display: flex; padding: 8px; border-radius: 20px; background: var(--card); border: 1px solid var(--line); }
.$ label { position: relative; z-index: 1; width: 56px; height: 44px; display: grid; place-items: center; font-size: 20px; cursor: pointer; filter: grayscale(1); transition: filter .3s, transform .3s; }
.$ label:has(input:checked) { filter: none; transform: translateY(-4px); }
.$ b { position: absolute; top: 8px; left: 8px; width: 56px; height: 44px; border-radius: 14px; background: color-mix(in oklab, var(--accent) 25%, transparent); transition: transform .45s cubic-bezier(.34,1.56,.64,1); }
${times(3, (i) => `.$:has(label:nth-of-type(${i + 2}) input:checked) b { transform: translateX(${(i + 1) * 56}px); }`)}`,
    () => `<div class="$">${["🏠", "🔍", "💬", "👤"].map((x, i) => `<label><input type="radio" name="$" hidden${i ? "" : " checked"}>${x}</label>`).join("")}<b></b></div>`),
  nav("pagination-dots", ["分页圆点", "当前页的圆点拉长成胶囊，并自动轮播。"], ["Pagination Dots", "The active dot stretches into a pill and cycles automatically."], ["elegant"], "auto",
    `.$ { display: flex; gap: 8px; }
.$ i { width: 10px; height: 10px; border-radius: 10px; background: var(--line); animation: $-k 4s infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i}s; }`)}
@keyframes $-k { 0%, 25% { width: 32px; background: var(--accent); } 30%, 100% { width: 10px; background: var(--line); } }`,
    () => `<div class="$">${times(4, () => "<i></i>")}</div>`),
  nav("stepper", ["步骤条", "进度沿着步骤依次点亮，每一步出现勾号。"], ["Stepper", "Progress lights up each step in turn, ticking them off."], ["feedback"], "auto",
    `.$ { position: relative; display: flex; justify-content: space-between; width: 80%; }
.$::before, .$::after { content: ""; position: absolute; top: 15px; left: 15px; right: 15px; height: 3px; background: var(--line); }
.$::after { background: var(--accent); transform-origin: left; animation: $-bar 4s infinite; }
.$ i { position: relative; z-index: 1; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: var(--card); border: 3px solid var(--line); font-style: normal; font-size: 14px; font-weight: 700; color: var(--muted); animation: $-dot 4s infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.8}s; }`)}
@keyframes $-bar { 0% { transform: scaleX(0); } 60%, 90% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes $-dot { 0%, 5% { border-color: var(--line); background: var(--card); color: var(--muted); } 10%, 72% { border-color: var(--accent); background: var(--accent); color: var(--accent-fg); } 80%, 100% { border-color: var(--line); background: var(--card); color: var(--muted); } }`,
    () => `<div class="$">${times(4, (i) => `<i>${i + 1}</i>`)}</div>`),
];
