"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "./types";

// Theme and locale live on <html> (data-theme / lang), set before paint by the
// inline script in layout.tsx and kept in localStorage. Components read them
// through useSyncExternalStore so the server render and hydration stay in sync.

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

function subscribe(fn: () => void) {
  listeners.add(fn);
  const mq = darkQuery();
  const onSystemChange = () => { applyTheme(); fn(); };
  mq.addEventListener("change", onSystemChange);
  return () => {
    listeners.delete(fn);
    mq.removeEventListener("change", onSystemChange);
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
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  notify();
}

export const useThemePref = () => useSyncExternalStore(subscribe, getThemePref, () => "system" as const);
export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => "dark" as const);
export const useLocale = () => useSyncExternalStore(subscribe, getLocale, () => "zh" as const);
