"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/lib/prefs";

export default function AppToaster() {
  return <Toaster position="top-center" theme={useTheme()} />;
}
