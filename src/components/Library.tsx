"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, Type, X } from "lucide-react";
import AnimationCard from "@/components/AnimationCard";
import FilterRow from "@/components/FilterRow";
import { animations } from "@/lib/animations";
import { dict, useI18n } from "@/lib/i18n";
import { useFavorites } from "@/lib/prefs";
import { ALL, NO_FILTERS, parseQuery, toQuery, type Filters } from "@/lib/query";
import { COMPONENTS, CONTEXTS, TECHS, TRIGGERS, type AnimationItem, type ComponentKind } from "@/lib/types";

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
const pillClass = "rounded-full px-3 py-1 text-muted transition-colors hover:text-fg aria-pressed:bg-fg aria-pressed:text-page focus-visible:outline-2 focus-visible:outline-accent";

export default function Library({ initialQuery }: { initialQuery: string }) {
  const { t } = useI18n();
  const favorites = useFavorites();
  const [initial] = useState(() => parseQuery(initialQuery));
  const [search, setSearch] = useState(initial.search);
  const [previewText, setPreviewText] = useState(initial.previewText);
  const [filters, setFilters] = useState<Filters>(initial.filters);
  const [grouped, setGrouped] = useState(initial.grouped);
  const [favoritesOnly, setFavoritesOnly] = useState(initial.favoritesOnly);
  const searchRef = useRef<HTMLInputElement>(null);

  // Mirror the state into the URL (debounced, as browsers rate-limit replaceState).
  useEffect(() => {
    const id = setTimeout(() => {
      const query = toQuery({ search, previewText, filters, grouped, favoritesOnly });
      if (query !== window.location.search) window.history.replaceState(null, "", query || window.location.pathname);
    }, 300);
    return () => clearTimeout(id);
  }, [search, previewText, filters, grouped, favoritesOnly]);

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
    return animations.filter((a) =>
      (!favoritesOnly || favorites.includes(a.id)) && terms.every((term) => SEARCH_INDEX.get(a.id)!.includes(term)));
  }, [search, favoritesOnly, favorites]);

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

  const hasFilters = search !== "" || previewText !== "" || favoritesOnly || Object.values(filters).some((v) => v !== ALL);
  const clearAll = () => {
    setSearch("");
    setPreviewText("");
    setFilters(NO_FILTERS);
    setFavoritesOnly(false);
  };

  return (
    <>
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
            <span role="status" className="text-muted">{t.showing(filtered.length, animations.length)}</span>
            <div className="ml-auto flex flex-wrap items-center gap-2 text-xs">
              <button type="button" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-muted transition-colors hover:text-fg aria-pressed:border-amber-500/50 aria-pressed:bg-amber-500/10 aria-pressed:text-amber-600 dark:aria-pressed:text-amber-400 focus-visible:outline-2 focus-visible:outline-accent">
                <Star className={`w-3.5 h-3.5 ${favoritesOnly ? "fill-current" : ""}`} />
                {t.favoritesOnly}
                <span className="tabular-nums opacity-60">{favorites.length}</span>
              </button>
              <div role="group" aria-label={t.groupLabel} className="flex rounded-full border border-line p-0.5">
                {[{ value: true, label: t.groupByComponent }, { value: false, label: t.groupNone }].map((o) => (
                  <button key={String(o.value)} type="button" aria-pressed={grouped === o.value} onClick={() => setGrouped(o.value)} className={pillClass}>
                    {o.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={clearAll} disabled={!hasFilters}
                className="flex items-center gap-1 rounded-full px-3 py-1 text-muted transition-colors hover:bg-fg/5 hover:text-fg disabled:pointer-events-none disabled:opacity-40">
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
              {items.map((item) => <AnimationCard key={item.id} item={item} previewText={previewText} />)}
            </div>
          </section>
        )) : (
          <div className="rounded-2xl border border-dashed border-line px-6 py-20 text-center">
            <p className="text-muted">{favoritesOnly && favorites.length === 0 ? t.favoritesEmpty : t.empty}</p>
            <button type="button" onClick={clearAll} className="mt-4 rounded-full border border-line px-4 py-1.5 text-sm hover:bg-fg/5">{t.clear}</button>
          </div>
        )}
      </main>
    </>
  );
}
