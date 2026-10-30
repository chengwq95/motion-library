import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EffectDetail from "@/components/EffectDetail";
import { animations } from "@/lib/animations";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return animations.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = animations.find((a) => a.id === id);
  if (!item) return {};
  const title = `${item.name.zh} · 动效收藏`;
  const description = item.description.zh;
  return { title, description, alternates: { canonical: `/effects/${item.id}` }, openGraph: { title, description, type: "article" } };
}

export default async function EffectPage({ params }: Props) {
  const { id } = await params;
  const item = animations.find((a) => a.id === id);
  if (!item) notFound();
  // React effects show their component's real source, read at build time.
  const source = item.previewComponent
    ? await readFile(path.join(process.cwd(), "src/components/previews", `${item.previewComponent}.tsx`), "utf8")
    : undefined;
  return <EffectDetail id={item.id} source={source} />;
}
