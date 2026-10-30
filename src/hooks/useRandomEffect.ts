"use client";

import { useRouter } from "next/navigation";
import { animations } from "@/lib/animations";

/** Returns a function that opens a random effect other than the one being viewed. */
export function useRandomEffect() {
  const router = useRouter();
  return () => {
    const current = (window.location.hash || window.location.pathname).split("/effects/")[1];
    const pool = animations.filter((a) => a.id !== current);
    router.push(`/effects/${pool[Math.floor(Math.random() * pool.length)].id}`);
  };
}
