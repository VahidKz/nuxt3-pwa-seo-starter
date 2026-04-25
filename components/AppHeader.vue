<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const siteStore = useSiteStore()

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <header class="site-header">
    <div class="container shell-row">
      <NuxtLink class="brand" to="/" @click="siteStore.closeNavigation()">
        <span class="brand-mark">N3</span>
        <span>
          <strong>{{ appConfig.siteName }}</strong>
          <small>{{ appConfig.siteTagline }}</small>
        </span>
      </NuxtLink>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="siteStore.navigationOpen"
        aria-controls="site-navigation"
        @click="siteStore.toggleNavigation()"
      >
        Menu
      </button>

      <nav
        id="site-navigation"
        class="site-nav"
        :class="{ 'is-open': siteStore.navigationOpen }"
        aria-label="Primary"
      >
        <NuxtLink
          v-for="item in appConfig.navigation"
          :key="item.to"
          class="site-nav__link"
          :class="{ 'is-active': isActive(item.to) }"
          :to="item.to"
          @click="siteStore.closeNavigation()"
        >
          {{ item.label }}
        </NuxtLink>
        <a class="site-nav__link site-nav__link--external" href="#readme-notes">
          README Notes
        </a>
      </nav>
    </div>
  </header>
</template>
