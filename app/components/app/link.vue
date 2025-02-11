<script setup lang="ts">
const { userCountryCode } = useUserCountry()

const {
  to,
  countryCode,
} = defineProps<{
  to: string
  countryCode?: string
}>()

const link = computed(() => {
  return `/${countryCode || userCountryCode.value}${to}`
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
