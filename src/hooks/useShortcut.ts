"use client";

import { useEffect, useRef } from "react";

/** Calls `handlers[key]` on a plain key press, ignoring typing in form fields and modified keys. */
export function useShortcuts(handlers: Record<string, () => void>) {
  const latest = useRef(handlers);
  useEffect(() => {
    latest.current = handlers;
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']")) return;
      const run = latest.current[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (!run) return;
      e.preventDefault();
      run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
