import { ctl, inputBase, on, switchBase, switchHtml } from "./controls";
import { esc, times, w, type SnippetDef } from "./helpers";

const defs: SnippetDef[] = [
  ctl("switch-label", ["文字开关", "开关轨道里写着「开 / 关」，滑块移动时文字跟着切换。"], ["Labeled Switch", "The track reads On / Off and the label swaps as the knob moves."], ["interactive"], "click",
    `${switchBase}
.$ { width: 84px; }
.$::before, .$::after { position: absolute; top: 50%; translate: 0 -50%; font-size: 11px; font-weight: 800; transition: opacity .3s; }
.$::before { content: var(--on); left: 12px; color: var(--accent-fg); opacity: 0; }
.$::after { content: var(--off); right: 12px; color: var(--muted); }
${on()} { background: var(--accent); }
${on("i")} { transform: translateX(44px); }
.$:has(input:checked)::before { opacity: 1; } .$:has(input:checked)::after { opacity: 0; }`,
    (_t, l) => `<label class="$" style="--on:'${w(l, "开", "ON")}';--off:'${w(l, "关", "OFF")}'" aria-label="${w(l, "开关", "Toggle")}"><input type="checkbox" hidden><i></i></label>`),
  ctl("switch-3d", ["立体开关", "有厚度的拨动开关，打开时滑块向右倒下并亮起。"], ["3D Switch", "A thick rocker-style switch that tips right and lights up when on."], ["tech"], "click",
    `${switchBase}
.$ { background: var(--stage); box-shadow: inset 0 3px 6px rgb(0 0 0 / .3); }
.$ i { background: linear-gradient(#fff, #d4d4d8); box-shadow: 0 4px 0 #a1a1aa, 0 6px 10px rgb(0 0 0 / .3); }
${on()} { background: color-mix(in oklab, #22c55e 60%, var(--stage)); }
${on("i")} { transform: translateX(32px); background: linear-gradient(#bbf7d0, #4ade80); box-shadow: 0 4px 0 #16a34a, 0 0 14px #22c55e; }`, switchHtml),
  ctl("switch-emoji", ["表情开关", "关的时候在睡觉，打开后变成笑脸。"], ["Emoji Switch", "Asleep when off, a big smile when on."], ["game"], "click",
    `${switchBase}
.$ i::before { content: "😴"; position: absolute; inset: 0; display: grid; place-items: center; font-style: normal; font-size: 18px; transition: transform .35s; }
${on()} { background: #fbbf24; }
${on("i")} { transform: translateX(32px) rotate(360deg); }
.$:has(input:checked) i::before { content: "😄"; }`, switchHtml),
  ctl("todo-strike", ["待办划掉", "勾选后，任务文字被一条线划掉并变淡。"], ["To-do Strike", "Checking the box strikes the task through and fades it."], ["feedback"], "click",
    `.$ { display: flex; align-items: center; gap: 12px; font-weight: 600; cursor: pointer; }
.$ i { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--line); display: grid; place-items: center; font-style: normal; font-size: 13px; color: transparent; transition: .2s; }
.$ span { position: relative; transition: color .3s; }
.$ span::after { content: ""; position: absolute; left: -2px; right: -2px; top: 52%; height: 2px; background: var(--fg); transform: scaleX(0); transform-origin: left; transition: transform .35s; }
${on("i")} { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
${on("span")} { color: var(--muted); }
.$:has(input:checked) span::after { transform: scaleX(1); background: var(--muted); }`,
    (t) => `<label class="$"><input type="checkbox" hidden><i>✓</i><span>${esc(t)}</span></label>`),
  ctl("check-burst", ["勾选光圈", "圆形复选框被勾选时，外面扩散出一圈光环。"], ["Check Burst", "A ring bursts out around the round checkbox when it is ticked."], ["feedback"], "click",
    `.$ { position: relative; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; border: 2px solid var(--line); cursor: pointer; font-size: 20px; color: transparent; transition: .25s; }
.$::after { content: ""; position: absolute; inset: -2px; border-radius: 50%; border: 2px solid var(--accent); opacity: 0; }
${on()} { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
.$:has(input:checked)::after { animation: $-k .5s ease-out; }
@keyframes $-k { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(1.8); } }`,
    (_t, l) => `<label class="$" aria-label="${w(l, "完成", "Done")}"><input type="checkbox" hidden>✓</label>`),
  ctl("radio-cards", ["卡片单选", "像卡片一样的选项，选中的那张边框变色并稍微放大。"], ["Radio Cards", "Card-like options; the chosen one gets an accent border and grows a little."], ["interactive"], "click",
    `.$ { display: flex; gap: 10px; }
.$ label { width: 74px; padding: 14px 8px; display: grid; justify-items: center; gap: 6px; border-radius: 14px; border: 2px solid var(--line); background: var(--card); font-size: 13px; font-weight: 600; cursor: pointer; transition: .25s cubic-bezier(.34,1.4,.64,1); }
.$ label b { font-size: 20px; }
.$ label:has(input:checked) { border-color: var(--accent); transform: translateY(-4px) scale(1.04); box-shadow: 0 10px 20px color-mix(in oklab, var(--accent) 25%, transparent); }`,
    (_t, l) => `<div class="$">${[["🚲", w(l, "骑行", "Bike")], ["🚗", w(l, "驾车", "Car")], ["🚆", w(l, "火车", "Train")]].map(([e, x], i) => `<label><input type="radio" name="$" hidden${i === 1 ? " checked" : ""}><b>${e}</b>${x}</label>`).join("")}</div>`),
  ctl("input-success", ["输入成功", "输入框变成绿色，右侧弹出对勾。"], ["Valid Input", "The field turns green and a check pops in on the right."], ["feedback"], "auto",
    `${inputBase}
.$ input { padding: 14px; padding-right: 40px; animation: $-b 3s infinite; }
.$ b { position: absolute; right: 14px; top: 50%; translate: 0 -50%; width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; background: #22c55e; color: #fff; font-size: 12px; animation: $-k 3s infinite; }
@keyframes $-b { 0%, 30% { border-color: var(--line); } 40%, 90% { border-color: #22c55e; box-shadow: 0 0 0 4px rgb(34 197 94 / .15); } 100% { border-color: var(--line); } }
@keyframes $-k { 0%, 35% { transform: scale(0); } 45% { transform: scale(1.3); } 55%, 90% { transform: scale(1); } 100% { transform: scale(0); } }`,
    (t) => `<label class="$"><input value="${esc(t)}@example.com" readonly><b>✓</b></label>`),
  ctl("typing-placeholder", ["打字占位符", "输入框里的提示文字像被打出来一样逐字出现。"], ["Typing Placeholder", "The placeholder hint appears letter by letter as if being typed."], ["tech"], "auto",
    `${inputBase}
.$ div { padding: 14px; border: 2px solid var(--line); border-radius: 12px; background: var(--card); color: var(--muted); font-size: 15px; }
.$ span { display: inline-block; overflow: hidden; white-space: nowrap; vertical-align: bottom; border-right: 2px solid var(--accent); animation: $-type 4s steps(var(--n)) infinite, $-blink .7s step-end infinite; }
@keyframes $-type { 0%, 10% { width: 0; } 60%, 90% { width: calc(var(--n) * 1ch + 2px); } 100% { width: 0; } }
@keyframes $-blink { 50% { border-color: transparent; } }`,
    (_t, l) => { const hint = w(l, "搜索动效…", "Search effects…"); return `<label class="$"><div><span style="--n:${Array.from(hint).length * (l === "zh" ? 2 : 1)}">${hint}</span></div></label>`; }),
  ctl("input-gradient-ring", ["渐变边框聚焦", "聚焦时输入框外出现一圈彩色渐变边框。"], ["Gradient Focus Ring", "On focus a colorful gradient ring wraps the input."], ["showcase"], "focus",
    `${inputBase}
.$ input { padding: 14px; border: 2px solid transparent; background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(var(--line), var(--line)) border-box; }
.$ input:focus { background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3)) border-box; }`,
    (t) => `<label class="$"><input placeholder="${esc(t)}"></label>`),
  ctl("input-icon-label", ["图标标签", "聚焦时，标签文字滑到左侧变成小图标。"], ["Label to Icon", "On focus the label slides left and turns into a small icon."], ["elegant"], "focus",
    `${inputBase}
.$ input { padding: 14px 14px 14px 42px; }
.$ span { position: absolute; left: 14px; top: 50%; translate: 0 -50%; color: var(--muted); pointer-events: none; transition: .3s; }
.$ i { position: absolute; left: 14px; top: 50%; translate: 0 -50%; font-style: normal; opacity: 0; transform: scale(.5); transition: .3s; }
.$ input:focus { border-color: var(--accent); }
.$ input:focus ~ span, .$ input:not(:placeholder-shown) ~ span { opacity: 0; transform: translateX(-20px); }
.$ input:focus ~ i, .$ input:not(:placeholder-shown) ~ i { opacity: 1; transform: none; color: var(--accent); }
.$ input::placeholder { color: transparent; }
.$ input:not(:focus):placeholder-shown { padding-left: 14px; }`,
    (t) => `<label class="$"><input placeholder=" "><span>${esc(t)}</span><i>✉</i></label>`),
  ctl("volume-slider", ["音量滑杆", "拖动滑杆时，左侧的音量图标随数值变化。"], ["Volume Slider", "As you drag, the speaker icon on the left changes with the level."], ["interactive"], "drag",
    `.$ { display: flex; align-items: center; gap: 12px; width: 78%; }
.$ input { flex: 1; accent-color: var(--accent); height: 6px; cursor: grab; }
.$ span { width: 24px; font-size: 20px; text-align: center; }
.$ span::before { content: "🔉"; }
.$:has(input:active) span::before { content: "🔊"; }`,
    (t) => `<label class="$"><span aria-hidden="true"></span><input type="range" value="55" aria-label="${esc(t)}"></label>`),
  ctl("heart-rating", ["爱心评分", "鼠标移到第几颗心，前面的心都会变红跳动。"], ["Heart Rating", "Hovering a heart fills it and every heart before it, with a little pulse."], ["game"], "hover",
    `.$ { display: flex; flex-direction: row-reverse; gap: 6px; font-size: 30px; }
.$ label { color: var(--line); cursor: pointer; transition: color .15s; }
.$ label:hover, .$ label:hover ~ label, .$ label:has(input:checked), .$ label:has(input:checked) ~ label { color: #f43f5e; }
.$:hover label:not(:hover):not(:hover ~ label) { color: var(--line); }
.$ label:hover { animation: $-k .5s; }
@keyframes $-k { 50% { transform: scale(1.35); } }`,
    () => `<div class="$">${times(5, (i) => `<label><input type="radio" name="$" hidden${i === 1 ? " checked" : ""}>♥</label>`)}</div>`),
  ctl("format-toolbar", ["格式工具栏", "加粗、斜体、下划线按钮，点击后按下并高亮。"], ["Format Toolbar", "Bold, italic and underline toggles that press in and highlight when clicked."], ["interactive"], "click",
    `.$ { display: flex; gap: 4px; padding: 4px; border-radius: 12px; border: 1px solid var(--line); background: var(--card); }
.$ label { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 8px; font-family: Georgia, serif; font-size: 17px; cursor: pointer; transition: background .2s, transform .1s; }
.$ label:hover { background: color-mix(in oklab, var(--fg) 6%, transparent); }
.$ label:active { transform: scale(.9); }
.$ label:has(input:checked) { background: var(--accent); color: var(--accent-fg); }`,
    () => `<div class="$">${[["B", "font-weight:900"], ["I", "font-style:italic"], ["U", "text-decoration:underline"], ["S", "text-decoration:line-through"]].map(([x, s], i) => `<label style="${s}"><input type="checkbox" hidden${i === 0 ? " checked" : ""}>${x}</label>`).join("")}</div>`),
  ctl("select-dropdown", ["下拉选择", "点击选择框，选项列表展开，箭头翻转。"], ["Select Dropdown", "Clicking the select opens the option list and flips the arrow."], ["elegant"], "focus",
    `.$ { position: relative; width: 62%; align-self: start; margin-top: 26px; }
.$ > span { display: flex; justify-content: space-between; padding: 12px 14px; border-radius: 12px; border: 2px solid var(--line); background: var(--card); cursor: pointer; }
.$ > span::after { content: "▾"; transition: transform .3s; }
.$:focus-within > span { border-color: var(--accent); }
.$:focus-within > span::after { transform: rotate(180deg); }
.$ ul { position: absolute; left: 0; right: 0; top: calc(100% + 6px); margin: 0; padding: 6px; list-style: none; border-radius: 12px; border: 1px solid var(--line); background: var(--card); box-shadow: 0 12px 30px rgb(0 0 0 / .15); opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.98); transform-origin: top; transition: .2s; }
.$ li { padding: 8px 10px; border-radius: 8px; font-size: 14px; }
.$ li:first-child { background: color-mix(in oklab, var(--accent) 15%, transparent); }
.$:focus-within ul { opacity: 1; visibility: visible; transform: none; }`,
    (t, l) => `<div class="$"><span tabindex="0">${esc(t)}</span><ul>${[t, w(l, "选项二", "Option two"), w(l, "选项三", "Option three")].map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`),
  ctl("tag-input", ["标签输入", "标签一个个弹进输入框里，像在逐个添加。"], ["Tag Input", "Tags pop into the field one by one as if being added."], ["interactive"], "auto",
    `.$ { width: 80%; display: flex; flex-wrap: wrap; gap: 6px; padding: 10px; border-radius: 12px; border: 2px solid var(--line); background: var(--card); }
.$ span { padding: 5px 10px; border-radius: 999px; background: color-mix(in oklab, var(--accent) 18%, transparent); color: var(--fg); font-size: 13px; animation: $-k 4s infinite both; }
${times(4, (i) => `.$ span:nth-child(${i + 1}) { animation-delay: ${i * 0.45}s; }`)}
.$ i { width: 2px; align-self: stretch; background: var(--accent); animation: $-b .8s step-end infinite; }
@keyframes $-k { 0% { transform: scale(0); opacity: 0; } 8%, 85% { transform: scale(1); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
@keyframes $-b { 50% { opacity: 0; } }`,
    (t, l) => `<div class="$">${[t, w(l, "设计", "Design"), w(l, "动画", "Motion"), "CSS"].map((x) => `<span>${esc(x)} ×</span>`).join("")}<i></i></div>`),
  ctl("file-progress", ["文件上传进度", "文件条从左到右填满，完成后显示绿色对勾。"], ["File Upload", "The file row fills left to right and shows a green check when done."], ["feedback"], "auto",
    `.$ { position: relative; width: 78%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; overflow: hidden; border-radius: 12px; border: 1px solid var(--line); background: var(--card); font-size: 13px; }
.$::before { content: ""; position: absolute; inset: 0; background: color-mix(in oklab, var(--accent) 14%, transparent); transform-origin: left; animation: $-k 3.5s ease-in-out infinite; }
.$ em { position: relative; font-style: normal; font-size: 20px; }
.$ span { position: relative; flex: 1; font-weight: 600; }
.$ b { position: relative; width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; background: #22c55e; color: #fff; font-size: 11px; animation: $-c 3.5s infinite; }
@keyframes $-k { 0% { transform: scaleX(0); } 70%, 100% { transform: scaleX(1); } }
@keyframes $-c { 0%, 68% { transform: scale(0); } 76% { transform: scale(1.3); } 82%, 100% { transform: scale(1); } }`,
    (t) => `<div class="$"><em>📄</em><span>${esc(t)}.pdf</span><b>✓</b></div>`),
  ctl("copy-field", ["一键复制", "点击复制按钮，按钮变成绿色对勾，再自动恢复。"], ["Copy Field", "Click copy and the button turns into a green check, then resets."], ["feedback"], "click",
    `.$ { width: 80%; display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 14px; border-radius: 12px; border: 1px solid var(--line); background: var(--card); font-family: ui-monospace, monospace; font-size: 13px; }
.$ span { flex: 1; color: var(--muted); }
.$ button { position: relative; width: 70px; height: 32px; border: 0; border-radius: 8px; background: var(--fg); color: var(--page); font: inherit; cursor: pointer; }
.$ button b, .$ button em { position: absolute; inset: 0; display: grid; place-items: center; font-style: normal; }
.$ button em { opacity: 0; background: #22c55e; border-radius: 8px; color: #fff; }
.$ button:focus em { animation: $-k 1.6s; }
@keyframes $-k { 0% { opacity: 0; transform: scale(.6); } 15%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }`,
    (t, l) => `<div class="$"><span>npm i ${esc(t).toLowerCase()}</span><button type="button"><b>${w(l, "复制", "Copy")}</b><em>✓</em></button></div>`),
  ctl("search-suggest", ["搜索建议", "聚焦搜索框时，建议列表依次滑出。"], ["Search Suggestions", "When the search box is focused, suggestions slide out one by one."], ["interactive"], "focus",
    `.$ { position: relative; width: 74%; align-self: start; margin-top: 24px; }
.$ input { width: 100%; box-sizing: border-box; padding: 12px 14px; border: 2px solid var(--line); border-radius: 12px; background: var(--card); color: var(--fg); font: inherit; outline: none; }
.$ input:focus { border-color: var(--accent); border-radius: 12px 12px 0 0; }
.$ ul { position: absolute; left: 0; right: 0; margin: 0; padding: 4px; list-style: none; border: 2px solid var(--accent); border-top: 0; border-radius: 0 0 12px 12px; background: var(--card); opacity: 0; visibility: hidden; }
.$ li { padding: 8px 10px; font-size: 13px; color: var(--muted); opacity: 0; transform: translateY(-4px); transition: .25s; }
.$ li::before { content: "⌕ "; }
.$ input:focus + ul { opacity: 1; visibility: visible; }
.$ input:focus + ul li { opacity: 1; transform: none; }
${times(3, (i) => `.$ input:focus + ul li:nth-child(${i + 1}) { transition-delay: ${i * 0.06}s; }`)}`,
    (t, l) => `<label class="$"><input placeholder="${w(l, "搜索…", "Search…")}"><ul>${[t, w(l, "按钮悬停", "Button hover"), w(l, "加载动画", "Loading spinner")].map((x) => `<li>${esc(x)}</li>`).join("")}</ul></label>`),
  ctl("password-strength", ["密码强度", "强度条一格格亮起，颜色从红变到绿。"], ["Password Strength", "Strength bars light up one by one, going from red to green."], ["feedback"], "auto",
    `.$ { width: 74%; }
.$ div { padding: 12px 14px; border-radius: 12px; border: 2px solid var(--line); background: var(--card); letter-spacing: 3px; }
.$ p { display: flex; gap: 6px; margin: 10px 0 0; }
.$ i { flex: 1; height: 6px; border-radius: 3px; background: var(--line); animation: $-k 4s infinite; }
${times(4, (i) => `.$ i:nth-child(${i + 1}) { --c: ${["#ef4444", "#f59e0b", "#84cc16", "#22c55e"][i]}; animation-delay: ${i * 0.5}s; }`)}
@keyframes $-k { 0%, 5% { background: var(--line); } 10%, 85% { background: var(--c); } 95%, 100% { background: var(--line); } }`,
    () => `<div class="$"><div>••••••••••</div><p>${times(4, () => "<i></i>")}</p></div>`),
  ctl("slider-captcha", ["滑块验证", "滑块被拖到最右边，轨道变绿显示验证通过。"], ["Slider Captcha", "The slider is dragged all the way right and the track turns green to confirm."], ["feedback"], "auto",
    `.$ { position: relative; width: 78%; height: 46px; border-radius: 12px; background: var(--line); overflow: hidden; display: grid; place-items: center; font-size: 13px; color: var(--muted); }
.$::before { content: ""; position: absolute; inset: 0; background: #22c55e; transform-origin: left; animation: $-fill 3.5s ease-in-out infinite; }
.$ b { position: absolute; left: 3px; top: 3px; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 10px; background: var(--card); box-shadow: 0 2px 6px rgb(0 0 0 / .2); animation: $-k 3.5s ease-in-out infinite; }
.$ span { position: relative; }
@keyframes $-k { 0%, 15% { left: 3px; } 55%, 90% { left: calc(100% - 43px); } 100% { left: 3px; } }
@keyframes $-fill { 0%, 15% { transform: scaleX(0); } 55%, 90% { transform: scaleX(1); } 100% { transform: scaleX(0); } }`,
    (_t, l) => `<div class="$"><span>${w(l, "向右滑动验证", "Slide to verify")}</span><b>»</b></div>`),
];

const SAMPLES: Record<string, { zh: string; en: string }> = {
  "todo-strike": { zh: "写周报", en: "Write the weekly report" },
  "file-progress": { zh: "设计稿", en: "design" },
  "copy-field": { zh: "Motion", en: "Motion" },
  "select-dropdown": { zh: "选项一", en: "Option one" },
  "tag-input": { zh: "动效", en: "Motion" },
  "input-gradient-ring": { zh: "邮箱", en: "Email" },
};

export const controlMoreSnippets = defs.map((d) => (SAMPLES[d.id] ? { ...d, sample: SAMPLES[d.id] } : d));
