import type { AnimationItem, Locale } from "./types";

// Turns an HTML + CSS effect into ready-to-run code: React, Vue or a standalone HTML file.
// Everything is wrapped in .fx-stage, which carries the theme variables the CSS relies on,
// so the result works as is. Runs in the browser (uses DOMParser for the JSX conversion).

export const STAGE_CSS = `.fx-stage {
  --page: #fafaf8; --fg: #0f0f12; --muted: #6e6e76; --card: #ffffff; --line: #e8e7e3; --stage: #f3f2ef;
  --accent: #6d5efc; --accent-fg: #ffffff; --accent-2: #e8559b; --accent-3: #f0a03a;
  position: relative; container-type: inline-size; display: grid; place-items: center; overflow: hidden;
  width: 100%; max-width: 560px; aspect-ratio: 16 / 9; border-radius: 16px;
  background: var(--stage); color: var(--fg); font-family: system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
  .fx-stage {
    --page: #08080a; --fg: #f4f4f5; --muted: #8b8b94; --card: #111114; --line: #222228; --stage: #0c0c0f;
    --accent: #9d8cff; --accent-fg: #0b0b0d; --accent-2: #f472b6; --accent-3: #fbbf24;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fx-stage *, .fx-stage *::before, .fx-stage *::after { animation: none !important; transition: none !important; }
}`;

function componentName(item: AnimationItem) {
  const name = item.name.en.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  // Identifiers can't start with a digit ("3D Roll" -> "Effect3DRoll").
  return /^[A-Z]/.test(name) ? name : `Effect${name}`;
}

const fullCss = (item: AnimationItem) => `${STAGE_CSS}\n\n${item.snippet!.css}`;
const indent = (text: string, pad: string) => text.split("\n").map((l) => (l ? pad + l : l)).join("\n");

export function toHtmlFile(item: AnimationItem, locale: Locale) {
  const sample = item.sample[locale];
  return `<!doctype html>
<html lang="${locale === "zh" ? "zh-CN" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${item.name[locale]}</title>
<style>
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #e5e5e5; }
${fullCss(item)}
</style>
</head>
<body>
<div class="fx-stage">
${indent(item.snippet!.html(sample, locale), "  ")}
</div>
</body>
</html>
`;
}

export function toVue(item: AnimationItem, locale: Locale) {
  const sample = item.sample[locale];
  // Plain HTML is valid in a Vue template; swap the sample text for the prop.
  const markup = item.snippet!.html(sample, locale).split(`>${escapeHtml(sample)}<`).join(">{{ text }}<");
  return `<script setup>
defineProps({ text: { type: String, default: ${JSON.stringify(sample)} } });
</script>

<template>
  <div class="fx-stage">
${indent(markup, "    ")}
  </div>
</template>

<style>
${fullCss(item)}
</style>
`;
}

export function toReact(item: AnimationItem, locale: Locale) {
  const sample = item.sample[locale];
  const doc = new DOMParser().parseFromString(`<body>${item.snippet!.html(sample, locale)}</body>`, "text/html");
  const jsx = [...doc.body.childNodes].map((n) => toJsx(n, 3, sample)).join("\n");
  const css = fullCss(item).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  return `// ${componentName(item)}.jsx
const css = \`
${css}
\`;

export default function ${componentName(item)}({ text = ${JSON.stringify(sample)} }) {
  return (
    <div className="fx-stage">
      <style>{css}</style>
${jsx}
    </div>
  );
}
`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const VOID = new Set(["input", "br", "img", "hr"]);
const RENAME: Record<string, string> = { class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", checked: "defaultChecked" };

const camel = (s: string) => s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

function styleObject(style: string) {
  const entries = style.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
    const i = d.indexOf(":");
    const prop = d.slice(0, i).trim();
    return `${prop.startsWith("--") ? JSON.stringify(prop) : camel(prop)}: ${JSON.stringify(d.slice(i + 1).trim())}`;
  });
  return `{{ ${entries.join(", ")} }}`;
}

function toJsx(node: Node, depth: number, sample: string): string {
  const pad = "  ".repeat(depth);
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) return "";
    if (text === sample) return `${pad}{text}`;
    return pad + text.replace(/[{}<>]/g, (c) => `{"${c}"}`);
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as Element;
  const isSvg = el.namespaceURI === "http://www.w3.org/2000/svg";
  const tag = isSvg ? el.tagName : el.localName;
  const attrs = [...el.attributes].map(({ name, value }) => {
    if (name === "style") return `style=${styleObject(value)}`;
    let key = RENAME[name] ?? name;
    if (tag === "input" && name === "value") key = "defaultValue";
    if (isSvg && name.includes("-") && !name.startsWith("aria-") && !name.startsWith("data-")) key = camel(name);
    if (value === "") return key;
    if (value === sample) return `${key}={text}`;
    return `${key}=${JSON.stringify(value)}`;
  });
  const open = `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}`;
  if (VOID.has(tag)) return `${pad}${open} />`;
  const children = [...el.childNodes].map((c) => toJsx(c, depth + 1, sample)).filter(Boolean);
  if (!children.length) return `${pad}${open} />`;
  // Keep short single-text children inline for readability.
  if (children.length === 1 && el.childNodes.length === 1 && el.firstChild?.nodeType === Node.TEXT_NODE) return `${pad}${open}>${children[0].trim()}</${tag}>`;
  return `${pad}${open}>\n${children.join("\n")}\n${pad}</${tag}>`;
}
