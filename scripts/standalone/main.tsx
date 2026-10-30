// Entry for the single-file build (npm run build:html): the same pages as the
// Next.js app, with hash routing so it works when opened straight from disk.
import { useEffect, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import Home from "@/app/page";
import AppToaster from "@/components/AppToaster";
import EffectDetail from "@/components/EffectDetail";
import { animations } from "@/lib/animations";
import sources from "virtual:sources";

// replaceState can throw for file:// URLs; filters still work, they just aren't mirrored to the URL.
const replaceState = history.replaceState.bind(history);
history.replaceState = (...args: Parameters<History["replaceState"]>) => {
  try { replaceState(...args); } catch { /* ignore */ }
};

const subscribe = (fn: () => void) => {
  window.addEventListener("hashchange", fn);
  return () => window.removeEventListener("hashchange", fn);
};

function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);
  const id = /^#\/effects\/([\w-]+)$/.exec(hash)?.[1];
  useEffect(() => { window.scrollTo(0, 0); }, [hash]);
  return id && animations.some((a) => a.id === id) ? <EffectDetail key={id} id={id} source={sources[id]} /> : <Home />;
}

createRoot(document.getElementById("root")!).render(<><App /><AppToaster /></>);
