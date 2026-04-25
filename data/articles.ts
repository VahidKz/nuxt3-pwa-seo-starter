import type { Article, ArticleSummary } from '~/types/article'

export const articles: Article[] = [
  {
    slug: 'performance-budgeting-in-nuxt',
    title: 'Performance Budgeting in Nuxt Without Sacrificing Authoring Speed',
    description:
      'A practical pattern for keeping Nuxt marketing pages fast while teams keep shipping new content.',
    excerpt:
      'Performance work becomes durable when budgets are treated as product constraints instead of afterthoughts.',
    category: 'Performance',
    readingTime: '6 min read',
    publishedAt: '2026-03-12T08:00:00.000Z',
    updatedAt: '2026-04-20T09:30:00.000Z',
    coverImage: '/images/blog-performance.svg',
    coverAlt: 'Abstract card illustrating a performance budget dashboard',
    keywords: ['nuxt performance', 'lighthouse', 'core web vitals', 'ssr'],
    sections: [
      {
        title: 'Set a budget before the design expands',
        paragraphs: [
          'Teams usually talk about performance after the page has already accumulated animations, remote scripts, oversized imagery, and layout shifts. A better pattern is to agree on what "fast enough" means before the first section lands in production.',
          'In practice that means deciding early how much JavaScript you are willing to ship to a marketing route, how large a hero image may be, and how many third-party integrations can block render-critical work.'
        ]
      },
      {
        title: 'Let Nuxt handle the route splitting, but support it with disciplined page architecture',
        paragraphs: [
          'Nuxt already code-splits by route, so the main engineering decision is not whether route-level chunking exists. It is whether each route is designed to keep that advantage intact.',
          'Keeping sections composable, deferring non-critical UI, and moving content fetches toward prerender-friendly paths preserves the route-level splitting that Nuxt gives you out of the box.'
        ]
      },
      {
        title: 'Use the build as a distribution step, not as a rescue plan',
        paragraphs: [
          'Compression, payload extraction, inline SSR styles, and image optimization improve delivery, but they should reinforce good page decisions rather than compensate for poor ones.',
          'That mindset is what makes a starter template reusable: the defaults support fast pages, and the codebase encourages teams to stay within those guardrails.'
        ]
      }
    ]
  },
  {
    slug: 'canonical-models-for-content-heavy-routes',
    title: 'Canonical Models for Content-Heavy Routes',
    description:
      'How to keep dynamic meta, social previews, and canonical URLs coherent as route depth and content volume grow.',
    excerpt:
      'Canonical drift usually starts small: a staging URL here, an inconsistent title there, and suddenly sharing and crawl signals become noisy.',
    category: 'SEO',
    readingTime: '5 min read',
    publishedAt: '2026-02-28T10:15:00.000Z',
    updatedAt: '2026-04-18T11:00:00.000Z',
    coverImage: '/images/blog-canonical.svg',
    coverAlt: 'Abstract representation of canonical URL mapping',
    keywords: ['nuxt seo', 'canonical urls', 'open graph', 'structured data'],
    sections: [
      {
        title: 'Treat metadata as route data, not decoration',
        paragraphs: [
          'When every page assembles its own titles, descriptions, and Open Graph tags ad hoc, metadata quality becomes inconsistent quickly. A small composable that receives route intent and translates it into head tags keeps the system predictable.',
          'The benefit is less about convenience and more about correctness: canonical URLs, social URLs, and schema references all resolve from the same source of truth.'
        ]
      },
      {
        title: 'Absolute URLs matter more than most teams expect',
        paragraphs: [
          'A relative image path may still render in the app, but crawlers and social scrapers need stable absolute URLs for canonical links and previews.',
          'That is why this starter keeps siteUrl in runtime config and resolves canonical and Open Graph URLs centrally rather than recomputing them page by page.'
        ]
      },
      {
        title: 'Sitemap and robots rules should support the same model',
        paragraphs: [
          'Once metadata becomes systematic, sitemap generation and robots directives can align with the same rules. Public content routes stay discoverable, while utility or fallback routes stay available to users without confusing crawlers.',
          'That alignment reduces crawl waste and makes the output easier to reason about during audits.'
        ]
      }
    ]
  },
  {
    slug: 'designing-installable-nuxt-experiences',
    title: 'Designing Installable Nuxt Experiences That Still Feel Like the Web',
    description:
      'A measured approach to PWA install prompts, offline fallbacks, and update flows for editorial and product surfaces.',
    excerpt:
      'Installability is most effective when it complements the browser experience rather than interrupting it.',
    category: 'PWA',
    readingTime: '7 min read',
    publishedAt: '2026-01-30T07:45:00.000Z',
    updatedAt: '2026-04-10T14:20:00.000Z',
    coverImage: '/images/blog-installable.svg',
    coverAlt: 'Minimal illustration of install and offline states',
    keywords: ['pwa', 'vite pwa', 'offline', 'install prompt'],
    sections: [
      {
        title: 'Install prompts should feel earned',
        paragraphs: [
          'A PWA install button is valuable when the product already demonstrates repeat-use value. Presenting it calmly, with clear language and a dismissal path, outperforms aggressive prompting in both trust and adoption.',
          'That is why this starter keeps the install UI lightweight and only surfaces it when the browser exposes the capability.'
        ]
      },
      {
        title: 'Offline support needs a route users can understand',
        paragraphs: [
          'Service workers are powerful, but users still need an intentional fallback when navigation happens without a network connection. An explicit offline page makes the experience legible and gives the product a graceful failure mode.',
          'The offline route also becomes useful during QA because teams can test cache behavior with a concrete destination rather than an ambiguous browser error.'
        ]
      },
      {
        title: 'Network-first API caching preserves freshness without breaking resilience',
        paragraphs: [
          'Not every cached request should be handled the same way. Static assets benefit from long-lived cache-first behavior, while content APIs usually need network-first logic so fresh content wins when available.',
          'That split lets the app stay resilient without turning live content into a stale snapshot.'
        ]
      }
    ]
  }
]

export const articleSlugs = articles.map(article => article.slug)

export function getArticleBySlug(slug: string) {
  return articles.find(article => article.slug === slug)
}

export function getArticleSummaries(): ArticleSummary[] {
  return articles.map(({ sections: _sections, ...summary }) => summary)
}
