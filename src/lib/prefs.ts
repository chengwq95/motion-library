"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "./types";

// Theme and locale live on <html> (data-theme / lang), set before paint by the
// inline script in layout.tsx and kept in localStorage, as are favorites.
// Components read them through useSyncExternalStore so the server render and
// hydration stay in sync.

export type ThemePref = "system" | "light" | "dark";
export type Theme = "light" | "dark";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

function read(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* storage unavailable: the choice just won't persist */ }
}

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
  const pref = getThemePref();
  document.documentElement.dataset.theme = pref === "system" ? (darkQuery().matches ? "dark" : "light") : pref;
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const mq = darkQuery();
  const onSystemChange = () => { applyTheme(); fn(); };
  // Another tab changed a preference: apply it here too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === "theme") applyTheme();
    if (e.key === "locale" && (e.newValue === "zh" || e.newValue === "en")) applyLocale(e.newValue);
    fn();
  };
  mq.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    mq.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getThemePref(): ThemePref {
  const v = read("theme");
  return v === "light" || v === "dark" ? v : "system";
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getLocale = (): Locale => (document.documentElement.lang.startsWith("zh") ? "zh" : "en");

export function setThemePref(pref: ThemePref) {
  write("theme", pref === "system" ? null : pref);
  applyTheme();
  notify();
}

export function setLocale(locale: Locale) {
  write("locale", locale);
  applyLocale(locale);
  notify();
}

const NO_FAVORITES: string[] = [];
let favoritesRaw: string | null = null;
let favorites = NO_FAVORITES;

// Cached on the raw string so the snapshot stays referentially stable.
function getFavorites() {
  const raw = read("favorites");
  if (raw !== favoritesRaw) {
    favoritesRaw = raw;
    try {
      const parsed: unknown = JSON.parse(raw ?? "[]");
      favorites = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : NO_FAVORITES;
    } catch {
      favorites = NO_FAVORITES;
    }
  }
  return favorites;
}

export function toggleFavorite(id: string) {
  const current = getFavorites();
  write("favorites", JSON.stringify(current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
  notify();
}

export const useThemePref = () => useSyncExternalStore(subscribe, getThemePref, () => "system" as const);
export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => "dark" as const);
export const useLocale = () => useSyncExternalStore(subscribe, getLocale, () => "zh" as const);
export const useFavorites = () => useSyncExternalStore(subscribe, getFavorites, () => NO_FAVORITES);
