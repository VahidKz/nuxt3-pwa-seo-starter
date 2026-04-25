interface SeoSchemaNode {
  [key: string]: unknown
}

interface SeoInput {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
  section?: string
  schema?: SeoSchemaNode | SeoSchemaNode[]
}

function resolveAbsoluteUrl(siteUrl: string, path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return new URL(path.startsWith('/') ? path : `/${path}`, siteUrl).toString()
}

export function useSeo(input: SeoInput) {
  const route = useRoute()
  const {
    public: { siteDescription, siteLocale, siteName, siteUrl }
  } = useRuntimeConfig()

  const canonicalPath = input.path || route.path
  const canonicalUrl = resolveAbsoluteUrl(siteUrl, canonicalPath)
  const imageUrl = resolveAbsoluteUrl(siteUrl, input.image || '/images/social-card.png')
  const schemaNodes = Array.isArray(input.schema) ? input.schema : input.schema ? [input.schema] : []

  const organizationSchema: SeoSchemaNode = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: resolveAbsoluteUrl(siteUrl, '/icons/icon-512x512.png')
  }

  const pageSchema =
    input.type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: input.title,
          description: input.description,
          image: [imageUrl],
          mainEntityOfPage: canonicalUrl,
          author: {
            '@type': 'Organization',
            name: siteName
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: resolveAbsoluteUrl(siteUrl, '/icons/icon-512x512.png')
            }
          },
          datePublished: input.publishedTime,
          dateModified: input.modifiedTime || input.publishedTime
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          description: siteDescription,
          url: siteUrl
        }

  useHead({
    title: input.title,
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ],
    script: [
      {
        id: 'structured-data',
        type: 'application/ld+json',
        innerHTML: JSON.stringify([organizationSchema, pageSchema, ...schemaNodes])
      }
    ]
  })

  useSeoMeta({
    title: input.title,
    description: input.description,
    keywords: input.keywords?.join(', '),
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
    ogTitle: input.title,
    ogDescription: input.description,
    ogType: input.type || 'website',
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageAlt: input.imageAlt || input.title,
    ogSiteName: siteName,
    ogLocale: siteLocale,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: imageUrl,
    twitterImageAlt: input.imageAlt || input.title,
    articlePublishedTime: input.publishedTime,
    articleModifiedTime: input.modifiedTime,
    articleSection: input.section
  })
}
