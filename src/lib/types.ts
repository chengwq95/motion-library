export type Locale = "zh" | "en";
export type Localized = Record<Locale, string>;

export const COMPONENTS = ["text", "button", "card", "nav", "control", "loader", "background", "icon", "data", "cursor"] as const;
export const TRIGGERS = ["auto", "hover", "click", "focus", "enter", "scroll", "drag"] as const;
export const CONTEXTS = ["impact", "tech", "game", "interactive", "showcase", "elegant", "feedback"] as const;
export const TECHS = ["CSS", "SVG", "GSAP", "React"] as const;

export type ComponentKind = (typeof COMPONENTS)[number];
export type TriggerKind = (typeof TRIGGERS)[number];
export type ContextKind = (typeof CONTEXTS)[number];
export type TechKind = (typeof TECHS)[number];

export interface PreviewProps {
  text: string;
  /** True while the preview is off screen; looping animations should pause. */
  paused?: boolean;
}
export interface AnimationItem {
  id: string;
  name: Localized;
  description: Localized;
  /** Default preview text when the visitor hasn't typed their own. */
  sample: Localized;
  component: ComponentKind;
  trigger: TriggerKind;
  contexts: ContextKind[];
  tech: TechKind;
  tags: string[];
  /** React preview in src/components/previews (hand-written effects)… */
  previewComponent?: string;
  /** …or an HTML + CSS snippet (see src/lib/effects). */
  snippet?: Snippet;
  aiPrompt: Localized;
}

/** A self-contained HTML + CSS effect; class names and keyframes are already scoped to the effect. */
export interface Snippet {
  css: string;
  html: (text: string, locale: Locale) => string;
}
