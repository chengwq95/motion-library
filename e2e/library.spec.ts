import { expect, test, type Page } from "@playwright/test";
import { animations } from "../src/lib/animations";
import { COMPONENTS } from "../src/lib/types";

const TOTAL = animations.length;
// Grouped view shows up to 6 per group until expanded.
const GROUPED_VISIBLE = COMPONENTS.reduce((sum, c) => sum + Math.min(6, animations.filter((a) => a.component === c).length), 0);
const cards = (page: Page) => page.locator("main article");
const status = (page: Page) => page.getByText(/^显示 \d+ \/ \d+ 种$|^Showing \d+ of \d+$/);

test("lists every effect in Chinese without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("好看的网页动效");
  await expect(cards(page)).toHaveCount(GROUPED_VISIBLE);
  await expect(status(page)).toHaveText(`显示 ${TOTAL} / ${TOTAL} 种`);
  expect(errors).toEqual([]);
});

test("groups expand and the flat list loads more", async ({ page }) => {
  await page.goto("/");
  const loaders = animations.filter((a) => a.component === "loader").length;
  await page.getByRole("button", { name: `显示全部 ${loaders} 种` }).click();
  await expect(cards(page)).toHaveCount(GROUPED_VISIBLE - 6 + loaders);
  await page.getByRole("button", { name: "收起" }).click();
  await expect(cards(page)).toHaveCount(GROUPED_VISIBLE);

  await page.getByRole("button", { name: "不分组" }).click();
  await expect(cards(page)).toHaveCount(36);
  await page.getByRole("button", { name: /加载更多/ }).click();
  await expect(cards(page)).toHaveCount(72);
});

test("only the selected language is shown", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "动效收藏" }).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Lightning Strike");
  await expect(page.locator("body")).not.toContainText("参考来源");
  await expect(page).toHaveTitle("动效收藏");

  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.getByRole("link", { name: "Motion Library" }).first()).toBeVisible();
  await expect(page.locator("main")).toContainText("Lightning Strike");
  await expect(page.locator("main")).not.toContainText("闪电砸落");
  await expect(page).toHaveTitle("Motion Library");
});

test("search matches both languages and is kept in the URL", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox");

  await search.fill("硬币");
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toContainText("硬币翻转");

  await search.fill("magnetic");
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toContainText("磁吸按钮");
  await expect(page).toHaveURL(/\?q=magnetic$/);

  await page.reload();
  await expect(search).toHaveValue("magnetic");
  await expect(cards(page)).toHaveCount(1);
});

test("filter chips narrow results and a shared link restores them", async ({ page }) => {
  await page.goto("/?c=button&t=hover");
  await expect(cards(page)).toHaveCount(animations.filter((a) => a.component === "button" && a.trigger === "hover").length);
  await expect(page.getByRole("group", { name: "元件" }).getByRole("button", { name: /按钮/ })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "清除筛选" }).first().click();
  await expect(status(page)).toHaveText(`显示 ${TOTAL} / ${TOTAL} 种`);
  await expect(page).toHaveURL(/\/$/);

  await page.getByRole("group", { name: "技术" }).getByRole("button", { name: /GSAP/ }).click();
  await expect(cards(page)).toHaveCount(animations.filter((a) => a.tech === "GSAP").length);
  // Faceted counts: with GSAP selected, "按钮" has no matches and is disabled.
  await expect(page.getByRole("group", { name: "元件" }).getByRole("button", { name: /按钮/ })).toBeDisabled();
});

test("language choice switches the UI and persists", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Beautiful web motion");

  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Beautiful web motion");
  await expect(status(page)).toHaveText(`Showing ${TOTAL} of ${TOTAL}`);
});

test("theme cycles system → light → dark and persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: /切换主题/ });

  await expect(html).toHaveAttribute("data-theme", "light");
  await toggle.click(); // → light
  await toggle.click(); // → dark
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAccessibleName("切换主题（当前：深色）");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("copies the AI prompt in the current language", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const card = cards(page).filter({ hasText: "闪电砸落" });
  await card.getByRole("button", { name: "复制 AI 提示词" }).click();
  await expect(card.getByRole("button", { name: "已复制" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(animations[0].aiPrompt.zh);
});

test("favorites can be filtered and survive a reload", async ({ page }) => {
  await page.goto("/");
  const favoritesOnly = page.getByRole("button", { name: /只看收藏/ });

  await favoritesOnly.click();
  await expect(page.getByText("还没有收藏")).toBeVisible();
  await favoritesOnly.click();

  await page.getByRole("button", { name: "收藏: 视差倾斜" }).click();
  await expect(page.getByRole("button", { name: "取消收藏: 视差倾斜" })).toHaveAttribute("aria-pressed", "true");
  await favoritesOnly.click();
  await expect(cards(page)).toHaveCount(1);
  await expect(page).toHaveURL(/fav=1/);

  await page.reload();
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toContainText("视差倾斜");
});

test("previews only render while on screen", async ({ page }) => {
  await page.goto("/");
  const stages = page.locator("main article > div:first-child");
  await stages.first().scrollIntoViewIfNeeded();
  await expect(stages.first()).not.toHaveAttribute("data-paused");
  await expect(stages.last()).toHaveAttribute("data-paused", "");
  await expect(stages.last().locator("> *")).toHaveCount(1); // just the replay button

  await stages.last().scrollIntoViewIfNeeded();
  await expect(stages.last()).not.toHaveAttribute("data-paused");
  await expect(stages.first()).toHaveAttribute("data-paused", "");
});
