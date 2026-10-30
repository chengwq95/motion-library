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
