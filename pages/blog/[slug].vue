<script setup lang="ts">
import type { Article } from '~/types/article'
import { getArticleSummaries } from '~/data/articles'

const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  $fetch<Article>(`/api/articles/${slug}`)
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found'
  })
}

const entry = article.value
const relatedArticles = getArticleSummaries()
  .filter(candidate => candidate.slug !== entry.slug)
  .slice(0, 2)

useSeo({
  title: entry.title,
  description: entry.description,
  path: `/blog/${entry.slug}`,
  image: '/images/social-card.png',
  imageAlt: entry.coverAlt,
  type: 'article',
  keywords: entry.keywords,
  publishedTime: entry.publishedAt,
  modifiedTime: entry.updatedAt,
  section: entry.category
})

const publishedLabel = new Intl.DateTimeFormat('en', {
  dateStyle: 'long'
}).format(new Date(entry.publishedAt))

const updatedLabel = new Intl.DateTimeFormat('en', {
  dateStyle: 'long'
}).format(new Date(entry.updatedAt))
</script>

<template>
  <div>
    <section class="section section-muted">
      <div class="container article-hero">
        <div class="article-hero__copy">
          <p class="eyebrow">{{ entry.category }}</p>
          <h1 class="page-title">{{ entry.title }}</h1>
          <p class="lead">{{ entry.description }}</p>
          <div class="article-meta article-meta--hero">
            <time :datetime="entry.publishedAt">{{ publishedLabel }}</time>
            <span>{{ entry.readingTime }}</span>
            <span>Updated {{ updatedLabel }}</span>
          </div>
        </div>

        <div class="surface-card article-hero__media">
          <NuxtImg
            :src="entry.coverImage"
            :alt="entry.coverAlt"
            width="900"
            height="620"
            sizes="sm:100vw lg:50vw"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container article-layout">
        <article class="article-body surface-card">
          <section v-for="section in entry.sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </section>
        </article>

        <aside class="surface-card article-sidebar">
          <h2>Route metadata</h2>
          <ul class="stack-list">
            <li>Dynamic title and canonical URL</li>
            <li>Open Graph and Twitter card tags</li>
            <li>Article JSON-LD plus organization schema</li>
            <li>Prerendered route with sitemap coverage</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <SectionHeading
          eyebrow="Related Articles"
          title="More sample routes"
          description="These examples are intentionally small, but they use the same metadata and routing model that scales to larger content surfaces."
        />

        <div class="article-grid article-grid--compact">
          <ArticleCard v-for="related in relatedArticles" :key="related.slug" :article="related" />
        </div>
      </div>
    </section>
  </div>
</template>
