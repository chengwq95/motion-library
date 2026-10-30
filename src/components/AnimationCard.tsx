"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import PreviewStage from "@/components/PreviewStage";
import { useCopy } from "@/hooks/useCopy";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

export default function AnimationCard({ item, previewText }: { item: AnimationItem; previewText: string }) {
  const { t, locale } = useI18n();
  const { copied, copy } = useCopy();
  const href = `/effects/${item.id}`;

  return (
    <article
      // Feeds the pointer position to the glowing border (.spot-border).
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="spot-border relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgb(0_0_0/0.35)]"
    >
      <PreviewStage item={item} text={previewText || item.sample[locale]} className="h-[208px] border-b border-line" />

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-wide text-muted">
              {t.components[item.component]} · {t.triggers[item.trigger]} · {item.tech}
            </p>
            <h3 className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight">
              <Link href={href} className="transition-colors hover:text-accent">{item.name[locale]}</Link>
            </h3>
          </div>
          <FavoriteButton id={item.id} label={item.name[locale]} className="-mr-1.5" />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{item.description[locale]}</p>
        <div className="mt-auto flex gap-2 pt-5">
          <button
            type="button"
            onClick={() => copy(item.aiPrompt[locale], t.copiedToast)}
            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full border text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              copied ? "border-accent bg-accent text-accent-fg" : "border-line bg-fg/[0.03] hover:border-fg hover:bg-fg hover:text-page"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t.copied : t.copyPrompt}
          </button>
          <Link
            href={href}
            aria-label={`${t.viewDetails}: ${item.name[locale]}`}
            title={t.viewDetails}
            className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-fg hover:bg-fg hover:text-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
