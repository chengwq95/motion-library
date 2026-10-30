import type { AnchorHTMLAttributes } from "react";

// Stands in for next/link in the single-file build: site paths become hash routes.
export default function Link({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href.startsWith("/") ? `#${href}` : href} {...props} />;
}
