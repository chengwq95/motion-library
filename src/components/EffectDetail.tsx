"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Copy, Shuffle } from "lucide-react";
import AnimationCard from "@/components/AnimationCard";
import BackToTop from "@/components/BackToTop";
import FavoriteButton from "@/components/FavoriteButton";
import PreviewStage from "@/components/PreviewStage";
import TagList from "@/components/TagList";
import TopBar from "@/components/TopBar";
import { useCopy } from "@/hooks/useCopy";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRandomEffect } from "@/hooks/useRandomEffect";
import { useShortcuts } from "@/hooks/useShortcut";
import { animations } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";
import type { AnimationItem } from "@/lib/types";

function relatedTo(item: AnimationItem) {
  const score = (a: AnimationItem) =>
    (a.component === item.component ? 2 : 0) + (a.trigger === item.trigger ? 2 : 0)
    + a.contexts.filter((c) => item.contexts.includes(c)).length + (a.tech === item.tech ? 0.5 : 0);
  return animations
    .filter((a) => a.id !== item.id)
    .map((a) => ({ a, s: score(a) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, 3)
    .map(({ a }) => a);
}

function CopyButton({ text, label, message }: { text: string; label: string; message: string }) {
  const { t } = useI18n();
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(text, message)}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
        copied ? "border-accent bg-accent text-accent-fg" : "border-line hover:border-fg hover:bg-fg hover:text-page"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? t.copied : label}
    </button>
  );
}

export default function EffectDetail({ id, source }: { id: string; source?: string }) {
  const { t, locale } = useI18n();
  const index = animations.findIndex((a) => a.id === id);
  const item = animations[index];
  const prev = animations[(index - 1 + animations.length) % animations.length];
  const next = animations[(index + 1) % animations.length];
  useDocumentTitle(`${item.name[locale]} · ${t.brand}`);
  const router = useRouter();
  const openRandom = useRandomEffect();
  useShortcuts({ ArrowLeft: () => router.push(`/effects/${prev.id}`), ArrowRight: () => router.push(`/effects/${next.id}`) });

  // Snippet effects show their own HTML + CSS; React effects show the component file.
  const code = item.snippet
    ? `<!-- HTML -->\n${item.snippet.html(item.sample[locale], locale)}\n\n<style>\n${item.snippet.css}\n</style>`
    : source ?? "";

  return (
    <div className="min-h-screen">
      <TopBar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-24">
        {/* Quick navigation so you can keep browsing without going back to the list. */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="mr-auto inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="w-4 h-4" />
            {t.backToAll}
          </Link>
          <span className="hidden font-mono text-[11px] text-muted md:inline">{t.shortcutsHint}</span>
          <Link href={`/effects/${prev.id}`} aria-label={`${t.previous}: ${prev.name[locale]}`} title={`${t.previous} (←)`} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:border-fg/30 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link href={`/effects/${next.id}`} aria-label={`${t.next}: ${next.name[locale]}`} title={`${t.next} (→)`} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:border-fg/30 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent">
            <ChevronRight className="h-4 w-4" />
          </Link>
          <button type="button" onClick={openRandom} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-page transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <Shuffle className="h-4 w-4" />
            {t.ctaRandom}
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <PreviewStage item={item} text={item.sample[locale]} className="h-[280px] overflow-hidden rounded-3xl border border-line sm:h-[380px]" />

          <div>
            <div className="flex items-start gap-3">
              <h1 className="flex-1 text-3xl font-black tracking-tight sm:text-4xl">{item.name[locale]}</h1>
              <FavoriteButton id={item.id} label={item.name[locale]} className="mt-1 w-10 h-10 border border-line" />
            </div>
            <p className="mt-4 text-lg leading-relaxed">{item.description[locale]}</p>
            <TagList item={item} className="mt-4 text-xs" />

            <section className="mt-8 rounded-2xl border border-line bg-card p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-semibold">{t.promptTitle}</h2>
                <CopyButton text={item.aiPrompt[locale]} label={t.copyPrompt} message={t.copiedToast} />
              </div>
              <p className="max-h-72 overflow-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-muted">{item.aiPrompt[locale]}</p>
            </section>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
            <div className="mr-auto">
              <h2 className="font-semibold">{t.sourceTitle}</h2>
              <p className="text-xs text-muted">{item.snippet ? t.sourceSnippetNote : t.sourceNote}</p>
            </div>
            <span className="font-mono text-xs text-muted">{item.snippet ? "HTML + CSS" : `${item.previewComponent}.tsx`}</span>
            <CopyButton text={code} label={t.copySource} message={t.sourceCopied} />
          </div>
          <pre className="max-h-[480px] overflow-auto bg-stage p-5 font-mono text-[13px] leading-relaxed"><code>{code}</code></pre>
        </section>

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {[{ a: prev, label: t.previous, Icon: ArrowLeft }, { a: next, label: t.next, Icon: ArrowRight }].map(({ a, label, Icon }, i) => (
            <Link key={label} href={`/effects/${a.id}`}
              className={`flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-fg/30 ${i === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}>
              <Icon className="w-4 h-4 shrink-0 text-muted" />
              <span>
                <span className="block text-xs text-muted">{label}</span>
                <span className="font-semibold">{a.name[locale]}</span>
              </span>
            </Link>
          ))}
        </nav>

        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold">{t.related}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {relatedTo(item).map((a) => <AnimationCard key={a.id} item={a} previewText="" />)}
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
}
