// Stands in for next/navigation in the single-file build: routes are hash based.
export function useRouter() {
  return { push: (path: string) => { window.location.hash = path; } };
}
