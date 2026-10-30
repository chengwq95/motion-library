"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Search, Type, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { animations } from "@/lib/animations";
import { dict, useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/prefs";
import { COMPONENTS, CONTEXTS, TECHS, TRIGGERS, type AnimationItem, type ComponentKind } from "@/lib/types";
import TopBar from "@/components/TopBar";
import FilterRow from "@/components/FilterRow";
import AnimationCard from "@/components/AnimationCard";
import SubmitDialog from "@/components/SubmitDialog";

const ALL = "all";
type Filters = { component: string; trigger: string; context: string; tech: string };
const NO_FILTERS: Filters = { component: ALL, trigger: ALL, context: ALL, tech: ALL };

function matchesFilters(a: AnimationItem, f: Filters) {
  return (f.component === ALL || a.component === f.component)
    && (f.trigger === ALL || a.trigger === f.trigger)
    && (f.context === ALL || (a.contexts as readonly string[]).includes(f.context))
    && (f.tech === ALL || a.tech === f.tech);
}

// Search both languages so a query works whichever UI language is active.
function searchText(a: AnimationItem) {
  const labels = Object.values(dict).flatMap((d) => [d.components[a.component], d.triggers[a.trigger], ...a.contexts.map((c) => d.contexts[c])]);
  return [a.name.zh, a.name.en, a.description.zh, a.description.en, a.tech, ...a.tags, ...labels].join(" ").toLowerCase();
}
const SEARCH_INDEX = new Map(animations.map((a) => [a.id, searchText(a)]));

const inputClass = "w-full rounded-xl border border-line bg-page py-2.5 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

export default function Home() {
  const { t, locale } = useI18n();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [grouped, setGrouped] = useState(true);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" focuses the search box, as on many docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']")) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const searched = useMemo(() => {
    const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return animations.filter((a) => terms.every((term) => SEARCH_INDEX.get(a.id)!.includes(term)));
  }, [search]);

  const filtered = useMemo(() => searched.filter((a) => matchesFilters(a, filters)), [searched, filters]);

  const groups = useMemo<[ComponentKind | null, AnimationItem[]][]>(() => {
    if (!grouped) return [[null, filtered]];
    return COMPONENTS
      .map((c) => [c, filtered.filter((a) => a.component === c)] as [ComponentKind, AnimationItem[]])
      .filter(([, items]) => items.length > 0);
  }, [filtered, grouped]);

  // Faceted counts: how many results each chip would give with the other filters kept.
  const optionsFor = (key: keyof Filters, values: readonly string[], label: (v: string) => string) =>
    [ALL, ...values].map((value) => ({
      value,
      label: value === ALL ? t.all : label(value),
      count: searched.filter((a) => matchesFilters(a, { ...filters, [key]: value })).length,
    }));

  const setFilter = (key: keyof Filters) => (value: string) => setFilters((f) => ({ ...f, [key]: value }));

  const copyPrompt = useCallback(async (item: AnimationItem) => {
    try {
      await navigator.clipboard.writeText(item.aiPrompt[locale]);
      toast.success(t.copiedToast);
      return true;
    } catch {
      toast.error(t.copyFailed);
      return false;
    }
  }, [locale, t]);

  const hasFilters = search !== "" || previewText !== "" || Object.values(filters).some((v) => v !== ALL);
  const clearAll = () => {
    setSearch("");
    setPreviewText("");
    setFilters(NO_FILTERS);
  };

  return (
    <div id="top" className="min-h-screen">
      <Toaster position="top-center" theme={theme} />
      <TopBar onSubmit={() => setSubmitOpen(true)} />

      <header className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 h-[560px] bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-10 sm:pt-20 sm:pb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
            {t.heroEyebrow(animations.length)}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
            {t.heroTitle}
            <br />
            <span className="text-accent">{t.heroAccent}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t.heroDesc}</p>
        </div>
      </header>

      <section aria-label={t.filtersLabel} className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="space-y-4 rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_minmax(0,320px)]">
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 w-4 h-4 -translate-y-1/2 text-muted" />
              <input
                ref={searchRef}
                type="search"
                aria-label={t.searchLabel}
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearch("")}
                className={`${inputClass} [&::-webkit-search-cancel-button]:hidden`}
              />
              {search ? (
                <button type="button" aria-label={t.clear} onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 grid place-items-center w-6 h-6 -translate-y-1/2 rounded-full text-muted hover:bg-fg/5 hover:text-fg">
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-line px-1.5 font-mono text-[11px] text-muted sm:block">/</kbd>
              )}
            </div>
            <div className="relative">
              <Type aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 w-4 h-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                aria-label={t.previewTextLabel}
                maxLength={24}
                placeholder={t.previewTextPlaceholder}
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <FilterRow label={t.filterComponent} value={filters.component} onChange={setFilter("component")}
              options={optionsFor("component", COMPONENTS, (v) => t.components[v as ComponentKind])} />
            <FilterRow label={t.filterTrigger} value={filters.trigger} onChange={setFilter("trigger")}
              options={optionsFor("trigger", TRIGGERS, (v) => t.triggers[v as keyof typeof t.triggers])} />
            <FilterRow label={t.filterContext} value={filters.context} onChange={setFilter("context")}
              options={optionsFor("context", CONTEXTS, (v) => t.contexts[v as keyof typeof t.contexts])} />
            <FilterRow label={t.filterTech} value={filters.tech} onChange={setFilter("tech")}
              options={optionsFor("tech", TECHS, (v) => v)} />
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4 text-sm">
            <span aria-live="polite" className="text-muted">{t.showing(filtered.length, animations.length)}</span>
            <div className="ml-auto flex items-center gap-2">
              <div role="group" aria-label={t.groupLabel} className="flex rounded-full border border-line p-0.5 text-xs">
                {[{ value: true, label: t.groupByComponent }, { value: false, label: t.groupNone }].map((o) => (
                  <button key={String(o.value)} type="button" aria-pressed={grouped === o.value} onClick={() => setGrouped(o.value)}
                    className="rounded-full px-3 py-1 text-muted transition-colors hover:text-fg aria-pressed:bg-fg aria-pressed:text-page">
                    {o.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={clearAll} disabled={!hasFilters}
                className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-muted transition-colors hover:bg-fg/5 hover:text-fg disabled:pointer-events-none disabled:opacity-40">
                <X className="w-3.5 h-3.5" />
                {t.clear}
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        {filtered.length > 0 ? groups.map(([kind, items]) => (
          <section key={kind ?? ALL} className="mb-12 last:mb-0">
            {kind && (
              <h2 className="mb-4 flex items-baseline gap-2 text-xl font-bold">
                {t.components[kind]}
                <span className="text-sm font-normal text-muted">{t.countUnit(items.length)}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {items.map((item) => <AnimationCard key={item.id} item={item} previewText={previewText} onCopy={copyPrompt} />)}
            </div>
          </section>
        )) : (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-muted">{t.empty}</p>
            <button type="button" onClick={clearAll} className="mt-4 rounded-full border border-line px-4 py-1.5 text-sm hover:bg-fg/5">{t.clear}</button>
          </div>
        )}
      </main>

      <footer className="border-t border-line">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-3 px-4 py-8 text-xs leading-relaxed text-muted sm:flex-row sm:justify-between sm:px-6">
          <p className="max-w-xl">{t.footerNote}</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span>{t.sources}:</span>
            <a href="https://www.threads.com/@ai_yunon_ai/post/DeeJRUjkXlM" target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-fg hover:underline">@ai_yunon_ai</a>
            <a href="https://www.threads.com/@ai_tjb/post/DeeHoA3ktZ5" target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-fg hover:underline">@ai_tjb</a>
          </p>
        </div>
      </footer>

      {showBackTop && (
        <button
          type="button"
          aria-label={t.backTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-30 grid place-items-center w-11 h-11 rounded-full border border-line bg-card shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <SubmitDialog open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
