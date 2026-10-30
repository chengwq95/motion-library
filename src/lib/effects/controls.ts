import type { ContextKind, TriggerKind } from "../types";
import { esc, times, w, type SnippetDef } from "./helpers";

const ctl = (id: string, zh: [string, string], en: [string, string], m: ContextKind[], t: TriggerKind, css: string, html: SnippetDef["html"]): SnippetDef =>
  ({ id, zh, en, c: "control", t, m, css, html });

const on = (sel = "") => `.$:has(input:checked)${sel ? ` ${sel}` : ""}`;
const switchHtml = (_t: string, l: string) => `<label class="$" aria-label="${l === "zh" ? "开关" : "Toggle"}"><input type="checkbox" hidden><i></i></label>`;
const switchBase = `.$ { position: relative; width: 72px; height: 40px; border-radius: 40px; background: var(--line); cursor: pointer; transition: background .3s; }
.$ i { position: absolute; top: 4px; left: 4px; width: 32px; height: 32px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgb(0 0 0 / .25); transition: transform .35s cubic-bezier(.34,1.4,.64,1), width .35s; }`;

const inputBase = `.$ { position: relative; width: 78%; }
.$ input { width: 100%; box-sizing: border-box; padding: 18px 14px 8px; border: 2px solid var(--line); border-radius: 12px; background: var(--card); color: var(--fg); font: inherit; font-size: 15px; outline: none; transition: border-color .3s, box-shadow .3s; }`;

const SAMPLES: Record<string, { zh: string; en: string }> = {
  "checkbox-draw": { zh: "记住我", en: "Remember me" },
  "checkbox-bounce": { zh: "同意条款", en: "I agree" },
  "radio-pop": { zh: "选项一", en: "Option one" },
  "search-expand": { zh: "搜索", en: "Search" },
  "error-shake": { zh: "hello", en: "hello" },
  "range-glow": { zh: "音量", en: "Volume" },
  "chip-select": { zh: "全部", en: "All" },
  "password-reveal": { zh: "secret", en: "secret" },
  "toggle-list-row": { zh: "消息通知", en: "Notifications" },
  "upload-drop": { zh: "拖入文件上传", en: "Drop files to upload" },
};

const defs: SnippetDef[] = [
  ctl("switch-ios", ["iOS 开关", "点击后滑块弹到另一侧，底色变成强调色。"], ["iOS Switch", "The knob springs across and the track turns accent on click."], ["interactive"], "click",
    `${switchBase}\n${on()} { background: var(--accent); }\n${on("i")} { transform: translateX(32px); }`, switchHtml),
  ctl("switch-squish", ["挤压开关", "按住时滑块被拉长，松开后弹到另一侧。"], ["Squishy Switch", "The knob stretches while pressed, then springs across."], ["game"], "click",
    `${switchBase}\n.$:active i { width: 42px; }\n${on()} { background: #22c55e; }\n${on("i")} { transform: translateX(32px); }\n.$:has(input:checked):active i { transform: translateX(22px); }`, switchHtml),
  ctl("switch-day-night", ["昼夜开关", "白天是太阳和蓝天，点击后变成月亮和夜空。"], ["Day / Night Switch", "Sun and blue sky turn into moon and night sky on click."], ["game"], "click",
    `${switchBase}
.$ { width: 84px; height: 44px; background: linear-gradient(#7dd3fc, #38bdf8); overflow: hidden; }
.$ i { width: 36px; height: 36px; background: #fde047; box-shadow: 0 0 12px #facc15; }
.$::after { content: ""; position: absolute; right: 14px; top: 10px; width: 3px; height: 3px; border-radius: 50%; background: #fff; box-shadow: -10px 8px 0 #fff, -4px 18px 0 #fff; opacity: 0; transition: opacity .4s; }
${on()} { background: linear-gradient(#1e293b, #0f172a); }
${on("i")} { transform: translateX(40px); background: #e2e8f0; box-shadow: inset -8px -4px 0 #94a3b8; }
.$:has(input:checked)::after { opacity: 1; right: 52px; }`, switchHtml),
  ctl("switch-neon", ["霓虹开关", "打开时滑块和轨道亮起霓虹光。"], ["Neon Switch", "The knob and track glow neon when switched on."], ["tech"], "click",
    `${switchBase}
.$ { background: #111827; border: 2px solid #374151; }
.$ i { background: #4b5563; box-shadow: none; top: 2px; left: 2px; }
${on()} { border-color: #22d3ee; box-shadow: 0 0 12px #22d3ee; }
${on("i")} { transform: translateX(32px); background: #22d3ee; box-shadow: 0 0 10px #22d3ee, 0 0 20px #22d3ee; }`, switchHtml),
  ctl("switch-icons", ["图标开关", "滑块上的叉号在打开后旋转变成对勾。"], ["Icon Switch", "The cross on the knob spins into a check when switched on."], ["feedback"], "click",
    `${switchBase}
.$ i::before { content: "✕"; position: absolute; inset: 0; display: grid; place-items: center; font-style: normal; font-size: 14px; color: #ef4444; transition: transform .35s; }
${on()} { background: #22c55e; }
${on("i")} { transform: translateX(32px) rotate(360deg); }
.$:has(input:checked) i::before { content: "✓"; color: #22c55e; }`, switchHtml),
  ctl("checkbox-draw", ["勾选描绘", "点击后对勾像用笔画出来一样出现。"], ["Drawn Checkmark", "The check mark draws itself in when you tick the box."], ["feedback"], "click",
    `.$ { display: flex; align-items: center; gap: 12px; font-weight: 600; cursor: pointer; }
.$ svg { width: 32px; height: 32px; border-radius: 8px; border: 2px solid var(--line); transition: background .3s, border-color .3s; }
.$ path { fill: none; stroke: var(--accent-fg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset .35s .1s; }
${on("svg")} { background: var(--accent); border-color: var(--accent); }
${on("path")} { stroke-dashoffset: 0; }`,
    (t) => `<label class="$"><input type="checkbox" hidden><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 17l5 5 11-12"/></svg>${esc(t)}</label>`, ),
  ctl("checkbox-bounce", ["弹跳复选框", "勾选时方框缩小再弹大，对勾跳出来。"], ["Bouncy Checkbox", "The box shrinks and springs back as the check pops in."], ["game"], "click",
    `.$ { display: flex; align-items: center; gap: 12px; font-weight: 600; cursor: pointer; }
.$ i { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 8px; border: 2px solid var(--line); font-style: normal; color: transparent; transition: .2s; }
${on("i")} { background: #22c55e; border-color: #22c55e; color: #fff; animation: $-k .45s cubic-bezier(.34,1.56,.64,1); }
@keyframes $-k { 0% { transform: scale(1); } 40% { transform: scale(.7); } 100% { transform: scale(1); } }`,
    (t) => `<label class="$"><input type="checkbox" hidden><i aria-hidden="true">✓</i>${esc(t)}</label>`),
  ctl("radio-pop", ["单选弹出", "选中的圆点从中心弹出。"], ["Radio Pop", "The selected dot pops out from the center."], ["interactive"], "click",
    `.$ { display: grid; gap: 12px; }
.$ label { display: flex; align-items: center; gap: 10px; font-weight: 600; cursor: pointer; }
.$ i { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--line); display: grid; place-items: center; transition: border-color .2s; }
.$ i::after { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); transform: scale(0); transition: transform .3s cubic-bezier(.34,1.8,.64,1); }
.$ label:has(input:checked) i { border-color: var(--accent); }
.$ label:has(input:checked) i::after { transform: scale(1); }`,
    (t, l) => `<div class="$">${[t, w(l, "选项二", "Option two"), w(l, "选项三", "Option three")].map((x, i) => `<label><input type="radio" name="$" hidden${i ? "" : " checked"}><i></i>${esc(x)}</label>`).join("")}</div>`),
  ctl("floating-label", ["浮动标签", "输入框聚焦或有内容时，提示文字缩小上浮。"], ["Floating Label", "The placeholder shrinks and floats up on focus or input."], ["elegant"], "focus",
    `${inputBase}
.$ span { position: absolute; left: 16px; top: 50%; translate: 0 -50%; color: var(--muted); pointer-events: none; transition: .2s; }
.$ input:focus { border-color: var(--accent); }
.$ input:focus + span, .$ input:not(:placeholder-shown) + span { top: 14px; font-size: 11px; color: var(--accent); }`,
    (t) => `<label class="$"><input placeholder=" "><span>${esc(t)}</span></label>`),
  ctl("input-underline", ["下划线聚焦", "聚焦时底部线条从中间展开成强调色。"], ["Underline Focus", "On focus the bottom line spreads out from the center in accent."], ["elegant"], "focus",
    `.$ { position: relative; width: 70%; }
.$ input { width: 100%; box-sizing: border-box; padding: 10px 2px; border: 0; border-bottom: 2px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-size: 16px; outline: none; }
.$ i { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent); transform: scaleX(0); transition: transform .35s; }
.$ input:focus + i { transform: scaleX(1); }`,
    (t) => `<label class="$"><input placeholder="${esc(t)}"><i></i></label>`),
  ctl("input-glow", ["发光输入框", "聚焦时输入框外出现柔和的强调色光圈。"], ["Glow Ring Input", "A soft accent ring appears around the input on focus."], ["tech"], "focus",
    `${inputBase}
.$ input { padding: 14px; }
.$ input:focus { border-color: var(--accent); box-shadow: 0 0 0 5px color-mix(in oklab, var(--accent) 25%, transparent); }`,
    (t) => `<label class="$"><input placeholder="${esc(t)}"></label>`),
  ctl("search-expand", ["展开搜索框", "点击放大镜，搜索框向右展开。"], ["Expanding Search", "Click the magnifier and the search field expands."], ["interactive"], "focus",
    `.$ { position: relative; display: flex; align-items: center; }
.$ input { width: 48px; height: 48px; box-sizing: border-box; padding: 0 0 0 46px; border: 2px solid var(--line); border-radius: 24px; background: var(--card); color: var(--fg); font: inherit; outline: none; cursor: pointer; transition: width .4s cubic-bezier(.65,0,.35,1), border-color .3s; }
.$ input:focus { width: 230px; border-color: var(--accent); cursor: text; }
.$ span { position: absolute; left: 15px; pointer-events: none; }`,
    (t) => `<label class="$"><input placeholder="${esc(t)}…"><span aria-hidden="true">🔍</span></label>`, ),
  ctl("error-shake", ["错误抖动", "输入错误时输入框变红并左右抖动。"], ["Error Shake", "The field turns red and shakes on invalid input."], ["feedback"], "auto",
    `${inputBase}
.$ input { padding: 14px; border-color: #ef4444; animation: $-k 2.4s infinite; }
.$ small { display: block; margin-top: 6px; color: #ef4444; font-size: 12px; }
@keyframes $-k { 0%, 20%, 100% { transform: none; } 4%, 12% { transform: translateX(-8px); } 8%, 16% { transform: translateX(8px); } }`,
    (t, l) => `<label class="$"><input value="${esc(t)}@" readonly><small>${w(l, "格式不正确", "Invalid format")}</small></label>`),
  ctl("star-rating", ["星级评分", "悬停时星星逐个亮起，点击固定评分。"], ["Star Rating", "Stars light up as you hover, and a click locks the rating."], ["interactive"], "hover",
    `.$ { display: flex; flex-direction: row-reverse; gap: 4px; font-size: 34px; }
.$ label { color: var(--line); cursor: pointer; transition: color .15s, transform .2s; }
.$ label:hover, .$ label:hover ~ label, .$ label:has(input:checked), .$ label:has(input:checked) ~ label { color: #fbbf24; }
.$:hover label:not(:hover):not(:hover ~ label) { color: var(--line); }
.$ label:hover { transform: scale(1.2); }`,
    () => `<div class="$">${times(5, (i) => `<label><input type="radio" name="$" hidden${i === 2 ? " checked" : ""}>★</label>`)}</div>`),
  ctl("like-burst", ["点赞爆开", "点击爱心后放大变红，周围迸出小圆点。"], ["Like Burst", "The heart grows red and bursts little dots when liked."], ["feedback"], "click",
    `.$ { position: relative; font-size: 44px; line-height: 1; cursor: pointer; color: var(--line); transition: color .2s; }
.$ i { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; margin: -3px; border-radius: 50%; opacity: 0; }
${on()} { color: #f43f5e; animation: $-pop .45s cubic-bezier(.34,1.56,.64,1); }
${on("i")} { animation: $-burst .6s ease-out; }
${times(8, (i) => `.$ i:nth-of-type(${i + 1}) { background: ${["#f43f5e", "#f59e0b", "#a855f7", "#3b82f6"][i % 4]}; --a: ${i * 45}deg; }`)}
@keyframes $-pop { 0% { transform: scale(.6); } 100% { transform: scale(1); } }
@keyframes $-burst { 0% { opacity: 1; transform: rotate(var(--a)) translateX(10px); } 100% { opacity: 0; transform: rotate(var(--a)) translateX(42px); } }`,
    (_t, l) => `<label class="$" aria-label="${w(l, "点赞", "Like")}"><input type="checkbox" hidden>♥${times(8, () => "<i></i>")}</label>`),
  ctl("bookmark-fill", ["收藏书签", "点击书签后从下往上填满颜色。"], ["Bookmark Fill", "The bookmark fills with color from the bottom when clicked."], ["feedback"], "click",
    `.$ { width: 40px; height: 52px; cursor: pointer; }
.$ svg { width: 100%; height: 100%; }
.$ path { fill: transparent; stroke: var(--fg); stroke-width: 2; transition: fill .3s; }
.$ rect { fill: var(--accent); transform: scaleY(0); transform-origin: bottom; transition: transform .4s; }
${on("rect")} { transform: scaleY(1); }
${on("path")} { stroke: var(--accent); }`,
    (_t, l) => `<label class="$" aria-label="${w(l, "收藏", "Bookmark")}"><input type="checkbox" hidden><svg viewBox="0 0 40 52"><defs><clipPath id="$-c"><path d="M4 4h32v44L20 36 4 48z"/></clipPath></defs><rect width="40" height="52" clip-path="url(#$-c)"/><path d="M4 4h32v44L20 36 4 48z"/></svg></label>`),
  ctl("range-glow", ["发光滑杆", "拖动滑杆时，圆形手柄放大并发光。"], ["Glowing Slider", "The thumb grows and glows while you drag the slider."], ["tech"], "drag",
    `.$ { width: 75%; -webkit-appearance: none; appearance: none; height: 6px; border-radius: 6px; background: linear-gradient(90deg, var(--accent), #ec4899); outline: none; }
.$::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #fff; border: 3px solid var(--accent); cursor: grab; transition: transform .2s, box-shadow .2s; }
.$::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 3px solid var(--accent); cursor: grab; }
.$:active::-webkit-slider-thumb { transform: scale(1.3); box-shadow: 0 0 0 8px color-mix(in oklab, var(--accent) 25%, transparent); }`,
    (t) => `<input class="$" type="range" aria-label="${esc(t)}" value="60">`),
  ctl("chip-select", ["标签多选", "点击标签切换选中，选中时出现对勾。"], ["Selectable Chips", "Tap chips to toggle them; selected ones show a check."], ["interactive"], "click",
    `.$ { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 85%; }
.$ label { display: inline-flex; align-items: center; gap: 4px; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--line); font-size: 14px; cursor: pointer; transition: .2s; }
.$ label::before { content: "✓"; width: 0; overflow: hidden; transition: width .2s; }
.$ label:has(input:checked) { background: var(--fg); color: var(--page); border-color: var(--fg); }
.$ label:has(input:checked)::before { width: 1em; }`,
    (t, l) => `<div class="$">${[t, w(l, "设计", "Design"), w(l, "动画", "Motion"), w(l, "代码", "Code")].map((x, i) => `<label><input type="checkbox" hidden${i === 1 ? " checked" : ""}>${esc(x)}</label>`).join("")}</div>`),
  ctl("theme-toggle-icon", ["太阳月亮切换", "点击后太阳收缩成月牙，光芒消失。"], ["Sun to Moon", "The sun shrinks into a crescent and its rays fade on click."], ["game"], "click",
    `.$ { position: relative; width: 64px; height: 64px; display: grid; place-items: center; cursor: pointer; }
.$ b { width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; transition: .5s cubic-bezier(.65,0,.35,1); }
.$ i { position: absolute; width: 4px; height: 10px; border-radius: 2px; background: #f59e0b; transition: .4s; }
${times(8, (i) => `.$ i:nth-of-type(${i + 1}) { transform: rotate(${i * 45}deg) translateY(-24px); }`)}
${on("b")} { background: transparent; box-shadow: inset -10px -6px 0 0 #a5b4fc; transform: rotate(-20deg) scale(1.15); }
${on("i")} { opacity: 0; transform: scale(0); }`,
    (_t, l) => `<label class="$" aria-label="${w(l, "切换主题", "Toggle theme")}"><input type="checkbox" hidden><b></b>${times(8, () => "<i></i>")}</label>`),
  ctl("password-reveal", ["密码显示", "点击眼睛图标，圆点变成明文文字。"], ["Password Reveal", "Click the eye and the dots turn into readable text."], ["interactive"], "click",
    `.$ { position: relative; width: 72%; display: flex; align-items: center; padding: 14px; border: 2px solid var(--line); border-radius: 12px; background: var(--card); font-family: ui-monospace, monospace; }
.$ span { position: relative; flex: 1; letter-spacing: 2px; }
.$ span b { position: absolute; left: 0; font-weight: 400; clip-path: inset(0 100% 0 0); background: var(--card); transition: clip-path .4s; }
.$ label { cursor: pointer; font-size: 18px; }
.$:has(input:checked) span b { clip-path: inset(0); }`,
    (t, l) => `<div class="$"><span>••••••••<b>${esc(t)}123</b></span><label aria-label="${w(l, "显示密码", "Show password")}"><input type="checkbox" hidden>👁</label></div>`),
  ctl("counter-stepper", ["数量加减", "点击加号，数字向上翻动一格。"], ["Quantity Stepper", "Clicking + rolls the number up by one."], ["interactive"], "click",
    `.$ { display: flex; align-items: center; gap: 14px; padding: 6px; border-radius: 14px; border: 1px solid var(--line); background: var(--card); }
.$ label, .$ > span { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 10px; font-size: 20px; font-weight: 700; }
.$ label { background: color-mix(in oklab, var(--fg) 8%, transparent); cursor: pointer; }
.$ div { height: 38px; overflow: hidden; font-size: 22px; font-weight: 800; line-height: 38px; }
.$ div p { margin: 0; transition: transform .35s cubic-bezier(.34,1.4,.64,1); }
.$:has(input:checked) div p { transform: translateY(-38px); }`,
    () => `<div class="$"><span aria-hidden="true">−</span><div><p>1</p><p>2</p></div><label><input type="checkbox" hidden>+</label></div>`),
  ctl("toggle-list-row", ["开关列表", "点击整行切换开关，图标颜色跟着变化。"], ["Settings Row", "Click the row to flip its switch; the icon color follows."], ["elegant"], "click",
    `.$ { width: 80%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; background: var(--card); border: 1px solid var(--line); cursor: pointer; font-weight: 600; }
.$ em { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; background: var(--line); font-style: normal; transition: background .3s; }
.$ span { flex: 1; }
.$ b { position: relative; width: 44px; height: 26px; border-radius: 26px; background: var(--line); transition: background .3s; }
.$ b::after { content: ""; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: transform .3s; }
${on("em")}, ${on("b")} { background: #22c55e; }
.$:has(input:checked) b::after { transform: translateX(18px); }`,
    (t) => `<label class="$"><input type="checkbox" hidden><em>🔔</em><span>${esc(t)}</span><b></b></label>`),
  ctl("otp-input", ["验证码输入", "验证码格子依次亮起，像在逐位输入。"], ["OTP Input", "Code boxes light up one by one as if digits are typed."], ["tech"], "auto",
    `.$ { display: flex; gap: 8px; }
.$ i { width: 38px; height: 48px; display: grid; place-items: center; border-radius: 10px; border: 2px solid var(--line); font-style: normal; font-size: 22px; font-weight: 800; color: transparent; animation: $-k 4s infinite; }
${times(5, (i) => `.$ i:nth-child(${i + 1}) { animation-delay: ${i * 0.35}s; }`)}
@keyframes $-k { 0%, 5% { border-color: var(--line); color: transparent; } 10% { border-color: var(--accent); color: var(--fg); transform: scale(1.08); } 15%, 85% { border-color: var(--accent); color: var(--fg); transform: none; } 95%, 100% { border-color: var(--line); color: transparent; } }`,
    () => `<div class="$">${[4, 8, 1, 5, 9].map((n) => `<i>${n}</i>`).join("")}</div>`),
  ctl("upload-drop", ["上传拖放区", "虚线框不停流动，图标上下浮动，提示拖入文件。"], ["Upload Dropzone", "Dashed borders march and the icon bobs, inviting a file drop."], ["feedback"], "auto",
    `.$ { width: 75%; padding: 22px; box-sizing: border-box; display: grid; justify-items: center; gap: 8px; border-radius: 16px; color: var(--muted); font-weight: 600;
  background: linear-gradient(90deg, var(--accent) 50%, transparent 0) repeat-x 0 0 / 14px 2px, linear-gradient(90deg, var(--accent) 50%, transparent 0) repeat-x 0 100% / 14px 2px, linear-gradient(0deg, var(--accent) 50%, transparent 0) repeat-y 0 0 / 2px 14px, linear-gradient(0deg, var(--accent) 50%, transparent 0) repeat-y 100% 0 / 2px 14px; animation: $-k .8s linear infinite; }
.$ b { font-size: 28px; animation: $-b 1.6s ease-in-out infinite; }
@keyframes $-k { to { background-position: 14px 0, -14px 100%, 0 -14px, 100% 14px; } }
@keyframes $-b { 50% { transform: translateY(-6px); } }`,
    (t) => `<div class="$"><b aria-hidden="true">⬆</b>${esc(t)}</div>`, ),
];

export const controlSnippets = defs.map((d) => (SAMPLES[d.id] ? { ...d, sample: SAMPLES[d.id] } : d));
