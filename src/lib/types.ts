export const COMPONENTS = ["全部元件", "文字", "按鈕", "卡片・群組", "游標"];
export const TRIGGERS = ["全部時機", "自動", "懸停", "進場", "捲動", "拖曳"];
export const CONTEXTS = ["全部情境", "衝擊", "科技", "遊戲", "互動", "內容展示"];
export const TECHS = ["全部技術", "CSS", "GSAP", "React"];

export interface PreviewProps { text?: string }
export interface AnimationItem {
  id: string;
  number: string;
  name: string;
  nameEn: string;
  description: string;
  component: string;
  trigger: string;
  contexts: string[];
  tech: string;
  tags: string[];
  previewComponent: string;
  aiPrompt: string;
}
