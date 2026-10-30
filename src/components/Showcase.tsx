"use client";

import Link from "next/link";
import PreviewContent from "@/components/PreviewContent";
import { animations } from "@/lib/animations";
import { useI18n } from "@/lib/i18n";

// Self-running effects that look good small, shown in the hero marquee.
const PICKS = [
  "bg-aurora", "neon-sign", "spinner-conic", "card-carousel-3d", "gradient-flow-text", "bg-retro-grid", "data-pie",
  "lightning", "circle-text", "bg-lava", "spin-border-btn", "glitch-text", "radar-sweep", "bg-starfield",
];
const items = PICKS.map((id) => animations.find((a) => a.id === id)!).filter(Boolean);

export default function Showcase() {
  const { locale } = useI18n();
  return (
    <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
      {/* Two copies of the row moving by -50% make the loop seamless. */}
      <div className="flex w-max gap-4 py-2 hover:[animation-play-state:paused]" style={{ animation: "ml-showcase 70s linear infinite" }}>
        {[0, 1].map((copy) =>
          items.map((item) => (
            <Link
              key={`${copy}-${item.id}`}
              href={`/effects/${item.id}`}
              aria-hidden={copy === 1 || undefined}
              tabIndex={copy === 1 ? -1 : undefined}
              className="group w-[248px] shrink-0"
            >
              <div inert className="relative h-[156px] overflow-hidden rounded-2xl border border-line bg-stage shadow-[0_10px_30px_-12px_rgb(0_0_0/0.25)] transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 [container-type:inline-size]">
                <PreviewContent item={item} text={item.sample[locale]} locale={locale} />
              </div>
              <p className="mt-2.5 px-1 text-[13px] text-muted transition-colors group-hover:text-fg">{item.name[locale]}</p>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}
