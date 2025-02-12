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
  <UButton
    :to="link"
    color="primary"
    variant="link"
    :trailing="true"
    class="group"
  >
    <slot />
    <template #trailing>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="group-hover:rotate-45 ease-in-out duration-150 size-5"
      />
    </template>
  </UButton>
</template>
