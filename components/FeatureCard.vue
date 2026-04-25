<script setup lang="ts">
interface Props {
  eyebrow: string
  title: string
  description: string
  bullets?: string[]
}

withDefaults(defineProps<Props>(), {
  bullets: () => []
})
</script>

<template>
  <article class="surface-card feature-card">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h3>{{ title }}</h3>
    <p class="card-copy">{{ description }}</p>
    <ul v-if="bullets.length" class="card-list">
      <li v-for="bullet in bullets" :key="bullet">
        {{ bullet }}
      </li>
    </ul>
  </article>
</template>
