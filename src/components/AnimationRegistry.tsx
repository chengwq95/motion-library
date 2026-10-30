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
import Typewriter from "./previews/Typewriter";
import Marquee from "./previews/Marquee";
import Shimmer from "./previews/Shimmer";
import MagneticButton from "./previews/MagneticButton";
import Ripple from "./previews/Ripple";
import ParallaxTilt from "./previews/ParallaxTilt";
import Spotlight from "./previews/Spotlight";

export const previewRegistry: Record<string, ComponentType<PreviewProps>> = {
  LightningStrike, LaserCut, CoinFlip, ExplodeOut, ButtonHover, CardEntrance, ScrollReveal, DragFollow,
  Typewriter, Marquee, Shimmer, MagneticButton, Ripple, ParallaxTilt, Spotlight,
};
