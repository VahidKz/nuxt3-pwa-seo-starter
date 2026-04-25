import { articles } from '~/data/articles'

export default defineEventHandler(() => [
  {
    loc: '/',
    lastmod: '2026-04-25'
  },
  {
    loc: '/about',
    lastmod: '2026-04-25'
  },
  {
    loc: '/blog',
    lastmod: '2026-04-25'
  },
  ...articles.map(article => ({
    loc: `/blog/${article.slug}`,
    lastmod: article.updatedAt
  }))
])
