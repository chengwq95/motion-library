import { ChartColumn, Loader, Menu, MousePointer2, MousePointerClick, Shapes, Sparkles, SquareStack, ToggleRight, Type, type LucideIcon } from "lucide-react";
import type { ComponentKind } from "@/lib/types";

export const CATEGORY_ICONS: Record<ComponentKind, LucideIcon> = {
  text: Type,
  button: MousePointerClick,
  card: SquareStack,
  nav: Menu,
  control: ToggleRight,
  loader: Loader,
  background: Sparkles,
  icon: Shapes,
  data: ChartColumn,
  cursor: MousePointer2,
};
