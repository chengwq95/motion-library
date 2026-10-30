"use client";

import { Monitor, Moon, Plus, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { setLocale, setThemePref, useThemePref, type ThemePref } from "@/lib/prefs";
import type { Locale } from "@/lib/types";

const NEXT_THEME: Record<ThemePref, ThemePref> = { system: "light", light: "dark", dark: "system" };
const THEME_ICON = { system: Monitor, light: Sun, dark: Moon };
const LOCALES: { value: Locale; label: string }[] = [{ value: "zh", label: "中" }, { value: "en", label: "EN" }];

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="14" fill="#0d0e11" />
      <path d="M10 22h14M6 32h16M10 42h14" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <circle cx="40" cy="32" r="14" fill="#f2f2f0" />
    </svg>
  );
}

export default function TopBar({ onSubmit }: { onSubmit: () => void }) {
  const { t, locale } = useI18n();
  const themePref = useThemePref();
  const ThemeIcon = THEME_ICON[themePref];
  const themeLabel = t.themeLabel(t.themes[themePref]);

  return (
    <div className="sticky top-0 z-40 border-b border-line/70 bg-page/80 backdrop-blur-md">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-2 sm:gap-3">
        <a href="#top" className="mr-auto flex items-center gap-2.5 font-bold tracking-tight">
          <Logo className="w-7 h-7 rounded-lg ring-1 ring-line" />
          <span>Motion Library</span>
          <span className="hidden sm:inline text-muted font-normal">{locale === "zh" ? "动效收藏" : ""}</span>
        </a>

        <div role="group" aria-label={t.language} className="flex rounded-full border border-line bg-card p-0.5 text-xs font-medium">
          {LOCALES.map((l) => (
            <button
              key={l.value}
              type="button"
              lang={l.value === "zh" ? "zh-CN" : "en"}
              aria-pressed={locale === l.value}
              onClick={() => setLocale(l.value)}
              className="rounded-full px-2.5 py-1 text-muted transition-colors hover:text-fg aria-pressed:bg-fg aria-pressed:text-page focus-visible:outline-2 focus-visible:outline-accent"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={themeLabel}
          title={themeLabel}
          onClick={() => setThemePref(NEXT_THEME[themePref])}
          className="grid place-items-center w-8 h-8 rounded-full border border-line bg-card text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ThemeIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-1 rounded-full bg-fg px-3.5 h-8 text-sm font-medium text-page transition-transform hover:scale-[1.03] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Plus className="w-4 h-4" />
          {t.submit}
        </button>
      </nav>
    </div>
  );
}
