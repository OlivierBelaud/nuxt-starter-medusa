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
  <UButton
    :to="link"
    prefetch
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
