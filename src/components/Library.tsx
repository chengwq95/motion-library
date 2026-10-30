"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, LayoutGrid, Search, SlidersHorizontal, Star, Type, X } from "lucide-react";
import AnimationCard from "@/components/AnimationCard";
import { CATEGORY_ICONS } from "@/components/categoryIcons";
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

// With hundreds of effects, show a few per group (or a page at a time) and let people ask for more.
const GROUP_PREVIEW = 6;
const PAGE_SIZE = 36;

const inputClass = "h-11 w-full rounded-2xl border border-transparent bg-fg/[0.035] pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-muted hover:bg-fg/[0.05] focus:border-accent/60 focus:bg-card";
const moreClass = "mx-auto mt-8 flex rounded-full border border-line bg-card px-6 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-fg/30 focus-visible:outline-2 focus-visible:outline-accent";
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
  const [moreOpen, setMoreOpen] = useState(initial.filters.trigger !== ALL || initial.filters.context !== ALL || initial.filters.tech !== ALL);
  const searchRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  // The page size resets whenever the results change: it is tied to the query it was grown for.
  const [more, setMore] = useState({ query: "", limit: PAGE_SIZE });

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

  const resultsKey = toQuery({ search, previewText: "", filters, grouped, favoritesOnly });
  const limit = more.query === resultsKey ? more.limit : PAGE_SIZE;
  const toggleGroup = (kind: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });

  const setFilter = (key: keyof Filters) => (value: string) => setFilters((f) => ({ ...f, [key]: value }));

  const hasFilters = search !== "" || previewText !== "" || favoritesOnly || Object.values(filters).some((v) => v !== ALL);
  const clearAll = () => {
    setSearch("");
    setPreviewText("");
    setFilters(NO_FILTERS);
    setFavoritesOnly(false);
  };

  const categoryOptions = optionsFor("component", COMPONENTS, (v) => t.components[v as ComponentKind]);
  const secondaryActive = filters.trigger !== ALL || filters.context !== ALL || filters.tech !== ALL;

  return (
    <>
      <section id="library" aria-label={t.filtersLabel} className="max-w-[1200px] mx-auto scroll-mt-20 px-4 pt-24 sm:px-6">
        {/* Category tabs: the main way to browse. */}
        <div role="group" aria-label={t.filterComponent} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {categoryOptions.map((o) => {
            const Icon = o.value === ALL ? LayoutGrid : CATEGORY_ICONS[o.value as ComponentKind];
            const active = filters.component === o.value;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={active}
                disabled={!active && o.count === 0}
                onClick={() => setFilter("component")(active && o.value !== ALL ? ALL : o.value)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-35 ${
                  active ? "border-fg bg-fg text-page shadow-[0_8px_24px_-10px_var(--accent)]" : "border-line bg-card/60 text-fg/80 hover:border-fg/25 hover:text-fg"
                }`}
              >
                <Icon className="h-4 w-4 opacity-80" />
                {o.label}
                <span className="font-mono text-xs tabular-nums opacity-55">{o.count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[22px] border border-line bg-card/70 p-2 shadow-[0_1px_0_0_color-mix(in_oklab,var(--fg)_4%,transparent)] backdrop-blur">
          <div className="grid gap-2 md:grid-cols-[1fr_minmax(0,280px)_auto]">
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 w-4 h-4 -translate-y-1/2 text-muted" />
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
                <button type="button" aria-label={t.clear} onClick={() => setSearch("")} className="absolute right-3 top-1/2 grid place-items-center w-6 h-6 -translate-y-1/2 rounded-full text-muted hover:bg-fg/5 hover:text-fg">
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-line bg-card px-1.5 font-mono text-[11px] text-muted sm:block">/</kbd>
              )}
            </div>
            <div className="relative">
              <Type aria-hidden className="pointer-events-none absolute left-4 top-1/2 w-4 h-4 -translate-y-1/2 text-muted" />
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
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm transition focus-visible:outline-2 focus-visible:outline-accent ${
                moreOpen || secondaryActive ? "border-accent/50 bg-accent/10 text-fg" : "border-transparent text-muted hover:bg-fg/5 hover:text-fg"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t.moreFilters}
              {secondaryActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
            </button>
          </div>

          {moreOpen && (
            <div className="space-y-2.5 border-t border-line px-3 pb-2 pt-4 mt-2">
              <FilterRow label={t.filterTrigger} value={filters.trigger} onChange={setFilter("trigger")}
                options={optionsFor("trigger", TRIGGERS, (v) => t.triggers[v as keyof typeof t.triggers])} />
              <FilterRow label={t.filterContext} value={filters.context} onChange={setFilter("context")}
                options={optionsFor("context", CONTEXTS, (v) => t.contexts[v as keyof typeof t.contexts])} />
              <FilterRow label={t.filterTech} value={filters.tech} onChange={setFilter("tech")}
                options={optionsFor("tech", TECHS, (v) => v)} />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 px-1 text-sm">
          <span role="status" className="text-muted">{t.showing(filtered.length, animations.length)}</span>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-xs">
            <button type="button" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:text-fg aria-pressed:border-amber-500/50 aria-pressed:bg-amber-500/10 aria-pressed:text-amber-600 dark:aria-pressed:text-amber-400 focus-visible:outline-2 focus-visible:outline-accent">
              <Star className={`w-3.5 h-3.5 ${favoritesOnly ? "fill-current" : ""}`} />
              {t.favoritesOnly}
              <span className="font-mono tabular-nums opacity-60">{favorites.length}</span>
            </button>
            <div role="group" aria-label={t.groupLabel} className="flex rounded-full border border-line p-0.5">
              {[{ value: true, label: t.groupByComponent }, { value: false, label: t.groupNone }].map((o) => (
                <button key={String(o.value)} type="button" aria-pressed={grouped === o.value} onClick={() => setGrouped(o.value)} className={pillClass}>
                  {o.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={clearAll} disabled={!hasFilters}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-fg/5 hover:text-fg disabled:pointer-events-none disabled:opacity-40">
              <X className="w-3.5 h-3.5" />
              {t.clear}
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-28">
        {filtered.length > 0 ? groups.map(([kind, items]) => {
          // A group is shown in full when expanded or when it is the only one left.
          const full = !kind || expanded.has(kind) || groups.length === 1;
          const shown = kind ? (full ? items : items.slice(0, GROUP_PREVIEW)) : items.slice(0, limit);
          const Icon = kind ? CATEGORY_ICONS[kind] : null;
          return (
            <section key={kind ?? ALL} className="mb-16 last:mb-0">
              {kind && Icon && (
                <div className="mb-6 flex items-end justify-between gap-4">
                  <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-card text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {t.components[kind]}
                    <span className="font-mono text-sm font-normal text-muted">{items.length}</span>
                  </h2>
                  {items.length > GROUP_PREVIEW && groups.length > 1 && (
                    <button type="button" onClick={() => toggleGroup(kind)} className="group/more inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg">
                      {expanded.has(kind) ? t.showLess : t.showAll(items.length)}
                      <ArrowRight className={`h-4 w-4 transition-transform ${expanded.has(kind) ? "-rotate-90" : "group-hover/more:translate-x-0.5"}`} />
                    </button>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((item) => <AnimationCard key={item.id} item={item} previewText={previewText} />)}
              </div>
              {!kind && items.length > limit && (
                <button type="button" onClick={() => setMore({ query: resultsKey, limit: limit + PAGE_SIZE })} className={moreClass}>
                  {t.loadMore(items.length - limit)}
                </button>
              )}
            </section>
          );
        }) : (
          <div className="rounded-[22px] border border-dashed border-line px-6 py-24 text-center">
            <p className="text-muted">{favoritesOnly && favorites.length === 0 ? t.favoritesEmpty : t.empty}</p>
            <button type="button" onClick={clearAll} className="mt-5 rounded-full border border-line px-4 py-1.5 text-sm hover:bg-fg/5">{t.clear}</button>
          </div>
        )}
      </main>
    </>
  );
}
