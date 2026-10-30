"use client";

import { useI18n } from "@/lib/i18n";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-3 px-4 py-8 text-xs leading-relaxed text-muted sm:flex-row sm:justify-between sm:px-6">
        <p className="max-w-xl">{t.footerNote}</p>
        <p className="flex flex-wrap gap-x-3 gap-y-1 sm:pr-16">
          <span>{t.sources}:</span>
          <a href="https://www.threads.com/@ai_yunon_ai/post/DeeJRUjkXlM" target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-fg hover:underline">@ai_yunon_ai</a>
          <a href="https://www.threads.com/@ai_tjb/post/DeeHoA3ktZ5" target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-fg hover:underline">@ai_tjb</a>
        </p>
      </div>
    </footer>
  );
}
