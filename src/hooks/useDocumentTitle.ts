"use client";

import { useEffect } from "react";

/** Keeps the tab title in the selected language (server metadata is in Chinese). */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
