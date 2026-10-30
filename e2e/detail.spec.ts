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
  await expect(page).toHaveTitle("视差倾斜 Parallax Tilt · Motion Library");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/effects\/tilt\/opengraph-image/);
});
