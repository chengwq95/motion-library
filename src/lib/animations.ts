import type { AnimationItem } from "./types";

export const animations: AnimationItem[] = [
  {
    "id": "lightning",
    "number": "001",
    "name": "閃電砸落",
    "nameEn": "Lightning Strike",
    "description": "文字隨閃電快速落下，搭配短暫閃光。",
    "component": "文字",
    "trigger": "自動",
    "contexts": [
      "衝擊",
      "科技"
    ],
    "tech": "GSAP",
    "tags": [
      "閃電",
      "Lightning"
    ],
    "previewComponent": "LightningStrike",
    "aiPrompt": "用 React 和 GSAP 建立深色舞台的文字閃電動畫：文字從上方 40px 落下，透明度由 0 到 1，加入短暫發光與微幅震動，停留後循環播放。以 gsap.context 清理時間軸，並尊重 prefers-reduced-motion。"
  },
  {
    "id": "laser",
    "number": "002",
    "name": "雷射切斷",
    "nameEn": "Laser Cut",
    "description": "紅色雷射劃過文字，上下兩半略微錯開。",
    "component": "文字",
    "trigger": "自動",
    "contexts": [
      "科技",
      "衝擊"
    ],
    "tech": "CSS",
    "tags": [
      "雷射",
      "切斷",
      "Laser"
    ],
    "previewComponent": "LaserCut",
    "aiPrompt": "用 React 和 CSS 製作白底黑字的雷射切斷效果。用兩份文字與 clip-path 分別顯示上下半部，讓紅色 2px 雷射水平掃過，再將下半部向下位移 4px。舞台使用 container-type: inline-size，字級隨舞台寬度縮放，提供減少動態版本。"
  },
  {
    "id": "coin",
    "number": "003",
    "name": "硬幣翻轉",
    "nameEn": "Coin Flip",
    "description": "每個字依序沿 Y 軸翻轉，如同硬幣翻面。",
    "component": "文字",
    "trigger": "自動",
    "contexts": [
      "遊戲"
    ],
    "tech": "CSS",
    "tags": [
      "翻牌",
      "硬幣",
      "Flip"
    ],
    "previewComponent": "CoinFlip",
    "aiPrompt": "以 React 拆分文字字元，使用 CSS rotateY 在 0 到 180 度間來回翻轉。每個字延遲 100ms，單次循環 1.2 秒，父層加入 1000px perspective。米白背景、粗黑文字，字級相對舞台寬度，支援自訂文字及減少動態偏好。"
  },
  {
    "id": "explode",
    "number": "004",
    "name": "爆炸四散",
    "nameEn": "Explode Out",
    "description": "字元向不同方向飛散後重新聚合。",
    "component": "文字",
    "trigger": "自動",
    "contexts": [
      "衝擊"
    ],
    "tech": "CSS",
    "tags": [
      "爆炸",
      "Explode"
    ],
    "previewComponent": "ExplodeOut",
    "aiPrompt": "製作深色背景、白色粗體的字元爆炸效果。依照字元索引計算穩定的飛散方向與旋轉角度，使用 CSS 自訂屬性傳入動畫，讓字元位移、旋轉、縮小並淡出後重現。不要在 render 中用 Math.random，避免 SSR hydration 不一致，尊重 prefers-reduced-motion。"
  },
  {
    "id": "button",
    "number": "005",
    "name": "按鈕懸停",
    "nameEn": "Button Hover",
    "description": "滑鼠懸停放大，按下時輕微縮小。",
    "component": "按鈕",
    "trigger": "懸停",
    "contexts": [
      "互動"
    ],
    "tech": "CSS",
    "tags": [
      "按鈕",
      "Hover",
      "Bounce"
    ],
    "previewComponent": "ButtonHover",
    "aiPrompt": "用 React 和 Tailwind CSS 建立深色舞台上的白色圓角按鈕。懸停或鍵盤聚焦時放大到 1.05 倍，按下時縮小到 0.95 倍，過渡 200ms。保留清楚的 focus-visible 外框，文字可自訂，減少動態模式停用縮放。"
  },
  {
    "id": "card",
    "number": "006",
    "name": "卡片進場",
    "nameEn": "Card Entrance",
    "description": "卡片由下方滑入並漸顯，點擊可重播。",
    "component": "卡片・群組",
    "trigger": "進場",
    "contexts": [
      "內容展示"
    ],
    "tech": "CSS",
    "tags": [
      "卡片",
      "進場"
    ],
    "previewComponent": "CardEntrance",
    "aiPrompt": "用 React 和 CSS 做卡片進場預覽：灰色圓角卡片由下方 20px 移到原位，透明度由 0 到 1，時間 500ms，ease-out。使用按鈕包覆舞台以支援滑鼠與鍵盤重播，自訂文字顯示在卡片內，並提供 reduced-motion 靜態版本。"
  },
  {
    "id": "scroll",
    "number": "007",
    "name": "滾動揭示",
    "nameEn": "Scroll Reveal",
    "description": "捲動到舞台時，內容由下方淡入。",
    "component": "卡片・群組",
    "trigger": "捲動",
    "contexts": [
      "內容展示"
    ],
    "tech": "CSS",
    "tags": [
      "捲動",
      "Scroll",
      "Reveal"
    ],
    "previewComponent": "ScrollReveal",
    "aiPrompt": "在 React 元件以 IntersectionObserver 監測舞台，進入可視範圍時顯示內容，離開時重設。用 CSS transition 讓內容由 translateY(24px) 與 opacity:0 移至原位，持續 600ms。effect 中斷開 observer，尊重 prefers-reduced-motion。"
  },
  {
    "id": "drag",
    "number": "008",
    "name": "拖曳跟隨",
    "nameEn": "Drag Follow",
    "description": "按住圓形標籤，在舞台內拖曳。",
    "component": "游標",
    "trigger": "拖曳",
    "contexts": [
      "互動",
      "遊戲"
    ],
    "tech": "React",
    "tags": [
      "拖曳",
      "Drag",
      "Follow"
    ],
    "previewComponent": "DragFollow",
    "aiPrompt": "以 React Pointer Events 做可拖曳標籤。pointerdown 時 setPointerCapture，記錄起始位置，pointermove 更新位移並限制在舞台邊界，pointerup 或 pointercancel 時釋放。支援滑鼠、觸控，以及方向鍵移動。舞台 touch-action:none，標籤文字可自訂。"
  }
];
