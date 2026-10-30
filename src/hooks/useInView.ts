"use client";

import { useEffect, useState, type RefObject } from "react";

/** Whether the element is on screen (with a small margin so animations resume just before it appears). */
export function useInView(ref: RefObject<Element | null>, rootMargin = "100px") {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
