<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  align: 'left'
})
</script>

<template>
  <div class="section-heading" :class="`section-heading--${align}`">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p class="section-copy">{{ description }}</p>
  </div>
</template>
