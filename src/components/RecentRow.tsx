"use client";

import Link from "next/link";
import { History, X } from "lucide-react";
import PreviewStage from "@/components/PreviewStage";
import { animations } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";
import { clearRecent, useRecent } from "@/lib/prefs";

/** The effects you opened most recently, so a good one found while shuffling isn't lost. */
export default function RecentRow() {
  const { t, locale } = useI18n();
  const items = useRecent().map((id) => animations.find((a) => a.id === id)).filter((a) => a !== undefined);
  if (!items.length) return null;

  return (
    <section aria-label={t.recent} className="max-w-[1200px] mx-auto px-4 pt-20 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <History className="h-4 w-4 text-accent" />
          {t.recent}
          <span className="font-mono text-sm font-normal text-muted">{items.length}</span>
        </h2>
        <button type="button" onClick={clearRecent} className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-fg">
          <X className="h-3.5 w-3.5" />
          {t.clearRecent}
        </button>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0">
        {items.map((item) => (
          <Link key={item.id} href={`/effects/${item.id}`} className="group w-[260px] shrink-0">
            <PreviewStage bare item={item} text={item.sample[locale]} className="pointer-events-none h-[160px] overflow-hidden rounded-2xl border border-line transition group-hover:border-accent/50" />
            <p className="mt-2 truncate px-1 text-[13px] text-muted transition-colors group-hover:text-fg">{item.name[locale]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
