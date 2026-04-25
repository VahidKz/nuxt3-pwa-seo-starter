export interface ArticleSection {
  title: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  excerpt: string
  category: string
  readingTime: string
  publishedAt: string
  updatedAt: string
  coverImage: string
  coverAlt: string
  keywords: string[]
  sections: ArticleSection[]
}

export type ArticleSummary = Omit<Article, 'sections'>

