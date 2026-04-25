import process from 'node:process'
import { articleSlugs } from './data/articles'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://nuxt3-pwa-seo-starter.example.com'
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || 'Nuxt 3 PWA SEO Starter'
const siteDescription =
  process.env.NUXT_PUBLIC_SITE_DESCRIPTION ||
  'A production-ready Nuxt 3 starter focused on PWA installability, crawlability, and Core Web Vitals.'

const articleRoutes = articleSlugs.map(slug => `/blog/${slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2026-04-25',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: `%s | ${siteName}`,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f766e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl,
      siteName,
      siteDescription,
      siteLocale: process.env.NUXT_PUBLIC_SITE_LOCALE || 'en_US'
    }
  },
  site: {
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    defaultLocale: 'en-US'
  },
  image: {
    quality: 80,
    format: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/blog': { prerender: true },
    '/offline': { prerender: true },
    '/blog/**': { prerender: true },
    '/api/articles': { swr: 300 },
    '/api/articles/**': { swr: 300 }
  },
  nitro: {
    // Compress generated public assets so deployments can serve smaller payloads immediately.
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/blog',
        '/offline',
        '/robots.txt',
        '/sitemap.xml',
        '/api/__sitemap__/urls',
        ...articleRoutes,
        ...articleSlugs.map(slug => `/api/articles/${slug}`)
      ]
    }
  },
  features: {
    // Inline styles help reduce render-blocking CSS for above-the-fold content.
    inlineStyles: true
  },
  experimental: {
    // Payload extraction keeps prerendered payloads separate and cache-friendly.
    payloadExtraction: true
  },
  vite: {
    build: {
      // Nuxt already code-splits per route; cssCodeSplit keeps route CSS granular too.
      cssCodeSplit: true
    }
  },
  robots: {
    sitemap: `${siteUrl}/sitemap.xml`,
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/**', '/offline']
      }
    ]
  },
  sitemap: {
    autoLastmod: true,
    sources: ['/api/__sitemap__/urls']
  },
  pwa: {
    registerType: 'autoUpdate',
    client: {
      installPrompt: true
    },
    includeAssets: ['icons/favicon.svg', 'icons/apple-touch-icon.png', 'images/social-card.png'],
    manifest: {
      name: siteName,
      short_name: 'Nuxt SEO',
      description: siteDescription,
      theme_color: '#0f766e',
      background_color: '#f5f2ea',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/offline',
      navigateFallbackDenylist: [/^\/api\//, /^\/robots\.txt$/, /^\/sitemap\.xml$/],
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /\.(?:js|css|png|svg|webp|avif|woff2)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-assets',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 80,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: /\/api\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-responses',
            networkTimeoutSeconds: 3,
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 40,
              maxAgeSeconds: 60 * 60
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
