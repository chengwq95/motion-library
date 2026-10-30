import { expect, test } from "@playwright/test";
import { animations } from "../src/lib/animations";

test("opens an effect's detail page from its card", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "查看详情: 打字机" }).click();
  await expect(page).toHaveURL(/\/effects\/typewriter$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("打字机");
  await expect(page.getByText("Typewriter.tsx")).toBeVisible();
  await expect(page.locator("pre code")).toContainText("export default function Typewriter");
  await expect(page.getByRole("heading", { name: "相关动效" })).toBeVisible();
});

test("copies the preview source", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/effects/marquee");
  await page.getByRole("button", { name: "复制代码" }).click();
  await expect(page.getByRole("button", { name: "已复制" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("export default function Marquee");
});

test("snippet effects show their HTML and CSS", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/effects/like-burst");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("点赞爆开");
  await expect(page.getByText("HTML + CSS")).toBeVisible();
  await expect(page.locator("pre code")).toContainText(".fx-like-burst");
  await page.getByRole("button", { name: "复制 AI 提示词" }).first().click();
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toContain("点赞爆开");
  expect(prompt).toContain("@keyframes fx-like-burst");

  // The preview reacts to clicks (checkbox toggle).
  const heart = page.locator(".fx-like-burst").first();
  await heart.click();
  await expect(heart.locator("input")).toBeChecked();
});

test("previous and next wrap around the list", async ({ page }) => {
  const first = animations[0];
  const last = animations[animations.length - 1];
  await page.goto(`/effects/${first.id}`);
  await page.getByRole("link", { name: new RegExp(`上一个\\s*${last.name.zh}`) }).click();
  await expect(page).toHaveURL(new RegExp(`/effects/${last.id}$`));
  await page.getByRole("link", { name: new RegExp(`下一个\\s*${first.name.zh}`) }).click();
  await expect(page).toHaveURL(new RegExp(`/effects/${first.id}$`));
});

test("unknown effects return 404", async ({ request }) => {
  expect((await request.get("/effects/does-not-exist")).status()).toBe(404);
});

test("share images, sitemap and metadata are served", async ({ page, request }) => {
  const og = await request.get("/effects/tilt/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const a of animations) expect(sitemap).toContain(`/effects/${a.id}`);

  await page.goto("/effects/tilt");
  await expect(page).toHaveTitle("视差倾斜 · 动效收藏");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/effects\/tilt\/opengraph-image/);
});

test("surprise me and keyboard shortcuts work from a detail page", async ({ page }) => {
  const [first, second] = animations;
  await page.goto(`/effects/${first.id}`);
  // Wait for hydration: the live preview only renders on the client.
  await expect(page.locator("main [data-paused], main .group\\/stage").first().locator("> *")).toHaveCount(2);

  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(new RegExp(`/effects/${second.id}$`));
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(new RegExp(`/effects/${first.id}$`));

  // The top bar button is on every page and never picks the current effect.
  await page.getByRole("banner").or(page.locator("nav").first()).getByRole("button", { name: "随机来一个" }).first().click();
  await expect(page).not.toHaveURL(new RegExp(`/effects/${first.id}$`));
  await expect(page).toHaveURL(/\/effects\/[\w-]+$/);

  const url = page.url();
  await page.keyboard.press("r");
  await expect(page).not.toHaveURL(url);
});
