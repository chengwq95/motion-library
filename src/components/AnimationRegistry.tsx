import type { ComponentType } from "react";
import type { PreviewProps } from "@/lib/types";
import LightningStrike from "./previews/LightningStrike";
import LaserCut from "./previews/LaserCut";
import CoinFlip from "./previews/CoinFlip";
import ExplodeOut from "./previews/ExplodeOut";
import ButtonHover from "./previews/ButtonHover";
import CardEntrance from "./previews/CardEntrance";
import ScrollReveal from "./previews/ScrollReveal";
import DragFollow from "./previews/DragFollow";

export const previewRegistry: Record<string, ComponentType<PreviewProps>> = {
  LightningStrike, LaserCut, CoinFlip, ExplodeOut, ButtonHover, CardEntrance, ScrollReveal, DragFollow,
};
