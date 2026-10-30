"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

/** Copies text with a toast; `copied` stays true for 2s after a successful copy. */
export function useCopy() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast.error(t.copyFailed);
      return;
    }
    toast.success(message);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}
