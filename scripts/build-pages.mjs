import { spawnSync } from "node:child_process";
import { readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "chengwq95/motion-library").split("/");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repo}`);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${owner.toLowerCase()}.github.io${basePath}`;
const result = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
// GitHub Pages infers MIME types from extensions. Give generated social cards
// a .png filename and update every exported HTML / RSC metadata reference.
async function prepareStaticImages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await prepareStaticImages(file);
    else if (entry.name === "opengraph-image") await rename(file, `${file}.png`);
    else if (/\.(html|txt)$/.test(entry.name)) {
      const original = await readFile(file, "utf8");
      const updated = original.replace(/\/opengraph-image(?=[?"\\])/g, "/opengraph-image.png");
      if (updated !== original) await writeFile(file, updated);
    }
  }
}
await prepareStaticImages("out");
await writeFile("out/.nojekyll", "");
console.log(`GitHub Pages export ready for ${siteUrl}/`);
