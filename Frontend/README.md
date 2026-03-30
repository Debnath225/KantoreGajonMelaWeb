# Kantore Gajon Mala Web

A modern React + Vite website showcasing the culture, rituals, and community spirit of Kantore Gajon Mala.

## Tech Stack

- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- Framer Motion
- Lenis (smooth scroll)

## Requirements

- Node.js `>= 20.19.0`
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

Create `.env` from `.env.example` and configure:

```bash
VITE_NEWSLETTER_ENDPOINT=https://your-newsletter-endpoint
```

`NewsletterSection` uses this endpoint for real subscriptions. If it is not set, subscription is blocked with a clear error message.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Routes

- `/` Home
- `/about` About
- `/gallery` Gallery
- `/events` Events
- `/testimonials` Testimonials
- `/privacy-policy` Privacy Policy
- `/terms-of-service` Terms of Service
- `/support` Support
- `/care-guide` Care Guide
- `*` Not Found

## Project Structure

```text
src/
  components/
    layout/      # Navbar, Footer, Loader, Background
    sections/    # Page sections (Hero, CTA, FAQ, etc.)
    shared/      # Shared reusable components
    common/      # Legacy compatibility layer
  pages/         # Route pages
  context/       # App context providers
  hooks/         # Custom hooks
  animations/    # Animation configs/helpers
  store/         # Static JSON/content data
  styles/        # Global styles
```

See [src/components/README.md](src/components/README.md) for component folder guidance.

## Assets

- Public static assets are in `public/`.
- Source assets are in `src/assets/`.
- Gallery/CTA image data is configured in:
  - `src/store/imageData.json`
  - `src/store/CTAimageData.json`

## Deployment (Vercel)

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `20.x` (recommended to match `package.json` engines)

## Search Indexing Setup

Already configured in this repo:

- `public/robots.txt`
- `public/sitemap.xml`
- canonical, Open Graph, Twitter, and JSON-LD tags in `index.html`
- verification meta placeholders in `index.html`

After deployment, complete these steps:

1. Google Search Console: add property and submit `https://kantore-gajon-mala-web.vercel.app/sitemap.xml`
2. Bing Webmaster Tools: add site and submit the same sitemap
3. Yandex Webmaster (optional): add site and submit sitemap
4. Replace verification placeholders in `index.html` with real tokens:
   - `google-site-verification`
   - `msvalidate.01`
   - `yandex-verification`

## UI Preview

Add project visuals to make this README easier to understand for contributors and visitors.

### Screenshots

Place screenshots in `docs/screenshots/` and reference them like this:

```md
![Home Page](docs/screenshots/home.png)
![Gallery Page](docs/screenshots/gallery.png)
![Mobile Navigation](docs/screenshots/mobile-nav.png)
```

### GIF Demos

Place GIFs in `docs/gifs/` and reference them like this:

```md
![Hero Animation](docs/gifs/hero.gif)
![Language Switch](docs/gifs/language-toggle.gif)
```

## Notes

- `src/components/common/` is retained for backward compatibility; prefer new imports from `layout/`, `sections/`, and `shared/`.

## Contributing

Use this quick checklist before opening a PR:

- Fork or branch from the latest `main`.
- Install dependencies: `npm install`.
- Run locally and verify key routes.
- Follow existing folder conventions (`layout`, `sections`, `shared`).
- Keep components responsive for mobile/tablet/desktop.
- Run lint: `npm run lint`.
- Run production build: `npm run build`.
- Add/update screenshots or GIFs if UI changed.
- Write a clear PR title and short summary of what changed and why.
