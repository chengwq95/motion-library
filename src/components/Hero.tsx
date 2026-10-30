"use client";

import { useRouter } from "next/navigation";
import { ArrowDown, Shuffle, Sparkles } from "lucide-react";
import Showcase from "@/components/Showcase";
import { animations } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";
import { COMPONENTS } from "@/lib/types";

export default function Hero() {
  const { t } = useI18n();
  const router = useRouter();
  const stats = [
    { value: String(animations.length), label: t.statEffects },
    { value: String(COMPONENTS.length), label: t.statCategories },
    { value: "100%", label: t.statPlayable },
  ];

  return (
    <header
      className="relative overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }}
    >
      {/* Dotted grid fading out, plus a glow that follows the pointer. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--fg)_14%,transparent)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(640px circle at var(--hx, 50%) var(--hy, 0%), color-mix(in oklab, var(--accent) 16%, transparent), transparent 65%)" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(900px,90%)] -translate-x-1/2 bg-linear-to-r from-transparent via-accent/60 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 text-center sm:pt-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          {t.heroEyebrow(animations.length)}
        </p>
        <h1 className="mx-auto mt-7 max-w-4xl text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-7xl sm:leading-[1] lg:text-[88px]">
          {t.heroTitle}
          <br />
          <span className="text-gradient">{t.heroAccent}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.heroDesc}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-page shadow-[0_10px_40px_-10px_var(--accent)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t.ctaBrowse}
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => router.push(`/effects/${animations[Math.floor(Math.random() * animations.length)].id}`)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-card/60 px-6 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-fg/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Shuffle className="h-4 w-4" />
            {t.ctaRandom}
          </button>
        </div>

        <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 divide-x divide-line">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Showcase />
    </header>
  );
}
