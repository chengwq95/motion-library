import type { AnimationItem, ComponentKind, ContextKind, Locale, Localized, TechKind, TriggerKind } from "../types";

// HTML + CSS effects ("snippets"). Each one is written with `$` standing for its
// own scope: `.$` is the root class and `$-name` a keyframes name. They are
// replaced with `fx-<id>` so snippets never clash with each other.

export interface SnippetDef {
  id: string;
  /** [name, description] */
  zh: [string, string];
  en: [string, string];
  c: ComponentKind;
  t: TriggerKind;
  m: ContextKind[];
  tech?: TechKind;
  css: string;
  /** Markup; `text` is raw (escape it with esc/chars), `l` picks words for extra labels. */
  html: (text: string, l: Locale) => string;
  sample?: Localized;
  tags?: string[];
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", $: "&#36;" };
export const esc = (s: string) => s.replace(/[&<>"'$]/g, (c) => ESCAPES[c]);

/** Picks the word for the current language. */
export const w = (l: Locale, zh: string, en: string) => (l === "zh" ? zh : en);

/** One span per character with stagger variables: --i index, --r reversed, --d distance from center, --s shuffled, --p parity. */
export function chars(text: string, cls = "c") {
  const list = Array.from(text);
  const n = list.length;
  return list
    .map((ch, i) => {
      const vars = `--i:${i};--r:${n - 1 - i};--d:${Math.abs(i - (n - 1) / 2)};--s:${(i * 7 + 3) % n};--p:${i % 2}`;
      return `<span class="${cls}" style="${vars}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`;
    })
    .join("");
}

/** Deterministic pseudo-random number in [0, 1) so server and client render the same markup. */
export function rnd(i: number, seed = 1) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** n copies of a template, e.g. particles or loader dots. */
export const times = (n: number, fn: (i: number) => string) => Array.from({ length: n }, (_, i) => fn(i)).join("");
/** n values joined with commas, e.g. stacked shadows. */
export const list = (n: number, fn: (i: number) => string) => Array.from({ length: n }, (_, i) => fn(i)).join(", ");

/** CSS for effects that animate each character with the same keyframes. */
export function charCss(keyframes: string, o: { dur?: string; ease?: string; by?: "i" | "r" | "d" | "s"; step?: string; char?: string; root?: string } = {}) {
  const { dur = "1.8s", ease = "ease-in-out", by = "i", step = "0.08s", char = "", root = "" } = o;
  return `.$ { display: flex; font-weight: 900; font-size: 13cqw; line-height: 1.1; color: var(--fg); white-space: pre; ${root} }
.$ .c { display: inline-block; animation: $-k ${dur} ${ease} infinite both; animation-delay: calc(var(--${by}) * ${step}); ${char} }
@keyframes $-k { ${keyframes} }`;
}
export const charHtml = (text: string) => `<div class="$">${chars(text)}</div>`;

const SAMPLES: Partial<Record<ComponentKind, Localized[]>> = {
  text: [
    { zh: "动效", en: "MOTION" }, { zh: "灵感", en: "SPARK" }, { zh: "你好", en: "HELLO" },
    { zh: "心动", en: "VIBES" }, { zh: "闪耀", en: "SHINE" }, { zh: "未来", en: "FUTURE" },
  ],
  button: [
    { zh: "立即开始", en: "Get started" }, { zh: "了解更多", en: "Learn more" }, { zh: "提交", en: "Submit" },
    { zh: "下载", en: "Download" }, { zh: "订阅", en: "Subscribe" }, { zh: "加入我们", en: "Join us" },
  ],
  nav: [{ zh: "首页", en: "Home" }],
  control: [{ zh: "邮箱", en: "Email" }],
  loader: [{ zh: "加载中", en: "Loading" }],
  background: [{ zh: "你好，世界", en: "Hello, world" }, { zh: "新的开始", en: "Fresh start" }, { zh: "灵感无限", en: "Dream big" }],
  card: [{ zh: "动效卡片", en: "Motion card" }, { zh: "精选作品", en: "Featured" }],
  icon: [{ zh: "图标", en: "Icon" }],
  data: [{ zh: "完成度", en: "Progress" }],
};

function hash(s: string) {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function prompt(def: SnippetDef, css: string, html: (t: string, l: Locale) => string, sample: Localized): Localized {
  const code = (l: Locale) => `HTML:\n${html(sample[l], l)}\n\nCSS:\n${css}`;
  return {
    zh: `实现「${def.zh[0]}」效果：${def.zh[1]}\n\n下面是可以直接参考的 HTML 与 CSS。颜色使用 CSS 变量（--fg 文字色、--page 页面底色、--card 卡片底色、--line 边框色、--muted 次要文字色、--stage 舞台底色、--accent 强调色、--accent-fg 强调色上的文字），请换成项目的配色；外层容器设置 container-type: inline-size，字号用 cqw 随容器缩放。另外加上 @media (prefers-reduced-motion: reduce) 停用动画。\n\n${code("zh")}`,
    en: `Build the “${def.en[0]}” effect: ${def.en[1]}\n\nHere is reference HTML and CSS you can use directly. Colors are CSS variables (--fg text, --page page background, --card card background, --line borders, --muted secondary text, --stage stage background, --accent accent, --accent-fg text on accent); map them to your palette. The wrapper uses container-type: inline-size so cqw font sizes scale with it. Also disable the animation under @media (prefers-reduced-motion: reduce).\n\n${code("en")}`,
  };
}

export function fromSnippet(def: SnippetDef): AnimationItem {
  const scope = `fx-${def.id}`;
  const css = def.css.replaceAll("$", scope).trim();
  const html = (t: string, l: Locale) => def.html(t, l).replaceAll("$", scope);
  const pool = SAMPLES[def.c] ?? [{ zh: "动效", en: "Motion" }];
  const sample = def.sample ?? pool[hash(def.id) % pool.length];
  return {
    id: def.id,
    name: { zh: def.zh[0], en: def.en[0] },
    description: { zh: def.zh[1], en: def.en[1] },
    sample,
    component: def.c,
    trigger: def.t,
    contexts: def.m,
    tech: def.tech ?? "CSS",
    tags: def.tags ?? [],
    snippet: { css, html },
    aiPrompt: prompt(def, css, html, sample),
  };
}
