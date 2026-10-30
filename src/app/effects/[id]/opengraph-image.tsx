import { readFile } from "node:fs/promises";
import path from "node:path";
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
  // Real screenshot from `npm run capture`, if it has been taken.
  const shot = await readFile(path.join(process.cwd(), "public/previews", `${item.id}.jpg`)).catch(() => null);
  return renderOgImage({
    preview: shot ? `data:image/jpeg;base64,${shot.toString("base64")}` : undefined,
    eyebrow: "Motion Library",
    title: item.name.en,
    subtitle: item.description.en,
    chips: [en.components[item.component], en.triggers[item.trigger], ...item.contexts.map((c) => en.contexts[c]), item.tech],
  });
}
