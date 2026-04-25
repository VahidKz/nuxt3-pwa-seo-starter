<script setup lang="ts">
import type { ArticleSummary } from '~/types/article'

const props = defineProps<{
  article: ArticleSummary
}>()

const publishedLabel = computed(() =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium'
  }).format(new Date(props.article.publishedAt))
)
</script>

<template>
  <article class="surface-card article-card">
    <NuxtLink class="article-card__image" :to="`/blog/${article.slug}`">
      <NuxtImg
        :src="article.coverImage"
        :alt="article.coverAlt"
        width="720"
        height="480"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy"
      />
    </NuxtLink>

    <div class="article-card__body">
      <div class="article-meta">
        <span>{{ article.category }}</span>
        <span>{{ article.readingTime }}</span>
        <time :datetime="article.publishedAt">{{ publishedLabel }}</time>
      </div>

      <div class="article-copy">
        <h3>
          <NuxtLink :to="`/blog/${article.slug}`">
            {{ article.title }}
          </NuxtLink>
        </h3>
        <p>{{ article.excerpt }}</p>
      </div>
    </div>
  </article>
</template>
