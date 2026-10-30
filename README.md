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

- 500 种动效，分为文字、按钮、卡片、导航、表单控件、加载、背景、图标、数据、光标十类。
- 只显示当前选择的语言（简体中文或 English），切换后界面、动效名称、网页标题一起改变。
- 每个动效都有详情页（`/effects/<id>`）：大尺寸预览、AI 提示词、源代码、上一个/下一个和相关动效。大部分动效只用 HTML + CSS 实现，AI 提示词里直接附上可运行的代码。
- AI 提示词也有中英两版；首次访问按浏览器语言自动选择语言。
- 浅色 / 深色 / 跟随系统三种主题，选择会记住，加载时不闪烁。
- 双语搜索，按元件、时机、情境、技术交叉筛选，筛选按钮显示联动数量。
- 筛选条件同步到网址，复制链接就能分享同样的结果，例如 `/?c=button&t=hover`。
- 收藏：点卡片上的星标收藏动效，可以只看收藏；收藏保存在浏览器里。
- 只渲染屏幕上看得到的预览；按元件分组时每组先显示 6 个，不分组时每次加载 36 个。
- 分享到社交平台时显示预览图（Open Graph），并提供 sitemap 和 robots.txt。
- 键盘：按 `/` 聚焦搜索，`Esc` 清空搜索；尊重系统的“减少动态效果”设置。

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
- `src/lib/animations.ts`：用 React 组件实现的动效，并汇总全部动效。
- `src/lib/effects/`：HTML + CSS 动效，按类别分文件（`text.ts`、`buttons.ts`、`loaders.ts` 等）；`helpers.ts` 负责作用域、逐字拆分和生成 AI 提示词。
- `src/lib/dict.ts`：界面文案（中英文）；`i18n.ts` 提供 `useI18n`。
- `src/lib/prefs.ts`：主题、语言与收藏；`query.ts`：筛选条件与网址的互相转换。
- `src/components/`：顶栏、筛选、卡片、详情页等组件；`previews/` 为各动效预览。
- `e2e/`：Playwright 浏览器测试。
- `scripts/`：单文件 HTML 的打包脚本。

新增动效有两种方式：

- **HTML + CSS（推荐）**：在 `src/lib/effects/` 对应类别的文件里加一项，写上中英文名称和描述、分类、CSS 和 HTML。CSS 里用 `.$` 表示动效的根元素、`$-名称` 表示 keyframes，会自动替换成不重复的名字。
- **React 组件**：在 `src/components/previews/` 建立组件，加入 `AnimationRegistry.tsx`，再在 `animations.ts` 补上资料。

详情页、AI 提示词和分享图都会自动生成。颜色请使用 `bg-page`、`bg-card`、`text-fg`、`text-muted`、`border-line`、`bg-stage`、`bg-accent` 等主题变量，深浅色会自动适配；会循环播放的 JS 动画请读取 `paused` 属性，在不可见时暂停。

