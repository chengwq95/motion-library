"use client";

import { previewRegistry } from "@/components/AnimationRegistry";
import type { AnimationItem, Locale } from "@/lib/types";

// On the site, hover / focus / active states also apply inside a stage marked
// [data-demo], so the auto demo can show them. Exported code keeps the original CSS.
const demoable = (css: string) => css.replace(/:(hover|focus-visible|focus-within|focus|active)\b/g, ":is(:$1, [data-demo] *)");

/** Renders an effect's live preview: its React component or its HTML + CSS snippet. */
export default function PreviewContent({ item, text, locale }: { item: AnimationItem; text: string; locale: Locale }) {
  const Preview = item.previewComponent ? previewRegistry[item.previewComponent] : undefined;
  if (Preview) return <Preview text={text} />;
  if (!item.snippet) return null;
  const html = `<style>${demoable(item.snippet.css)}</style>${item.snippet.html(text, locale)}`;
  return <div className="relative flex h-full w-full items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: html }} />;
}
