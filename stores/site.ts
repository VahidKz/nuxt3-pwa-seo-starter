export const useSiteStore = defineStore('site', () => {
  const navigationOpen = ref(false)
  const installPromptDismissed = ref(false)
  const lastVisitedRoute = ref('/')

  function toggleNavigation() {
    navigationOpen.value = !navigationOpen.value
  }

  function closeNavigation() {
    navigationOpen.value = false
  }

  function dismissInstallPrompt() {
    installPromptDismissed.value = true
  }

  function recordVisit(path: string) {
    lastVisitedRoute.value = path
  }

  return {
    navigationOpen,
    installPromptDismissed,
    lastVisitedRoute,
    toggleNavigation,
    closeNavigation,
    dismissInstallPrompt,
    recordVisit
  }
})
