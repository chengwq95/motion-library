# Motion Library 动效收藏

用 Next.js、React 和 TypeScript 制作的网页动效收藏示范，参考 [Motion Library](https://kittenjam-motion-library.vercel.app/)。

## 本地运行

需要 Node.js 20.9 或更新版本。

```bash
npm ci
npm run dev
```

打开 http://localhost:3000。生产环境先运行 `npm run build`，再运行 `npm start`。

## 功能

- 8 种动效：闪电砸落、激光切断、硬币翻转、爆炸四散、按钮悬停、卡片进场、滚动显现、拖拽跟随。
- 简体中文 / English 切换，AI 提示词也有中英两版；首次访问按浏览器语言自动选择。
- 浅色 / 深色 / 跟随系统三种主题，选择会记住，加载时不闪烁。
- 双语搜索（名称、描述、标签），按元件、时机、情境、技术交叉筛选，筛选按钮显示联动数量。
- 按元件分组或不分组、自定义预览文字、每张卡片可重播动画、一键复制 AI 提示词。
- 键盘：按 `/` 聚焦搜索，`Esc` 清空搜索；尊重系统的“减少动态效果”设置。
- 投稿表单示范：只做输入校验，不提交或保存数据。

## 检查

```bash
npm run lint
npm run typecheck
npm run build
```

## 结构与扩展

- `src/app/`：页面、全局样式（主题颜色变量）、根布局与网站图标。
- `src/lib/types.ts`：动效数据类型和筛选选项。
- `src/lib/animations.ts`：动效数据、默认预览文字及中英文 AI 提示词。
- `src/lib/i18n.ts`：界面文案（中英文）。
- `src/lib/prefs.ts`：主题与语言偏好。
- `src/components/`：顶栏、筛选、卡片、投稿弹窗；`previews/` 为各动效预览。

新增动效时，先在 `src/components/previews/` 建立预览组件，再把它加入 `AnimationRegistry.tsx`，最后在 `animations.ts` 补上中英文资料。颜色请使用 `bg-page`、`bg-card`、`text-fg`、`text-muted`、`border-line`、`bg-stage`、`bg-accent` 等主题变量，深浅色会自动适配。

本项目只包含上述 8 种示范，未收录参考站的完整动效清单。预览为重新实现，适合个人参考与学习；投稿功能还需要后端服务。
