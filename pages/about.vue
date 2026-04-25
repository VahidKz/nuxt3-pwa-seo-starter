<script setup lang="ts">
const architectureNotes = [
  {
    eyebrow: 'Metadata',
    title: 'Centralized SEO input reduces drift across growing route trees',
    description:
      'Each page passes intent into `useSeo`, and the composable emits dynamic title tags, canonical links, Open Graph tags, Twitter cards, and schema markup from that shared model.',
    bullets: [
      'Canonical URLs resolved from runtime config',
      'Reusable JSON-LD defaults',
      'Dynamic title templates'
    ]
  },
  {
    eyebrow: 'Delivery',
    title: 'Build-time defaults are chosen to protect Core Web Vitals',
    description:
      'Compression, payload extraction, inline SSR styles, and route prerendering support strong delivery characteristics without adding noisy abstraction.',
    bullets: ['Compressed public assets', 'Inline SSR styles', 'Prerendered content routes']
  },
  {
    eyebrow: 'Operations',
    title: 'The project is shaped for local Docker usage and production hosting',
    description:
      'You can run local development through Docker Compose and ship the built `.output` bundle through the multi-stage production image.',
    bullets: ['Node 20 Alpine', 'Multi-stage production build', 'Environment-driven site metadata']
  }
]

useSeo({
  title: 'Architecture notes',
  description:
    'A walkthrough of the SEO, PWA, performance, and deployment decisions inside the Nuxt 3 starter.',
  path: '/about',
  image: '/images/social-card.png'
})
</script>

<template>
  <div>
    <section class="section section-muted">
      <div class="container content-grid content-grid--balanced">
        <div>
          <p class="eyebrow">About This Starter</p>
          <h1 class="page-title">A restrained baseline for product and marketing surfaces.</h1>
          <p class="lead">
            The goal is not a flashy theme. It is a trustworthy starting point for teams that need
            PWA installability, crawlable content, solid social previews, and room to scale.
          </p>
        </div>

        <div class="surface-card">
          <NuxtImg
            src="/images/seo-architecture.svg"
            alt="Diagram showing how runtime config feeds SEO and sitemap output"
            width="760"
            height="560"
            sizes="sm:100vw lg:45vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Architecture Decisions"
          title="The important defaults are visible in code and easy to explain"
          description="This repo avoids magic where possible so teams can audit why each capability exists and how to adapt it."
        />

        <div class="feature-grid">
          <FeatureCard
            v-for="note in architectureNotes"
            :key="note.title"
            :eyebrow="note.eyebrow"
            :title="note.title"
            :description="note.description"
            :bullets="note.bullets"
          />
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container content-grid">
        <div>
          <SectionHeading
            eyebrow="Customization"
            title="What to replace first when starting a real project"
            description="Most teams only need to touch a few well-defined surfaces to turn this into a branded product foundation."
          />
        </div>

        <div class="surface-card stack-card">
          <ol class="ordered-list">
            <li>Set `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_SITE_NAME`, and the default description.</li>
            <li>Replace the icon set and social preview image with project branding.</li>
            <li>Swap the demo articles for real CMS or API-backed content routes.</li>
            <li>Adjust sitemap inclusion rules for product, content, or account areas.</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>
