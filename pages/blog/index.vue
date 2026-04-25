<script setup lang="ts">
import type { ArticleSummary } from '~/types/article'

const { data: articles } = await useAsyncData('articles-list', () =>
  $fetch<ArticleSummary[]>('/api/articles')
)

useSeo({
  title: 'Example content routes',
  description:
    'Sample articles used to demonstrate dynamic meta tags, schema markup, sitemap generation, and prerender-friendly blog routes.',
  path: '/blog',
  image: '/images/social-card.png'
})
</script>

<template>
  <div>
    <section class="section section-muted">
      <div class="container">
        <SectionHeading
          eyebrow="Blog"
          title="Content routes with metadata that stays coherent"
          description="These example articles show how the starter treats route data, social previews, and structured markup as part of the page contract."
        />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="article-grid">
          <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>
  </div>
</template>
