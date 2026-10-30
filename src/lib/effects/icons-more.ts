import { times, w, type SnippetDef } from "./helpers";
import { glyph, icon, sized, stroke, svg } from "./icons";

export const iconMoreSnippets: SnippetDef[] = [
  icon("icon-battery-low", ["低电量", "电池只剩一格，红色电量闪烁提醒。"], ["Low Battery", "Only one bar left, blinking red as a warning."], ["feedback"], "auto",
    `.$ { position: relative; width: 64px; height: 32px; box-sizing: border-box; padding: 4px; border: 3px solid var(--fg); border-radius: 7px; }
.$::after { content: ""; position: absolute; right: -8px; top: 8px; width: 5px; height: 10px; border-radius: 0 3px 3px 0; background: var(--fg); }
.$ i { display: block; width: 22%; height: 100%; border-radius: 2px; background: #ef4444; animation: $-k 1s steps(1) infinite; }
@keyframes $-k { 50% { opacity: .15; } }`, (l) => glyph("<i></i>", w(l, "电量低", "Battery low"))),
  icon("icon-mic", ["麦克风", "麦克风两侧的声波一圈圈扩散，表示正在录音。"], ["Recording Mic", "Sound waves ripple out from the microphone while recording."], ["feedback"], "auto",
    `.$ { position: relative; ${sized} }
.$ i { position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px; border-radius: 50%; border: 2px solid #ef4444; opacity: 0; animation: $-k 1.8s ease-out infinite; }
.$ i:nth-of-type(2) { animation-delay: .6s; } .$ i:nth-of-type(3) { animation-delay: 1.2s; }
@keyframes $-k { from { transform: scale(.8); opacity: .8; } to { transform: scale(2.2); opacity: 0; } }`, (l) => glyph(`🎙${times(3, () => "<i></i>")}`, w(l, "录音中", "Recording"))),
  icon("icon-camera-flash", ["相机闪光", "相机按下快门时，画面闪一下白光。"], ["Camera Flash", "A white flash fires as the camera shutter clicks."], ["game"], "auto",
    `.$ { position: relative; ${sized} }
.$::after { content: ""; position: absolute; inset: -60px; border-radius: 50%; background: radial-gradient(circle, #fff, transparent 60%); opacity: 0; animation: $-k 2.4s infinite; }
@keyframes $-k { 0%, 70%, 100% { opacity: 0; } 72% { opacity: 1; } 80% { opacity: 0; } }`, (l) => glyph("📷", w(l, "拍照", "Photo"))),
  icon("icon-location", ["定位跳动", "定位图钉上下跳动，地面上的涟漪随之扩散。"], ["Location Pin", "A location pin bounces while a ripple spreads on the ground."], ["feedback"], "auto",
    `.$ { position: relative; width: 60px; height: 70px; }
.$ b { position: absolute; left: 14px; top: 0; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; background: #ef4444; transform: rotate(-45deg); animation: $-k 1.2s ease-in-out infinite; }
.$ b::after { content: ""; position: absolute; inset: 10px; border-radius: 50%; background: #fff; }
.$ i { position: absolute; left: 15px; bottom: 4px; width: 30px; height: 10px; border-radius: 50%; border: 2px solid #ef4444; animation: $-r 1.2s ease-out infinite; }
@keyframes $-k { 0%, 100% { transform: translateY(6px) rotate(-45deg); } 50% { transform: translateY(-6px) rotate(-45deg); } }
@keyframes $-r { from { transform: scale(.4); opacity: 1; } to { transform: scale(1.8); opacity: 0; } }`, (l) => glyph("<b></b><i></i>", w(l, "定位", "Location"))),
  icon("icon-refresh", ["刷新旋转", "悬停时刷新图标转一圈。"], ["Refresh Spin", "The refresh icon spins around once on hover."], ["interactive"], "hover",
    `.$ { ${sized} cursor: pointer; transition: transform .7s cubic-bezier(.65,0,.35,1); }
.$:hover { transform: rotate(360deg); }`, (l) => glyph("⟳", w(l, "刷新", "Refresh"))),
  icon("icon-eye-blink", ["眨眼", "眼睛每隔几秒眨一下。"], ["Blinking Eye", "The eye blinks every few seconds."], ["game"], "auto",
    `.$ { position: relative; width: 70px; height: 40px; border-radius: 50%; background: var(--card); border: 3px solid var(--fg); overflow: hidden; animation: $-k 3s infinite; }
.$ i { position: absolute; left: 50%; top: 50%; width: 20px; height: 20px; margin: -10px; border-radius: 50%; background: var(--fg); box-shadow: inset -4px -4px 0 var(--accent); animation: $-look 3s ease-in-out infinite; }
@keyframes $-k { 0%, 90%, 100% { transform: scaleY(1); } 94% { transform: scaleY(.08); } }
@keyframes $-look { 0%, 40% { transform: translateX(0); } 50%, 70% { transform: translateX(10px); } 80% { transform: translateX(-8px); } }`, (l) => glyph("<i></i>", w(l, "眼睛", "Eye"))),
  icon("icon-volume", ["音量波纹", "喇叭旁边的声波弧线由近到远依次出现。"], ["Volume Waves", "Sound arcs appear one after another beside the speaker."], ["feedback"], "auto",
    `.$ { width: 70px; height: 56px; }
.$ path { ${stroke} }
.$ path + path { opacity: 0; animation: $-k 1.6s infinite; }
.$ path:nth-of-type(3) { animation-delay: .25s; }
@keyframes $-k { 0%, 10% { opacity: 0; } 30%, 70% { opacity: 1; } 100% { opacity: 0; } }`,
    () => svg(`<path d="M6 20h8l10-9v26l-10-9H6z" style="fill:var(--fg)"/><path d="M30 18a8 8 0 0 1 0 12"/><path d="M35 13a15 15 0 0 1 0 22"/>`, "0 0 48 48"), "SVG"),
  icon("icon-cart", ["购物车角标", "商品加入购物车时，角标数字弹一下。"], ["Cart Badge", "The badge on the cart pops when an item is added."], ["feedback"], "auto",
    `.$ { position: relative; ${sized} }
.$ b { position: absolute; top: -6px; right: -10px; min-width: 22px; height: 22px; padding: 0 6px; box-sizing: border-box; display: grid; place-items: center; border-radius: 11px; background: var(--accent); color: var(--accent-fg); font-size: 12px; animation: $-k 2s cubic-bezier(.34,1.56,.64,1) infinite; }
.$::before { content: ""; position: absolute; left: 50%; top: -30px; width: 10px; height: 10px; border-radius: 3px; background: var(--accent-2); animation: $-drop 2s ease-in infinite; }
@keyframes $-drop { 0% { transform: translateY(0); opacity: 1; } 40% { transform: translateY(40px); opacity: 0; } 100% { opacity: 0; } }
@keyframes $-k { 0%, 38%, 100% { transform: scale(1); } 48% { transform: scale(1.5); } 58% { transform: scale(1); } }`, (l) => glyph("🛒<b>2</b>", w(l, "购物车", "Cart"))),
  icon("icon-gift", ["礼物盒", "礼物盒的盖子跳起来，里面冒出星星。"], ["Gift Box", "The gift box lid hops open and a star pops out."], ["game"], "auto",
    `.$ { position: relative; width: 60px; height: 64px; }
.$ b { position: absolute; left: 6px; bottom: 0; width: 48px; height: 36px; border-radius: 4px; background: #ef4444; }
.$ b::after { content: ""; position: absolute; left: 20px; top: 0; bottom: 0; width: 8px; background: #fde047; }
.$ i { position: absolute; left: 2px; top: 18px; width: 56px; height: 12px; border-radius: 4px; background: #dc2626; animation: $-lid 2s ease-in-out infinite; }
.$ em { position: absolute; left: 22px; top: 18px; font-style: normal; font-size: 18px; color: #fbbf24; opacity: 0; animation: $-star 2s ease-out infinite; }
@keyframes $-lid { 0%, 30%, 100% { transform: none; } 45%, 60% { transform: translateY(-16px) rotate(-15deg); } }
@keyframes $-star { 0%, 40% { opacity: 0; transform: none; } 55% { opacity: 1; transform: translateY(-30px) scale(1.3); } 75%, 100% { opacity: 0; transform: translateY(-40px); } }`, (l) => glyph("<b></b><i></i><em>★</em>", w(l, "礼物", "Gift"))),
  icon("icon-flame", ["跳动火焰", "一团火焰左右摇曳、忽大忽小。"], ["Flickering Flame", "A flame sways side to side, growing and shrinking."], ["impact"], "auto",
    `.$ { position: relative; width: 44px; height: 60px; }
.$::before, .$::after { content: ""; position: absolute; left: 50%; bottom: 0; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: bottom; animation: $-k .8s ease-in-out infinite alternate; }
.$::before { width: 40px; height: 56px; margin-left: -20px; background: linear-gradient(#f97316, #dc2626); }
.$::after { width: 20px; height: 30px; margin-left: -10px; background: linear-gradient(#fef08a, #fbbf24); animation-duration: .6s; }
@keyframes $-k { from { transform: scale(1, 1) rotate(-3deg); } to { transform: scale(.92, 1.08) rotate(3deg); } }`, (l) => glyph("", w(l, "火焰", "Flame"))),
  icon("icon-shield", ["安全扫描", "扫描线在盾牌上下移动，完成后显示对勾。"], ["Shield Scan", "A scan line moves over the shield, then a check appears."], ["tech"], "auto",
    `.$ { position: relative; width: 56px; height: 64px; overflow: hidden; clip-path: polygon(50% 0, 100% 15%, 100% 55%, 50% 100%, 0 55%, 0 15%); background: color-mix(in oklab, #22c55e 25%, var(--card)); }
.$::before { content: ""; position: absolute; left: 0; right: 0; height: 6px; background: linear-gradient(transparent, #22c55e, transparent); animation: $-scan 2.4s ease-in-out infinite; }
.$::after { content: "✓"; position: absolute; inset: 0; display: grid; place-items: center; font-size: 26px; font-weight: 900; color: #16a34a; animation: $-ok 2.4s infinite; }
@keyframes $-scan { 0% { top: -6px; } 50%, 100% { top: 100%; } }
@keyframes $-ok { 0%, 50% { opacity: 0; transform: scale(.4); } 60%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }`, (l) => glyph("", w(l, "安全", "Secure"))),
  icon("icon-chat", ["消息输入中", "对话气泡里的三个点依次跳动。"], ["Chat Bubble", "Three dots bounce inside a speech bubble."], ["interactive"], "auto",
    `.$ { position: relative; display: flex; gap: 5px; padding: 14px 16px; border-radius: 20px 20px 20px 4px; background: var(--accent); }
.$ i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-fg); animation: $-k 1.2s infinite; }
.$ i:nth-child(2) { animation-delay: .2s; } .$ i:nth-child(3) { animation-delay: .4s; }
@keyframes $-k { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-5px); opacity: 1; } }`, (l) => glyph(times(3, () => "<i></i>"), w(l, "对方正在输入", "Typing"))),
  icon("icon-music-notes", ["跳动音符", "几个音符轮流跳起并飘走。"], ["Dancing Notes", "Music notes take turns hopping up and drifting away."], ["game"], "auto",
    `.$ { position: relative; width: 80px; height: 60px; }
.$ i { position: absolute; bottom: 0; font-style: normal; font-size: 30px; color: var(--accent); animation: $-k 2s ease-in-out infinite; }
.$ i:nth-child(1) { left: 0; } .$ i:nth-child(2) { left: 28px; animation-delay: .4s; color: var(--accent-2); } .$ i:nth-child(3) { left: 54px; animation-delay: .8s; color: var(--accent-3); }
@keyframes $-k { 0%, 100% { transform: translateY(0) rotate(0); opacity: 1; } 40% { transform: translateY(-22px) rotate(-12deg); } 70% { opacity: .6; } }`, (l) => glyph("<i>♪</i><i>♫</i><i>♪</i>", w(l, "音乐", "Music"))),
  icon("icon-cloud-upload", ["上传到云", "箭头从下方飞进云朵，云朵轻轻鼓起。"], ["Cloud Upload", "An arrow flies up into the cloud, which puffs up a little."], ["feedback"], "auto",
    `.$ { position: relative; width: 70px; height: 70px; }
.$::before { content: ""; position: absolute; left: 8px; top: 18px; width: 54px; height: 24px; border-radius: 24px; background: var(--muted); box-shadow: 10px -12px 0 -2px var(--muted), -4px -6px 0 -6px var(--muted); animation: $-puff 1.8s infinite; }
.$ b { position: absolute; left: 50%; bottom: 0; translate: -50% 0; font-size: 24px; font-weight: 900; color: var(--accent); animation: $-k 1.8s ease-in infinite; }
@keyframes $-k { 0% { transform: translateY(10px); opacity: 0; } 30% { opacity: 1; } 70% { transform: translateY(-30px); opacity: 1; } 80%, 100% { transform: translateY(-34px); opacity: 0; } }
@keyframes $-puff { 0%, 70%, 100% { transform: scale(1); } 78% { transform: scale(1.08); } }`, (l) => glyph("<b>↑</b>", w(l, "上传", "Upload"))),
];

