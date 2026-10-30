export const dynamic = "force-static";

import { animations } from "@/lib/animations";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Motion Library";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Motion Library",
    title: "Motion Library",
    subtitle: `${animations.length} playable web animations, each with a copy-ready AI prompt.`,
    chips: animations.slice(0, 6).map((a) => a.name.en),
  });
}
