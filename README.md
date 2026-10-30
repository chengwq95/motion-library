# Motion Library 动效收藏

用 Next.js、React 和 TypeScript 制作的网页动效收藏：可以搜索、筛选和试玩网页动效，并一键复制 AI 提示词。

## 本地运行

需要 Node.js 20.9 或更新版本。

```bash
npm ci
npm run dev
```

打开 http://localhost:3000。生产环境先运行 `npm run build`，再运行 `npm start`。

部署时请设置环境变量 `NEXT_PUBLIC_SITE_URL`（例如 `https://example.com`），分享预览图和 sitemap 会用到网站的完整网址；部署在 Vercel 上时会自动使用 Vercel 的正式网址。

## 单文件 HTML

`standalone/motion-library.html` 是整个网站打包成的单个 HTML 文件，双击就能在浏览器打开，不需要服务器或网络，功能和网站相同（详情页用 `#/effects/<id>` 的网址）。修改代码后重新生成：

```bash
npm run build:html
```

## 功能

- 15 种动效：闪电砸落、激光切断、硬币翻转、爆炸四散、打字机、无限跑马灯、流光文字、按钮悬停、磁吸按钮、点击波纹、卡片进场、滚动显现、视差倾斜、拖拽跟随、光标聚光灯。
- 每个动效都有详情页（`/effects/<id>`）：大尺寸预览、AI 提示词、预览源代码、上一个/下一个和相关动效。
- 简体中文 / English 切换，AI 提示词也有中英两版；首次访问按浏览器语言自动选择。
- 浅色 / 深色 / 跟随系统三种主题，选择会记住，加载时不闪烁。
- 双语搜索，按元件、时机、情境、技术交叉筛选，筛选按钮显示联动数量。
- 筛选条件同步到网址，复制链接就能分享同样的结果，例如 `/?c=button&t=hover`。
- 收藏：点卡片上的星标收藏动效，可以只看收藏；收藏保存在浏览器里。
- 滚出屏幕的预览会自动暂停，节省电量。
- 分享到社交平台时显示预览图（Open Graph），并提供 sitemap 和 robots.txt。
- 键盘：按 `/` 聚焦搜索，`Esc` 清空搜索；尊重系统的“减少动态效果”设置。
- 投稿表单示范：只做输入校验，不提交或保存数据。

## 检查与测试

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

`test:e2e` 用 Playwright 跑浏览器测试（会先自动构建）。第一次运行前需要安装浏览器：

```bash
npx playwright install chromium
```

推送到 `main` 或提交 Pull Request 时，GitHub Actions 会自动运行以上全部检查。

## 结构与扩展

- `src/app/`：首页、动效详情页（`effects/[id]`）、全局样式（主题颜色变量）、网站图标、分享预览图、sitemap 和 robots。
- `src/lib/animations.ts`：动效数据、默认预览文字及中英文 AI 提示词。
- `src/lib/dict.ts`：界面文案（中英文）；`i18n.ts` 提供 `useI18n`。
- `src/lib/prefs.ts`：主题、语言与收藏；`query.ts`：筛选条件与网址的互相转换。
- `src/components/`：顶栏、筛选、卡片、详情页等组件；`previews/` 为各动效预览。
- `e2e/`：Playwright 浏览器测试。
- `scripts/`：单文件 HTML 的打包脚本。

新增动效时，先在 `src/components/previews/` 建立预览组件，再把它加入 `AnimationRegistry.tsx`，最后在 `animations.ts` 补上中英文资料，详情页和分享图会自动生成。颜色请使用 `bg-page`、`bg-card`、`text-fg`、`text-muted`、`border-line`、`bg-stage`、`bg-accent` 等主题变量，深浅色会自动适配；会循环播放的 JS 动画请读取 `paused` 属性，在不可见时暂停。

预览为重新实现，适合个人参考与学习；投稿功能还需要后端服务。
