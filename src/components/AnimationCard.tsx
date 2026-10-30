"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import PreviewStage from "@/components/PreviewStage";
import TagList from "@/components/TagList";
import { useCopy } from "@/hooks/useCopy";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

export default function AnimationCard({ item, previewText }: { item: AnimationItem; previewText: string }) {
  const { t, locale } = useI18n();
  const { copied, copy } = useCopy();
  const href = `/effects/${item.id}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-card transition duration-300 hover:-translate-y-0.5 hover:border-fg/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
      <PreviewStage item={item} text={previewText || item.sample[locale]} className="h-[200px] border-b border-line" />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 font-semibold leading-snug">
            <Link href={href} className="transition-colors hover:text-accent">{item.name[locale]}</Link>
          </h3>
          <FavoriteButton id={item.id} label={item.name[locale]} className="-mr-1.5 -mt-1" />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description[locale]}</p>
        <TagList item={item} className="mt-3" />
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={() => copy(item.aiPrompt[locale], t.copiedToast)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              copied ? "border-accent bg-accent text-accent-fg" : "border-line hover:border-fg hover:bg-fg hover:text-page"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t.copied : t.copyPrompt}
          </button>
          <Link
            href={href}
            aria-label={`${t.viewDetails}: ${item.name[locale]}`}
            title={t.viewDetails}
            className="grid place-items-center w-11 rounded-xl border border-line transition-colors hover:border-fg hover:bg-fg hover:text-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
