# nuxt3-pwa-seo-starter

![Nuxt 3](https://img.shields.io/badge/Nuxt%203-00DC82?style=for-the-badge&logo=nuxt&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-111827?style=for-the-badge)

A production-ready Nuxt 3 starter that demonstrates how to set up PWA installability, structured SEO, and performance-aware delivery defaults before product complexity arrives.

## Why This Exists

This repository is meant to look like a serious starting point for a real marketing or content-driven frontend, not a generated demo. It shows how to:

- centralize SEO metadata so canonical URLs, Open Graph tags, Twitter cards, and JSON-LD stay coherent
- configure a real PWA manifest and service worker strategy without turning the app into a noisy install prompt
- start from performance-minded defaults that support Lighthouse targets in the 90+ range when paired with disciplined content and third-party usage
- ship a Dockerized Nuxt 3 app with a clean local-development path and a production image

## What Is Included

- Nuxt 3 with TypeScript
- Pinia store example for shared UI state
- `@vite-pwa/nuxt` for manifest and service worker generation
- `@nuxtjs/sitemap` and `@nuxtjs/robots` for crawlability
- `@nuxt/image` for image delivery patterns
- strict ESLint and Prettier setup
- reusable `useSeo()` composable for route metadata
- example pages: `/`, `/about`, `/blog`, `/blog/[slug]`, `/offline`
- Dockerfile for production and `docker-compose.yml` for local development

## Lighthouse Targets

This starter is designed to support the following targets when content and third-party scripts are managed responsibly:

| Metric | Target | How the starter supports it |
| --- | --- | --- |
| Performance | `90+` | Inline SSR styles, compressed public assets, payload extraction, lazy-loaded images, route-level code splitting |
| SEO | `100` | Canonical links, Open Graph, Twitter cards, structured data, robots, sitemap |
| Best Practices | `95+` | Modern build output, secure metadata defaults, PWA manifest and service worker setup |
| Accessibility | `95+` | Semantic HTML structure, consistent heading flow, clear button and link labels |

Nuxt already performs route-level code splitting. This repository keeps that advantage intact by keeping each page focused, avoiding unnecessary client-heavy abstractions, and letting route-level chunks stay granular.

## PWA Checklist

| Capability | Status | Why it matters |
| --- | --- | --- |
| `manifest.json` with `name`, `short_name`, `theme_color`, `display`, icons | Yes | Required for installability and standalone app metadata |
| Browser install prompt support | Yes | Allows users to install when the platform determines the app is eligible |
| Offline fallback route | Yes | Gives users a predictable experience instead of a generic browser failure |
| Cache-first strategy for static assets | Yes | Improves repeat-visit resilience and load speed |
| Network-first strategy for API calls | Yes | Preserves freshness while still allowing resilience when requests fail |
| Auto-update service worker registration | Yes | Keeps deployed app shells current without manual version handling |

## SEO Checklist

| SEO element | Implemented | Why it matters |
| --- | --- | --- |
| Dynamic `<title>` | Yes | Keeps page intent explicit in search results and browser history |
| Meta description | Yes | Supports search snippets and social previews |
| Canonical URL | Yes | Prevents metadata drift across duplicate or misconfigured routes |
| Open Graph tags | Yes | Improves link previews on Slack, LinkedIn, Facebook, and similar clients |
| Twitter Card tags | Yes | Ensures a consistent social preview model on Twitter/X |
| Organization JSON-LD | Yes | Gives crawlers a structured site identity baseline |
| Article JSON-LD for blog routes | Yes | Helps content routes expose richer structured metadata |
| `robots.txt` | Yes | Directs crawlers away from utility routes such as offline and API endpoints |
| `sitemap.xml` | Yes | Makes public routes discoverable and easier to audit |

The main implementation point is [`useSeo.ts`](./composables/useSeo.ts), which wraps `useHead()` and `useSeoMeta()` so page-level metadata is derived from a single contract.

## Project Structure

```text
nuxt3-pwa-seo-starter
├── assets/css/main.css
├── components/
├── composables/useSeo.ts
├── data/articles.ts
├── layouts/default.vue
├── pages/
│   ├── index.vue
│   ├── about.vue
│   ├── offline.vue
│   └── blog/
│       ├── index.vue
│       └── [slug].vue
├── public/
│   ├── icons/
│   └── images/
├── server/api/
│   ├── articles/
│   └── __sitemap__/urls.ts
├── stores/site.ts
├── Dockerfile
└── docker-compose.yml
```

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

| Variable | Description | Example |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Absolute public origin used for canonical URLs, social images, and sitemap output | `https://example.com` |
| `NUXT_PUBLIC_SITE_NAME` | Product or site name used across metadata and manifest | `Nuxt 3 PWA SEO Starter` |
| `NUXT_PUBLIC_SITE_DESCRIPTION` | Default description for social cards and non-article routes | `A production-ready Nuxt 3 starter...` |
| `NUXT_PUBLIC_SITE_LOCALE` | Locale value used for Open Graph metadata | `en_US` |

## Local Setup

### Standard Node workflow

```bash
nvm use
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

The repository includes `.nvmrc` pinned to Node 20 so local environments line up with the documented runtime.

### Docker Compose workflow

```bash
docker-compose up --build
```

This starts the Nuxt dev server in a Node 20 Alpine container and mounts the local workspace for iterative development.

## Production Build

```bash
npm run build
npm run preview
```

Or build the production image:

```bash
docker build -t nuxt3-pwa-seo-starter .
docker run -p 3000:3000 nuxt3-pwa-seo-starter
```

The Dockerfile uses a multi-stage Node 20 Alpine build:

- dependency install stage with `npm ci`
- production build stage with `nuxt build`
- minimal runtime stage serving `.output/server/index.mjs`

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Build the production server bundle |
| `npm run preview` | Preview the production output locally |
| `npm run generate` | Generate prerendered output |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix lint issues where possible |
| `npm run format:check` | Check formatting |
| `npm run format` | Format the repo with Prettier |
| `npm run typecheck` | Run Nuxt type checks |

## How This Setup Supports Performance

- `experimental.inlineSSRStyles` reduces render-blocking CSS for above-the-fold content
- `payloadExtraction` keeps prerendered payloads cache-friendly
- `nitro.compressPublicAssets` improves distribution efficiency for static assets
- `@nuxt/image` demonstrates lazy loading and responsive sizing for visual content
- fonts are preloaded and loaded with `font-display: swap`
- route rules prerender public pages and keep the example content routes static-friendly

## How To Customize For A New Project

1. Replace the icon set and `social-card.png` with project branding.
2. Update `app.config.ts` and `.env` with the real product name, URL, and description.
3. Swap `data/articles.ts` with your CMS or API integration.
4. Adjust `server/api/__sitemap__/urls.ts` to reflect your public route inventory.
5. Add product-specific structured data inside `useSeo()` calls where needed.
6. Tighten caching strategies in `nuxt.config.ts` based on real API freshness needs.

## Recruiter Signal

This repo demonstrates:

- Nuxt 3 and TypeScript fundamentals applied in a professional project shape
- PWA implementation beyond a checkbox-level setup
- structured SEO thinking suitable for content-heavy or marketing-heavy applications
- performance-aware delivery decisions grounded in Core Web Vitals concerns
- production-minded documentation and Dockerization

## License

MIT
