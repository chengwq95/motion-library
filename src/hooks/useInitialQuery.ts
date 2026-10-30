"use client";

import { useEffect, useSyncExternalStore } from "react";

let captured: string | null = null;
const subscribe = () => () => {};

/**
 * The page's query string as it was when the component mounted: null during
 * the server render and hydration, then the real value. Captured once per mount
 * so later replaceState calls don't change it.
 */
export function useInitialQuery() {
  useEffect(() => () => { captured = null; }, []);
  return useSyncExternalStore(subscribe, () => (captured ??= window.location.search), () => null);
}
