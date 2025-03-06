<script setup lang="ts">
const { country } = useCountry()

const {
  to,
  countryCode,
} = defineProps<{
  to: string
  countryCode?: string
}>()

const link = computed(() => {
  return `/${countryCode || country.value?.iso_2}${to}`
})
</script>

<template>
  <div>
    <NuxtLink
      prefetch
      :to="link"
    >
      <slot />
    </NuxtLink>
  </div>
</template>
