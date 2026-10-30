"use client";

import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toggleFavorite, useFavorites } from "@/lib/prefs";

export default function FavoriteButton({ id, label, className = "" }: { id: string; label: string; className?: string }) {
  const { t } = useI18n();
  const active = useFavorites().includes(id);
  const action = active ? t.unfavorite : t.favorite;
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${action}: ${label}`}
      title={action}
      onClick={() => toggleFavorite(id)}
      className={`grid shrink-0 place-items-center w-8 h-8 rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg aria-pressed:text-amber-500 focus-visible:outline-2 focus-visible:outline-accent ${className}`}
    >
      <Star className={`w-4 h-4 transition-transform active:scale-125 ${active ? "fill-current" : ""}`} />
    </button>
  );
}
