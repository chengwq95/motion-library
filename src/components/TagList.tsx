"use client";

import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

export default function TagList({ item, className = "" }: { item: AnimationItem; className?: string }) {
  const { t } = useI18n();
  return (
    <ul className={`flex flex-wrap gap-1.5 text-[11px] ${className}`}>
      <li className="rounded-md bg-accent/12 px-1.5 py-0.5 font-medium text-accent">{t.triggers[item.trigger]}</li>
      <li className="rounded-md bg-fg/5 px-1.5 py-0.5 text-muted">{t.components[item.component]}</li>
      {item.contexts.map((c) => (
        <li key={c} className="rounded-md bg-fg/5 px-1.5 py-0.5 text-muted">{t.contexts[c]}</li>
      ))}
      <li className="rounded-md border border-line px-1.5 py-0.5 font-mono text-muted">{item.tech}</li>
    </ul>
  );
}
