import { getArticleBySlug } from '~/data/articles'

export default defineEventHandler(event => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing article slug'
    })
  }

  const article = getArticleBySlug(slug)

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found'
    })
  }

  return article
})
