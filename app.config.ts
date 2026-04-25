export default defineAppConfig({
  siteName: 'Nuxt 3 PWA SEO Starter',
  siteTagline: 'Installable, crawlable, and performance-first from day one.',
  navigation: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' }
  ],
  lighthouseTargets: [
    { label: 'Performance', value: '90+' },
    { label: 'SEO', value: '100' },
    { label: 'Best Practices', value: '95+' },
    { label: 'Accessibility', value: '95+' }
  ]
})
