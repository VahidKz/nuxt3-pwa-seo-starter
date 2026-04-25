<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-label">Nuxt Starter</p>
        <h2>{{ appConfig.siteName }}</h2>
        <p class="footer-copy">
          A restrained baseline for teams that care about Lighthouse targets, discoverability,
          installability, and clean developer handoff.
        </p>
      </div>

      <div class="footer-links">
        <NuxtLink to="/about">Architecture Notes</NuxtLink>
        <NuxtLink to="/blog">Example Content</NuxtLink>
        <NuxtLink to="/offline">Offline Fallback</NuxtLink>
        <a
          href="https://nuxt.com/docs/getting-started/introduction"
          target="_blank"
          rel="noreferrer"
        >
          Nuxt Documentation
        </a>
      </div>
    </div>
  </footer>
</template>
