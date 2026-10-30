// Bundles the site into one self-contained HTML file that opens without a server.
// Run after `next build`, which produces the compiled Tailwind CSS reused here.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const outFile = path.join(root, "standalone/motion-library.html");

const chunksDir = path.join(root, ".next/static/chunks");
const cssFiles = (await readdir(chunksDir).catch(() => [])).filter((f) => f.endsWith(".css"));
if (cssFiles.length === 0) throw new Error("No compiled CSS found. Run `npm run build` first.");
const css = (await Promise.all(cssFiles.map((f) => readFile(path.join(chunksDir, f), "utf8")))).join("\n");

// Preview sources for the detail pages, keyed by effect id.
const animationsSrc = await readFile(path.join(root, "src/lib/animations.ts"), "utf8");
const entries = [...animationsSrc.matchAll(/id: "([\w-]+)",[\s\S]*?previewComponent: "(\w+)"/g)];
const sources = Object.fromEntries(await Promise.all(entries.map(async ([, id, component]) =>
  [id, await readFile(path.join(root, "src/components/previews", `${component}.tsx`), "utf8")])));

const result = await build({
  entryPoints: [path.join(root, "scripts/standalone/main.tsx")],
  bundle: true,
  minify: process.env.MINIFY !== "0",
  write: false,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  legalComments: "none",
  logLevel: "error",
  alias: { "next/link": path.join(root, "scripts/standalone/link.tsx") },
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [{
    name: "virtual-sources",
    setup(b) {
      b.onResolve({ filter: /^virtual:sources$/ }, () => ({ path: "sources", namespace: "virtual" }));
      b.onLoad({ filter: /.*/, namespace: "virtual" }, () => ({ contents: JSON.stringify(sources), loader: "json" }));
    },
  }],
});
const js = result.outputFiles[0].text;

const layout = await readFile(path.join(root, "src/app/layout.tsx"), "utf8");
const initPrefs = /const initPrefs = `([^`]+)`/.exec(layout)[1];
const icon = await readFile(path.join(root, "src/app/icon.svg"), "utf8");

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Motion Library 动效收藏</title>
<meta name="description" content="搜索、筛选和试玩网页动效，一键复制 AI 提示词。">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon.trim())}">
<script>${initPrefs}</script>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js.replace(/<\/script/gi, "<\\/script")}</script>
</body>
</html>
`;

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, html);
console.log(`Wrote ${path.relative(root, outFile)} (${(html.length / 1024).toFixed(0)} KB, ${entries.length} effects)`);
