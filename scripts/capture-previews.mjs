// Screenshots every effect's preview into public/previews/<id>.jpg; the share images use them.
// Usage: npm run build && npm run capture   (add --force to redo existing shots)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/previews");
const force = process.argv.includes("--force");
const PORT = 3199;
const base = `http://localhost:${PORT}`;

mkdirSync(outDir, { recursive: true });
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: root, stdio: "ignore" });
const stop = () => server.kill();
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start. Run `npm run build` first.");
}

await waitForServer();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const ids = [...sitemap.matchAll(/\/effects\/([\w-]+)</g)].map((m) => m[1]).filter((id) => force || !existsSync(path.join(outDir, `${id}.jpg`)));
console.log(`Capturing ${ids.length} previews…`);

const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: "dark", locale: "en-US", viewport: { width: 520, height: 900 }, deviceScaleFactor: 1 });
let done = 0;

async function worker(queue) {
  const page = await context.newPage();
  for (let id = queue.shift(); id; id = queue.shift()) {
    await page.goto(`${base}/effects/${id}`);
    const stage = page.locator("main .group\\/stage").first();
    await stage.locator("[data-preview] > *").first().waitFor({ timeout: 10_000 }).catch(() => {});
    await page.mouse.move(0, 0);
    await page.waitForTimeout(1400); // let the animation (or auto demo) get going
    await stage.screenshot({ path: path.join(outDir, `${id}.jpg`), type: "jpeg", quality: 72 });
    if (++done % 50 === 0) console.log(`  ${done} / ${ids.length}`);
  }
  await page.close();
}

const queue = [...ids];
await Promise.all(Array.from({ length: 4 }, () => worker(queue)));
await browser.close();
stop();
console.log(`Done: ${done} previews in public/previews`);
