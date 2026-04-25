<script setup lang="ts">
import type { ArticleSummary } from '~/types/article'

const appConfig = useAppConfig()

const pillars = [
  {
    eyebrow: 'SEO',
    title: 'A single composable controls canonical, social, and schema output',
    description:
      'Page-level metadata stays coherent because `useSeo` resolves the title, canonical URL, Open Graph image, Twitter card, and JSON-LD from one source of truth.',
    bullets: [
      'Dynamic titles per route',
      'Canonical links',
      'Organization schema',
      'Absolute Open Graph URLs'
    ]
  },
  {
    eyebrow: 'PWA',
    title: 'Installable without turning the experience into an app shell gimmick',
    description:
      'The starter configures a real manifest, a controlled install prompt, a service worker strategy split by asset type, and an explicit offline route.',
    bullets: [
      'Manifest with icons',
      'Auto-updating service worker',
      'Offline fallback page',
      'Network-first API caching'
    ]
  },
  {
    eyebrow: 'Performance',
    title: 'Nuxt defaults are reinforced with delivery-minded configuration',
    description:
      'Critical CSS is inlined, payload extraction is enabled, static assets are compressed, and image delivery is routed through `@nuxt/image`.',
    bullets: [
      'Inline SSR styles',
      'Payload extraction',
      'NuxtImg lazy loading',
      'Font preload with swap'
    ]
  }
]

const { data: articles } = await useAsyncData('articles-home', () =>
  $fetch<ArticleSummary[]>('/api/articles')
)

const featuredArticles = computed(() => articles.value?.slice(0, 3) ?? [])

useSeo({
  title: 'PWA, SEO, and performance-first Nuxt starter',
  description:
    'A production-ready Nuxt 3 baseline for installable experiences, strong crawlability, and disciplined Core Web Vitals.',
  path: '/',
  image: '/images/social-card.png',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nuxt 3 PWA SEO Starter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web'
  }
})
</script>

<template>
  <div>
    <section class="hero section">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Nuxt 3 Starter Template</p>
          <h1 class="display-title">
            Installable, discoverable, and performance-aware from the first commit.
          </h1>
          <p class="lead">
            This starter demonstrates the delivery patterns behind strong Lighthouse scores,
            dependable social previews, and production-friendly Nuxt deployments.
          </p>
          <div class="button-row">
            <NuxtLink class="button" to="/about">Read architecture notes</NuxtLink>
            <NuxtLink class="button button-secondary" to="/blog">Browse example articles</NuxtLink>
          </div>
          <ul class="pill-list">
            <li class="pill">Nuxt 3 + TypeScript</li>
            <li class="pill">PWA installability</li>
            <li class="pill">Structured SEO defaults</li>
          </ul>
        </div>

        <div class="hero-media surface-card">
          <NuxtImg
            src="/images/hero-architecture.svg"
            alt="Abstract overview of the starter architecture"
            width="840"
            height="620"
            sizes="sm:100vw lg:50vw"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Lighthouse Targets"
          title="A realistic baseline for teams aiming at 90+ performance"
          description="The numbers below are the target posture for production work, not a guarantee detached from real content."
        />

        <div class="metric-grid">
          <article
            v-for="target in appConfig.lighthouseTargets"
            :key="target.label"
            class="surface-card metric-card"
          >
            <p>{{ target.label }}</p>
            <strong>{{ target.value }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <SectionHeading
          eyebrow="Why It Exists"
          title="A starter that demonstrates delivery judgment, not just framework familiarity"
          description="Recruiters and engineering leads should see practical decisions around metadata, caching, route architecture, and deployment readiness."
        />

        <div class="feature-grid">
          <FeatureCard
            v-for="pillar in pillars"
            :key="pillar.title"
            :eyebrow="pillar.eyebrow"
            :title="pillar.title"
            :description="pillar.description"
            :bullets="pillar.bullets"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Example Content"
          title="Dynamic routes that still ship coherent SEO metadata"
          description="The example blog shows dynamic titles, canonical URLs, Open Graph data, JSON-LD, and prerender-friendly route generation."
        />

        <div class="article-grid">
          <ArticleCard v-for="article in featuredArticles" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>

    <section id="readme-notes" class="section section-muted">
      <div class="container content-grid">
        <div>
          <SectionHeading
            eyebrow="Developer Notes"
            title="What this repository demonstrates to a reviewer"
            description="It shows how a senior frontend engineer sets up sensible defaults for performance, PWA behavior, and metadata quality before product complexity arrives."
          />
        </div>

        <div class="surface-card stack-card">
          <ul class="stack-list">
            <li>Route-level code splitting stays intact because pages are kept composable.</li>
            <li>Fonts are preloaded with `font-display: swap` to reduce render blocking.</li>
            <li>Service worker strategies distinguish static assets from API responses.</li>
            <li>Canonical, Open Graph, and Twitter tags all resolve from the same composable.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
