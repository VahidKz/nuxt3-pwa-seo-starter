<script setup lang="ts">
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

const siteStore = useSiteStore()
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

const isVisible = computed(() => !!deferredPrompt.value && !siteStore.installPromptDismissed)

const handleBeforeInstallPrompt = (event: Event) => {
  event.preventDefault()
  deferredPrompt.value = event as BeforeInstallPromptEvent
}

const handleAppInstalled = () => {
  deferredPrompt.value = null
  siteStore.dismissInstallPrompt()
}

async function installApp() {
  if (!deferredPrompt.value) {
    return
  }

  await deferredPrompt.value.prompt()
  await deferredPrompt.value.userChoice
  deferredPrompt.value = null
}

function dismissPrompt() {
  siteStore.dismissInstallPrompt()
  deferredPrompt.value = null
}

if (import.meta.client) {
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
  })
}
</script>

<template>
  <aside v-if="isVisible" class="prompt-banner" aria-live="polite">
    <div>
      <p class="prompt-banner__eyebrow">Installable by design</p>
      <p class="prompt-banner__copy">
        This starter surfaces the browser install prompt only when the platform is ready.
      </p>
    </div>

    <div class="prompt-banner__actions">
      <button class="button" type="button" @click="installApp()">Install app</button>
      <button class="button button-ghost" type="button" @click="dismissPrompt()">Dismiss</button>
    </div>
  </aside>
</template>
