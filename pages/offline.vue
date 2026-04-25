<script setup lang="ts">
useSeo({
  title: 'Offline fallback',
  description:
    'The offline route gives users a predictable fallback when navigation happens without network access.',
  path: '/offline',
  noindex: true
})
</script>

<template>
  <section class="section section-muted">
    <div class="container narrow-shell">
      <div class="surface-card offline-card">
        <p class="eyebrow">Offline Ready</p>
        <h1 class="page-title">You are viewing the cached fallback.</h1>
        <p class="lead">
          Static assets remain available and previously cached routes can still resolve, but live API
          data may need the network before it refreshes.
        </p>
        <div class="button-row button-row--center">
          <NuxtLink class="button" to="/">Return home</NuxtLink>
          <NuxtLink class="button button-secondary" to="/blog">Open cached articles</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
