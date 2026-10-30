import type { ContextKind, Locale, TriggerKind } from "../types";
import { esc, times, w, type SnippetDef } from "./helpers";

export const icon = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], t: TriggerKind, css: string, html: (l: Locale) => string, tech?: SnippetDef["tech"]): SnippetDef =>
  ({ id, zh, en, c: "icon", t, m, css, html: (_t, l) => html(l), tech });

export const glyph = (g: string, label: string) => `<div class="$" role="img" aria-label="${esc(label)}">${g}</div>`;
export const sized = "font-size: 56px; line-height: 1;";
export const svg = (paths: string, view = "0 0 48 48") => `<svg class="$" viewBox="${view}" aria-hidden="true">${paths}</svg>`;
export const stroke = "fill: none; stroke: var(--fg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;";

export const iconSnippets: SnippetDef[] = [
  icon("icon-heartbeat", ["跳动爱心", "爱心像心跳一样连续跳动两下。"], ["Beating Heart", "A heart beats twice like a heartbeat."], ["feedback"], "auto",
    `.$ { ${sized} color: #f43f5e; animation: $-k 1.3s infinite; }
@keyframes $-k { 0%, 50%, 100% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(1.1); } }`, (l) => glyph("♥", w(l, "爱心", "Heart"))),
  icon("icon-bell", ["铃铛摇晃", "通知铃铛左右摇晃，提示有新消息。"], ["Ringing Bell", "A notification bell swings to signal new messages."], ["feedback"], "auto",
    `.$ { ${sized} transform-origin: 50% 10%; animation: $-k 2s ease-in-out infinite; }
@keyframes $-k { 0%, 50%, 100% { transform: rotate(0); } 5%, 15%, 25% { transform: rotate(18deg); } 10%, 20%, 30% { transform: rotate(-18deg); } 35% { transform: rotate(6deg); } 40% { transform: rotate(-4deg); } }`, (l) => glyph("🔔", w(l, "通知", "Notifications"))),
  icon("icon-check-draw", ["对勾绘制", "圆圈先画出来，再画出中间的对勾。"], ["Drawn Check", "A circle draws itself, followed by the check mark inside."], ["feedback"], "auto",
    `.$ { width: 70px; height: 70px; }
.$ circle, .$ path { ${stroke} stroke: #22c55e; }
.$ circle { stroke-dasharray: 130; stroke-dashoffset: 130; animation: $-c 2.6s ease infinite; }
.$ path { stroke-dasharray: 40; stroke-dashoffset: 40; animation: $-p 2.6s ease infinite; }
@keyframes $-c { 0% { stroke-dashoffset: 130; } 30%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 130; opacity: 0; } }
@keyframes $-p { 0%, 30% { stroke-dashoffset: 40; } 50%, 90% { stroke-dashoffset: 0; } 100% { opacity: 0; } }`,
    () => svg(`<circle cx="24" cy="24" r="20"/><path d="M14 25l7 7 13-15"/>`), "SVG"),
  icon("icon-cross-draw", ["错误叉号", "红色圆圈画出后，叉号的两笔依次划出并抖动一下。"], ["Error Cross", "A red circle draws in, then both strokes of the X and a small shake."], ["feedback"], "auto",
    `.$ { width: 70px; height: 70px; animation: $-s 2.6s infinite; }
.$ circle, .$ path { ${stroke} stroke: #ef4444; }
.$ circle { stroke-dasharray: 130; stroke-dashoffset: 130; animation: $-c 2.6s ease infinite; }
.$ path { stroke-dasharray: 25; stroke-dashoffset: 25; animation: $-p 2.6s ease infinite; }
.$ path + path { animation-delay: .15s; }
@keyframes $-c { 0% { stroke-dashoffset: 130; } 30%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 130; } }
@keyframes $-p { 0%, 30% { stroke-dashoffset: 25; } 45%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 25; } }
@keyframes $-s { 0%, 55%, 70%, 100% { transform: none; } 60% { transform: translateX(-4px); } 65% { transform: translateX(4px); } }`,
    () => svg(`<circle cx="24" cy="24" r="20"/><path d="M17 17l14 14"/><path d="M31 17L17 31"/>`), "SVG"),
  icon("icon-arrow-down", ["向下箭头", "箭头上下弹跳，提示向下滚动。"], ["Scroll Down Arrow", "An arrow bounces up and down to hint at scrolling."], ["feedback"], "auto",
    `.$ { width: 28px; height: 46px; border: 3px solid var(--fg); border-radius: 16px; position: relative; }
.$::after { content: ""; position: absolute; left: 50%; top: 8px; width: 4px; height: 8px; margin-left: -2px; border-radius: 2px; background: var(--fg); animation: $-k 1.6s ease-in-out infinite; }
@keyframes $-k { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(16px); opacity: 0; } 100% { opacity: 0; } }`, (l) => glyph("", w(l, "向下滚动", "Scroll down"))),
  icon("icon-arrow-nudge", ["箭头轻推", "悬停时箭头向右推动两下。"], ["Arrow Nudge", "The arrow nudges right twice on hover."], ["interactive"], "hover",
    `.$ { ${sized} cursor: pointer; }
.$:hover { animation: $-k .8s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: none; } 50% { transform: translateX(10px); } }`, (l) => glyph("➜", w(l, "前往", "Go"))),
  icon("icon-gear", ["齿轮设置", "悬停时设置齿轮开始旋转。"], ["Settings Gear", "The settings gear starts turning on hover."], ["interactive"], "hover",
    `.$ { ${sized} cursor: pointer; transition: transform 1.2s; }
.$:hover { transform: rotate(360deg); }`, (l) => glyph("⚙", w(l, "设置", "Settings"))),
  icon("icon-cloud", ["漂浮云朵", "云朵慢慢上下漂浮，雨滴落下。"], ["Rain Cloud", "A cloud bobs gently while raindrops fall."], ["elegant"], "auto",
    `.$ { position: relative; width: 70px; height: 70px; animation: $-k 3s ease-in-out infinite; }
.$::before { content: ""; position: absolute; left: 8px; top: 24px; width: 54px; height: 22px; border-radius: 22px; background: #94a3b8; }
.$::after { content: ""; position: absolute; left: 18px; top: 8px; width: 28px; height: 28px; border-radius: 50%; background: #94a3b8; box-shadow: 16px 8px 0 -5px #94a3b8; }
.$ i { position: absolute; top: 50px; width: 3px; height: 10px; border-radius: 2px; background: #60a5fa; animation: $-r 1s linear infinite; }
${times(3, (i) => `.$ i:nth-of-type(${i + 1}) { left: ${14 + i * 12}px; animation-delay: ${i * 0.3}s; }`)}
@keyframes $-k { 50% { transform: translateY(-6px); } }
@keyframes $-r { from { transform: translateY(0); opacity: 1; } to { transform: translateY(26px); opacity: 0; } }`, (l) => glyph(times(3, () => "<i></i>"), w(l, "下雨", "Rain"))),
  icon("icon-sun", ["旋转太阳", "太阳的光芒缓慢旋转，中心轻轻发光。"], ["Spinning Sun", "The sun's rays rotate slowly around a softly glowing core."], ["elegant"], "auto",
    `.$ { position: relative; width: 60px; height: 60px; display: grid; place-items: center; animation: $-k 10s linear infinite; }
.$::before { content: ""; width: 26px; height: 26px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 16px #fbbf24; }
.$ i { position: absolute; width: 4px; height: 10px; border-radius: 2px; background: #f59e0b; }
${times(8, (i) => `.$ i:nth-child(${i + 1}) { transform: rotate(${i * 45}deg) translateY(-24px); }`)}
@keyframes $-k { to { transform: rotate(360deg); } }`, (l) => glyph(times(8, () => "<i></i>"), w(l, "晴天", "Sunny"))),
  icon("icon-play-pause", ["播放暂停", "点击后播放三角变形成暂停双竖线。"], ["Play / Pause", "The play triangle morphs into pause bars on click."], ["interactive"], "click",
    `.$ { width: 64px; height: 64px; display: grid; place-items: center; border-radius: 50%; background: var(--fg); cursor: pointer; }
.$ i { width: 24px; height: 26px; background: var(--page); clip-path: polygon(15% 0, 15% 100%, 100% 50%, 100% 50%, 15% 0, 15% 0, 15% 100%, 15% 100%); transition: clip-path .35s; }
.$:has(input:checked) i { clip-path: polygon(0 0, 0 100%, 35% 100%, 35% 0, 65% 0, 65% 100%, 100% 100%, 100% 0); }`,
    (l) => `<label class="$" aria-label="${w(l, "播放", "Play")}"><input type="checkbox" hidden><i></i></label>`),
  icon("icon-plus-x", ["加号旋转", "点击后加号旋转 45 度变成叉号。"], ["Plus to Close", "The plus spins 45° into a close icon on click."], ["interactive"], "click",
    `.$ { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 16px; background: var(--accent); color: var(--accent-fg); font-size: 34px; cursor: pointer; transition: transform .35s cubic-bezier(.34,1.56,.64,1), background .3s; }
.$:has(input:checked) { transform: rotate(135deg); background: #ef4444; }`,
    (l) => `<label class="$" aria-label="${w(l, "展开", "Open")}"><input type="checkbox" hidden>+</label>`),
  icon("icon-trash", ["垃圾桶开盖", "悬停时垃圾桶的盖子掀开。"], ["Trash Lid", "The trash can lid pops open on hover."], ["interactive"], "hover",
    `.$ { position: relative; width: 40px; height: 50px; cursor: pointer; }
.$::before { content: ""; position: absolute; left: -4px; right: -4px; top: 0; height: 5px; border-radius: 3px; background: var(--fg); transform-origin: left bottom; transition: transform .3s; }
.$::after { content: ""; position: absolute; left: 3px; right: 3px; top: 9px; bottom: 0; border-radius: 0 0 6px 6px; background: repeating-linear-gradient(90deg, var(--fg) 0 6px, transparent 6px 10px) 50% 50% / 60% 70% no-repeat, color-mix(in oklab, var(--fg) 25%, transparent); border: 3px solid var(--fg); box-sizing: border-box; }
.$:hover::before { transform: translateY(-4px) rotate(-30deg); }`, (l) => glyph("", w(l, "删除", "Delete"))),
  icon("icon-lock", ["点击解锁", "点击后锁环弹起，锁变成打开状态。"], ["Unlock", "On click the shackle pops up and the lock opens."], ["feedback"], "click",
    `.$ { position: relative; width: 46px; height: 60px; cursor: pointer; }
.$::before { content: ""; position: absolute; left: 9px; top: 0; width: 22px; height: 26px; border: 5px solid var(--fg); border-bottom: 0; border-radius: 14px 14px 0 0; transition: transform .35s cubic-bezier(.34,1.56,.64,1); transform-origin: right bottom; }
.$::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 32px; border-radius: 8px; background: var(--fg); transition: background .3s; }
.$:has(input:checked)::before { transform: translate(14px, -6px) rotate(20deg); }
.$:has(input:checked)::after { background: #22c55e; }`,
    (l) => `<label class="$" aria-label="${w(l, "解锁", "Unlock")}"><input type="checkbox" hidden></label>`),
  icon("icon-thumbs", ["点赞弹跳", "点击后大拇指放大旋转并变成强调色。"], ["Thumbs Up", "On click the thumb grows, tilts and turns accent."], ["feedback"], "click",
    `.$ { ${sized} cursor: pointer; filter: grayscale(1); transition: filter .2s; }
.$:has(input:checked) { filter: none; animation: $-k .5s cubic-bezier(.34,1.56,.64,1); }
@keyframes $-k { 0% { transform: scale(1); } 50% { transform: scale(1.35) rotate(-15deg); } 100% { transform: scale(1); } }`,
    (l) => `<label class="$" aria-label="${w(l, "点赞", "Like")}"><input type="checkbox" hidden>👍</label>`),
  icon("icon-badge", ["消息角标", "红色数字角标不停弹出提醒。"], ["Notification Badge", "A red count badge keeps popping to get attention."], ["feedback"], "auto",
    `.$ { position: relative; ${sized} }
.$ b { position: absolute; top: -4px; right: -8px; min-width: 22px; height: 22px; padding: 0 6px; box-sizing: border-box; display: grid; place-items: center; border-radius: 11px; background: #ef4444; color: #fff; font-size: 12px; animation: $-k 2s cubic-bezier(.34,1.56,.64,1) infinite; }
@keyframes $-k { 0%, 100% { transform: scale(1); } 10% { transform: scale(1.4); } 20% { transform: scale(1); } }`, (l) => glyph("✉<b>3</b>", w(l, "3 条新消息", "3 new messages"))),
  icon("icon-search-scan", ["放大镜搜索", "放大镜绕着小圈移动，像在搜索。"], ["Searching Magnifier", "A magnifier moves in small circles as if searching."], ["feedback"], "auto",
    `.$ { ${sized} animation: $-k 2s linear infinite; }
@keyframes $-k { 0% { transform: translate(0, -8px); } 25% { transform: translate(8px, 0); } 50% { transform: translate(0, 8px); } 75% { transform: translate(-8px, 0); } 100% { transform: translate(0, -8px); } }`, (l) => glyph("🔍", w(l, "搜索", "Search"))),
  icon("icon-download", ["下载入盘", "箭头向下落进托盘，托盘轻轻下沉。"], ["Download Drop", "An arrow drops into the tray, which dips slightly."], ["feedback"], "auto",
    `.$ { position: relative; width: 56px; height: 60px; }
.$::before { content: "↓"; position: absolute; left: 0; right: 0; top: 0; text-align: center; font-size: 34px; font-weight: 900; color: var(--accent); animation: $-k 1.6s ease-in infinite; }
.$::after { content: ""; position: absolute; left: 4px; right: 4px; bottom: 4px; height: 14px; border: 4px solid var(--fg); border-top: 0; border-radius: 0 0 8px 8px; animation: $-t 1.6s infinite; }
@keyframes $-k { 0% { transform: translateY(-10px); opacity: 0; } 30% { opacity: 1; } 70% { transform: translateY(14px); opacity: 1; } 80%, 100% { transform: translateY(14px); opacity: 0; } }
@keyframes $-t { 0%, 65%, 100% { transform: none; } 75% { transform: translateY(3px); } }`, (l) => glyph("", w(l, "下载", "Download"))),
  icon("icon-mail-send", ["发送邮件", "纸飞机飞出画面，再从另一侧飞回来。"], ["Paper Plane", "A paper plane flies off and loops back in from the other side."], ["game"], "auto",
    `.$ { ${sized} animation: $-k 3s ease-in-out infinite; }
@keyframes $-k { 0%, 20% { transform: none; opacity: 1; } 50% { transform: translate(120px, -60px) rotate(15deg) scale(.6); opacity: 0; } 51% { transform: translate(-120px, 40px) scale(.6); opacity: 0; } 80%, 100% { transform: none; opacity: 1; } }`, (l) => glyph("✈", w(l, "发送", "Send"))),
  icon("icon-hourglass-flip", ["沙漏翻转", "沙漏定时翻转一次，表示等待中。"], ["Hourglass Flip", "An hourglass flips over at intervals while waiting."], ["feedback"], "auto",
    `.$ { ${sized} animation: $-k 2s cubic-bezier(.65,0,.35,1) infinite; }
@keyframes $-k { 0%, 70% { transform: rotate(0); } 100% { transform: rotate(180deg); } }`, (l) => glyph("⌛", w(l, "等待中", "Waiting"))),
  icon("icon-star-spin", ["星星闪耀", "星星旋转并发出光晕，像获得奖励。"], ["Sparkling Star", "A star spins and glows like a reward."], ["game"], "auto",
    `.$ { ${sized} color: #fbbf24; animation: $-k 2.4s ease-in-out infinite; }
@keyframes $-k { 0%, 100% { transform: rotate(0) scale(1); text-shadow: 0 0 0 transparent; } 50% { transform: rotate(180deg) scale(1.2); text-shadow: 0 0 18px #fbbf24; } }`, (l) => glyph("★", w(l, "星星", "Star"))),
];
