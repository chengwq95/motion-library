# Motion Library 動態收藏

以 Next.js、React 和 TypeScript 製作的網頁動畫收藏示範，參考 [Motion Library](https://kittenjam-motion-library.vercel.app/)。

## 本機執行

需要 Node.js 20.9 或更新版本。

```bash
npm ci
npm run dev
```

開啟 http://localhost:3000。正式環境先執行 `npm run build`，再執行 `npm start`。

## 功能

- 8 種動畫：閃電砸落、雷射切斷、硬幣翻轉、爆炸四散、按鈕懸停、卡片進場、滾動揭示、拖曳跟隨。
- 名稱、描述及標籤搜尋，元件、時機、情境及技術交叉篩選。
- 依元件分組或全部顯示、自訂預覽文字、每種動畫的專屬 AI 提示詞複製。
- 投稿表單示範：僅驗證輸入，不送出或保存資料，也未接入檔案上傳。
- 響應式深色介面、鍵盤操作、減少動態偏好支援。

## 檢查

```bash
npm run lint
npm run typecheck
npm run build
```

## 結構與擴充

- `src/app/`：頁面、全域樣式與根版型。
- `src/lib/types.ts`：動畫資料型別及篩選選項。
- `src/lib/animations.ts`：動畫資料及 AI 提示詞。
- `src/components/AnimationRegistry.tsx`：動畫名稱與預覽元件的對應。
- `src/components/previews/`：CSS、GSAP 及 React 動畫示範。

新增動畫時，先建立預覽元件，再加入資料及 Registry 對應。GSAP 用於閃電動畫，其餘使用 CSS、IntersectionObserver 及 Pointer Events。

本專案僅包含上述 8 種示範，未收錄參考站的完整動畫清單。預覽為重新實作，適合個人參考與學習；投稿功能尚需後端服務。
