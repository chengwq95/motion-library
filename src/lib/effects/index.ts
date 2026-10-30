import { backgroundSnippets } from "./backgrounds";
import { backgroundMoreSnippets } from "./backgrounds-more";
import { buttonSnippets } from "./buttons";
import { buttonMoreSnippets } from "./buttons-more";
import { cardSnippets } from "./cards";
import { cardMoreSnippets } from "./cards-more";
import { controlSnippets } from "./controls";
import { controlMoreSnippets } from "./controls-more";
import { dataSnippets } from "./data";
import { dataMoreSnippets } from "./data-more";
import { fromSnippet } from "./helpers";
import { iconSnippets } from "./icons";
import { iconMoreSnippets } from "./icons-more";
import { loaderSnippets } from "./loaders";
import { loaderMoreSnippets } from "./loaders-more";
import { navSnippets } from "./nav";
import { navMoreSnippets } from "./nav-more";
import { textSnippets } from "./text";
import { textMoreSnippets } from "./text-more";

export const snippetEffects = [
  ...textSnippets, ...textMoreSnippets,
  ...buttonSnippets, ...buttonMoreSnippets,
  ...cardSnippets, ...cardMoreSnippets,
  ...navSnippets, ...navMoreSnippets,
  ...controlSnippets, ...controlMoreSnippets,
  ...loaderSnippets, ...loaderMoreSnippets,
  ...backgroundSnippets, ...backgroundMoreSnippets,
  ...iconSnippets, ...iconMoreSnippets,
  ...dataSnippets, ...dataMoreSnippets,
].map(fromSnippet);
