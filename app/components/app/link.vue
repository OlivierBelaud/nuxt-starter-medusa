<script setup lang="ts">
const { country } = useCountry()

const {
  to,
  countryCode,
} = defineProps<{
  to?: string
  countryCode?: string
}>()

const link = computed(() => {
  if (!to) return undefined
  return `/${countryCode || country.value?.iso_2}${to}`
})
</script>

<template>
  <span>
    <NuxtLink
      v-if="link"
      prefetch
      :to="link"
    >
      <slot />
    </NuxtLink>
    <slot v-else />
  </span>
</template>
