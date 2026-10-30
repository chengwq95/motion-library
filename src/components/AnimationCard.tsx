"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { previewRegistry } from "@/components/AnimationRegistry";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

export default function AnimationCard({ item, previewText, onCopy }: {
  item: AnimationItem;
  previewText: string;
  onCopy: (item: AnimationItem) => Promise<boolean>;
}) {
  const { t, locale } = useI18n();
  const [replayKey, setReplayKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const Preview = previewRegistry[item.previewComponent];
  const otherLocale = locale === "zh" ? "en" : "zh";

  const handleCopy = async () => {
    if (!(await onCopy(item))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-card transition duration-300 hover:-translate-y-0.5 hover:border-fg/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
      <div className="relative h-[200px] border-b border-line bg-stage [container-type:inline-size]">
        {Preview && <Preview key={replayKey} text={previewText || item.sample[locale]} />}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-line/60 bg-card/80 px-2 py-0.5 font-mono text-[11px] text-muted backdrop-blur">
          #{item.number}
        </span>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          aria-label={`${t.replay}: ${item.name[locale]}`}
          title={t.replay}
          className="absolute right-3 top-3 grid place-items-center w-7 h-7 rounded-full border border-line/60 bg-card/80 text-muted backdrop-blur transition hover:text-fg focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold leading-snug">
          {item.name[locale]}
          <span lang={otherLocale === "zh" ? "zh-CN" : "en"} className="ml-2 text-sm font-normal text-muted">{item.name[otherLocale]}</span>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description[locale]}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
          <li className="rounded-md bg-accent/12 px-1.5 py-0.5 font-medium text-accent">{t.triggers[item.trigger]}</li>
          {item.contexts.map((c) => (
            <li key={c} className="rounded-md bg-fg/5 px-1.5 py-0.5 text-muted">{t.contexts[c]}</li>
          ))}
          <li className="rounded-md border border-line px-1.5 py-0.5 font-mono text-muted">{item.tech}</li>
        </ul>
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              copied ? "border-accent bg-accent text-accent-fg" : "border-line hover:border-fg hover:bg-fg hover:text-page"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t.copied : t.copyPrompt}
          </button>
        </div>
      </div>
    </article>
  );
}
