"use client";

import BackToTop from "@/components/BackToTop";
import Library from "@/components/Library";
import SiteFooter from "@/components/SiteFooter";
import TopBar from "@/components/TopBar";
import { useInitialQuery } from "@/hooks/useInitialQuery";
import { animations } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();
  const initialQuery = useInitialQuery();

  return (
    <div className="min-h-screen">
      <TopBar />

      <header className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 h-[560px] bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-10 sm:pt-20 sm:pb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
            {t.heroEyebrow(animations.length)}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
            {t.heroTitle}
            <br />
            <span className="text-accent">{t.heroAccent}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t.heroDesc}</p>
        </div>
      </header>

      {/* Remounts once after hydration so filters from a shared link take effect. */}
      <Library key={initialQuery || "ssr"} initialQuery={initialQuery ?? ""} />

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
