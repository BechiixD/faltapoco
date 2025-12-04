# Faltapoco.com

**Faltapoco.com** is a countdown website built with [Astro](https://astro.build/), React, and TailwindCSS. It provides real-time countdowns to major events, holidays, and launches, with localized content and SEO-friendly pages.

## Features

- Real-time countdowns for global and regional events (World Cup, Año Nuevo, Copa América, Hytale, etc.)
- SEO-optimized pages with custom meta tags
- Responsive design using TailwindCSS
- Easily extensible event data via `src/data/pages.js`
- Management scripts for generating Astro files and JSON data

## Tech Stack

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- Node.js (Express for management scripts)

## Getting Started

1. **Install dependencies:**
	```bash
	pnpm install
	```
2. **Run locally:**
	```bash
	pnpm dev
	```
3. **Build for production:**
	```bash
	pnpm build
	```

## Project Structure

- `src/` — Astro pages, components, layouts, styles, and event data
- `public/` — Static assets
- `management/` — Node.js scripts for managing Astro files and data
- `scripts/` — Utility scripts (e.g., JSON generation)
- `api/` — API endpoints

## Contributing

Feel free to open issues or submit pull requests for new events or improvements!

## License

MIT