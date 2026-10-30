import { COMPONENTS, CONTEXTS, TECHS, TRIGGERS } from "./types";

// Library state <-> URL query string, so a filtered view can be shared as a link.

export const ALL = "all";
export type Filters = { component: string; trigger: string; context: string; tech: string };
export const NO_FILTERS: Filters = { component: ALL, trigger: ALL, context: ALL, tech: ALL };

export interface LibraryState {
  search: string;
  previewText: string;
  filters: Filters;
  grouped: boolean;
  favoritesOnly: boolean;
}

const FILTER_PARAMS: { key: keyof Filters; param: string; values: readonly string[] }[] = [
  { key: "component", param: "c", values: COMPONENTS },
  { key: "trigger", param: "t", values: TRIGGERS },
  { key: "context", param: "m", values: CONTEXTS },
  { key: "tech", param: "tech", values: TECHS },
];

export function parseQuery(query: string): LibraryState {
  const params = new URLSearchParams(query);
  const filters = { ...NO_FILTERS };
  for (const { key, param, values } of FILTER_PARAMS) {
    const value = params.get(param);
    if (value && values.includes(value)) filters[key] = value;
  }
  return {
    search: params.get("q") ?? "",
    previewText: (params.get("text") ?? "").slice(0, 24),
    filters,
    grouped: params.get("group") !== "none",
    favoritesOnly: params.get("fav") === "1",
  };
}

export function toQuery(state: LibraryState) {
  const params = new URLSearchParams();
  if (state.search) params.set("q", state.search);
  for (const { key, param } of FILTER_PARAMS) {
    if (state.filters[key] !== ALL) params.set(param, state.filters[key]);
  }
  if (state.previewText) params.set("text", state.previewText);
  if (!state.grouped) params.set("group", "none");
  if (state.favoritesOnly) params.set("fav", "1");
  const query = params.toString();
  return query ? `?${query}` : "";
}
