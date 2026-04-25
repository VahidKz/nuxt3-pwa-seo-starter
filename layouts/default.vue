<script setup lang="ts">
const route = useRoute()
const siteStore = useSiteStore()

watch(
  () => route.fullPath,
  path => {
    siteStore.recordVisit(path)
    siteStore.closeNavigation()
  },
  { immediate: true }
)
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-shell">
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <InstallPrompt />
    </ClientOnly>
  </div>
</template>
