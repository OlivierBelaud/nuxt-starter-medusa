<script setup lang="ts">
const { currentCountryCode } = useCurrentCountry()

const {
  to,
  countryCode,
} = defineProps<{
  to: string
  countryCode?: string
}>()

const link = computed(() => {
  return `/${countryCode || currentCountryCode.value}${to}`
})
</script>

<template>
  <ULink
    active-class="text-color-highlighted"
    :to="link"
  >
    <slot />
  </ULink>
</template>
