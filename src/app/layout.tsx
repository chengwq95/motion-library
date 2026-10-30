import type { Metadata, Viewport } from "next";
import AppToaster from "@/components/AppToaster";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const description = "搜索、筛选和试玩网页动效，一键复制 AI 提示词。Browse, filter and play with web animations, and copy AI prompts.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Motion Library 动效收藏",
  description,
  openGraph: { siteName: "Motion Library", type: "website", locale: "zh_CN", alternateLocale: ["en_US"], description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e11" },
  ],
};

// Runs before paint so the saved theme and language apply without a flash.
const initPrefs = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("locale");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t;if(l!=="zh"&&l!=="en")l=/^zh/i.test(navigator.language)?"zh":"en";d.lang=l==="zh"?"zh-CN":"en"}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initPrefs }} />
      </head>
      <body>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
