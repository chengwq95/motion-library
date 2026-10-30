// Absolute site URL for metadata, sitemap and share images. Set
// NEXT_PUBLIC_SITE_URL in production; Vercel's production URL is used otherwise.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
