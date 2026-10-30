"use client";

import { useLocale } from "./prefs";
import { dict } from "./dict";

export { dict };

export function useI18n() {
  const locale = useLocale();
  return { locale, t: dict[locale] };
}
