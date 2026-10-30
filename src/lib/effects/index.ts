import { backgroundSnippets } from "./backgrounds";
import { buttonSnippets } from "./buttons";
import { cardSnippets } from "./cards";
import { controlSnippets } from "./controls";
import { dataSnippets } from "./data";
import { fromSnippet } from "./helpers";
import { iconSnippets } from "./icons";
import { loaderSnippets } from "./loaders";
import { navSnippets } from "./nav";
import { textSnippets } from "./text";

export const snippetEffects = [
  ...textSnippets,
  ...buttonSnippets,
  ...cardSnippets,
  ...navSnippets,
  ...controlSnippets,
  ...loaderSnippets,
  ...backgroundSnippets,
  ...iconSnippets,
  ...dataSnippets,
].map(fromSnippet);
