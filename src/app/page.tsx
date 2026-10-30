"use client";

import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import RecentRow from "@/components/RecentRow";
import TopBar from "@/components/TopBar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useInitialQuery } from "@/hooks/useInitialQuery";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();
  const initialQuery = useInitialQuery();
  useDocumentTitle(t.brand);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Hero />
      <RecentRow />
      {/* Remounts once after hydration so filters from a shared link take effect. */}
      <Library key={initialQuery || "ssr"} initialQuery={initialQuery ?? ""} />
      <BackToTop />
    </div>
  );
}
