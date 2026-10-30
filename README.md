# Motion Library

A collection of 500 web animation effects you can search, filter and try out in the browser. Each effect comes with an AI prompt you can paste into your coding assistant, plus ready-to-run HTML, CSS, React and Vue code.

Built with Next.js, React, TypeScript and Tailwind CSS. The interface is available in Simplified Chinese and English, with light and dark themes.

## Features

**Browsing**

- 500 effects in ten categories: text, buttons, cards, navigation, form controls, loaders, backgrounds, icons, data and cursors.
- Search in either language, and filter by component, trigger (auto, hover, click, focus, enter, scroll, drag), context and technique. Each filter shows how many results it would give.
- Filters are kept in the URL, so a link like `/?c=button&t=hover` opens the same results for anyone.
- Star effects to save them as favorites, and show only your favorites with one click.
- Recently viewed effects (up to 20) appear at the top of the home page.
- "Surprise me" opens a random effect, from the top bar or with the `R` key.

**Effect pages** (`/effects/<id>`)

- A large live preview. Hover, click and focus effects play an auto demo until you move the pointer over them.
- Preview tools: background (theme, light, dark, checkerboard), speed (0.5×, 1×, 2×) and width (phone, tablet, full).
- A code panel with separate tabs for the AI prompt, HTML, CSS, React, Vue and a standalone HTML file. Each tab can be copied, and the code files can be downloaded. Exported code includes the color variables it needs, so it runs as is.
- Previous / next links, `←` / `→` to move between effects, and related effects at the bottom.

**Everything else**

- Only the language you pick is shown: switching changes the interface, effect names, AI prompts and page titles. First visits follow the browser's language.
- Light, dark or system theme, remembered between visits and applied without a flash.
- Previews only render while on screen, and looping animations pause when scrolled away.
- Share images (Open Graph) use a real screenshot of each effect. A sitemap and robots.txt are generated.
- Keyboard: `/` focuses search and `Esc` clears it. The site respects the system's reduced-motion setting.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Then open http://localhost:3000. For a production build, run `npm run build` and then `npm start`.

When deploying, set `NEXT_PUBLIC_SITE_URL` to the site's full address (for example `https://example.com`). Share images and the sitemap use it to build absolute links. On Vercel, the production URL is used automatically if the variable isn't set.

## Single-file HTML

`standalone/motion-library.html` is the whole site bundled into one HTML file. Open it straight from disk: no server or internet connection is needed, and it works like the website (effect pages use `#/effects/<id>` links). To rebuild it after changing the code:

```bash
npm run build:html
```

## Preview screenshots

Share images use the screenshots in `public/previews/<id>.jpg`. After adding or changing an effect, capture new screenshots:

```bash
npm run build
npm run capture
```

`capture` only takes screenshots that are missing. Add `-- --force` to redo all of them (about 3–4 minutes for all 500). An effect without a screenshot falls back to a text-only share image.

## Checks and tests

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

`test:e2e` runs the Playwright browser tests, building the site first. Install the browser before the first run:

```bash
npx playwright install chromium
```

GitHub Actions runs all of these checks on every push to `main` and on every pull request.

## Project structure

| Path | Contents |
|---|---|
| `src/app/` | Home page, effect pages (`effects/[id]`), global styles and theme colors, icon, share images, sitemap and robots.txt |
| `src/lib/animations.ts` | Effects built as React components, and the combined list of all effects |
| `src/lib/effects/` | HTML + CSS effects, one file per category (`text.ts`, `buttons.ts`, `loaders.ts`…). `helpers.ts` handles scoping, splitting text into characters and building AI prompts |
| `src/lib/exporters.ts` | Converts an effect into React, Vue or a standalone HTML file |
| `src/lib/dict.ts`, `i18n.ts` | Interface text in both languages, and the `useI18n` hook |
| `src/lib/prefs.ts`, `query.ts` | Theme, language, favorites and recently viewed; filter state in the URL |
| `src/components/` | Top bar, filters, cards, effect page and other components. `previews/` holds the React-based effect previews |
| `e2e/` | Playwright browser tests |
| `scripts/` | Screenshot capture and the single-file HTML build |

## Adding an effect

**HTML + CSS (recommended).** Add an entry to the matching category file in `src/lib/effects/`, with a name and description in both languages, its contexts, the CSS and (optionally) the HTML. In the CSS, `.$` is the effect's root element and `$-name` is a keyframes name. Both are replaced with unique names, so effects never clash. For example:

```ts
btn("spotlight-sweep-btn",
  ["探照光扫过", "悬停时一束斜向的白光从左到右扫过按钮。"],
  ["Spotlight Sweep", "On hover a slanted beam of light sweeps across the button from left to right."],
  ["elegant"],
  `.$ { border: 0; background: var(--accent); color: var(--accent-fg); }
.$::after { content: ""; position: absolute; top: -50%; left: -60%; width: 40%; height: 200%;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / .7), transparent);
  transform: skewX(-20deg); transition: left .9s ease-in-out; }
.$:hover::after, .$:focus-visible::after { left: 130%; }`),
```

**React component.** Create the component in `src/components/previews/`, register it in `AnimationRegistry.tsx` and add its details to `animations.ts`. JavaScript animations that loop should read the `paused` prop and stop while off screen.

The effect page, AI prompt, code exports and share image are all generated for you. Use the theme colors (`var(--fg)`, `var(--card)`, `var(--accent)`… in CSS, or `bg-page`, `bg-card`, `text-fg`, `text-muted`, `border-line`, `bg-stage`, `bg-accent` in Tailwind) so the effect works in both light and dark mode. Run `npm run capture` afterwards to give it a share image.
