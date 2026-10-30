import { animations } from "@/lib/animations";
import { dict } from "@/lib/dict";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Motion Library effect preview";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return animations.map((a) => ({ id: a.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = animations.find((a) => a.id === id) ?? animations[0];
  const en = dict.en;
  return renderOgImage({
    eyebrow: "Motion Library",
    title: item.name.en,
    subtitle: item.description.en,
    chips: [en.components[item.component], en.triggers[item.trigger], ...item.contexts.map((c) => en.contexts[c]), item.tech],
  });
}
