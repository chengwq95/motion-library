import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Library 動態收藏",
  description: "搜尋、篩選和試玩網頁動畫，複製專屬 AI 提示詞。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
