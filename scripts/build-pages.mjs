import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "chengwq95/motion-library").split("/");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repo}`);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${owner.toLowerCase()}.github.io${basePath}`;
const result = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await writeFile("out/.nojekyll", "");
console.log(`GitHub Pages export ready for ${siteUrl}/`);
