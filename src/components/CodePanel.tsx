"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { useCopy } from "@/hooks/useCopy";
import { toHtmlFile, toReact, toVue } from "@/lib/exporters";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

type Tab = "prompt" | "html" | "css" | "react" | "vue" | "file";

/** One tab per format, so the prompt and each kind of code are shown (and copied) separately. */
export default function CodePanel({ item, source }: { item: AnimationItem; source?: string }) {
  const { t, locale } = useI18n();
  const { copied, copy } = useCopy();
  const tabs: Tab[] = item.snippet ? ["prompt", "html", "css", "react", "vue", "file"] : ["prompt", "react"];
  const [tab, setTab] = useState<Tab>("prompt");

  // Computed on demand: the React conversion needs the browser's DOMParser.
  const content = (() => {
    const sample = item.sample[locale];
    switch (tab) {
      case "prompt": return item.aiPrompt[locale];
      case "html": return item.snippet!.html(sample, locale);
      case "css": return item.snippet!.css;
      case "react": return item.snippet ? toReact(item, locale) : source ?? "";
      case "vue": return toVue(item, locale);
      case "file": return toHtmlFile(item, locale);
    }
  })();
  const label = t.codeTabs[tab];
  const fileName = { react: `${item.id}.jsx`, vue: `${item.id}.vue`, file: `${item.id}.html` }[tab as "react" | "vue" | "file"];

  const download = () => {
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: fileName });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="overflow-hidden rounded-[22px] border border-line bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2.5">
        <div role="tablist" aria-label={t.sourceTitle} className="-mx-1 flex flex-1 gap-1 overflow-x-auto px-1 [scrollbar-width:none]">
          {tabs.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-fg aria-selected:bg-fg aria-selected:text-page focus-visible:outline-2 focus-visible:outline-accent"
            >
              {t.codeTabs[k]}
            </button>
          ))}
        </div>
        {fileName && (tab !== "react" || item.snippet) && (
          <button type="button" onClick={download} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:border-fg hover:bg-fg hover:text-page">
            <Download className="h-3.5 w-3.5" />
            {t.download}
          </button>
        )}
        <button
          type="button"
          onClick={() => copy(content, t.tabCopied(label))}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
            copied ? "border-accent bg-accent text-accent-fg" : "border-line hover:border-fg hover:bg-fg hover:text-page"
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t.copied : t.copyTab(label)}
        </button>
      </div>
      {item.snippet && ["react", "vue", "file"].includes(tab) && <p className="border-b border-line px-5 py-2.5 text-xs text-muted">{t.exportNote}</p>}
      <pre role="tabpanel" className={`max-h-[520px] overflow-auto bg-stage p-5 text-[13px] leading-relaxed ${tab === "prompt" ? "whitespace-pre-wrap break-words font-sans" : "font-mono"}`}>
        <code className="[font-family:inherit]">{content}</code>
      </pre>
    </section>
  );
}
