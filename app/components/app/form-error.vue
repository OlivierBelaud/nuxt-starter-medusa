<script lang="ts" setup>
defineProps<{
  message?: string
  show?: boolean
}>()
</script>

<template>
  <UAlert
    v-if="show && message"
    color="error"
    variant="soft"
    size="xs"
    :ui="{
      wrapper: 'bg-red-50 px-3 py-2',
      description: 'text-xs text-red-500',
      icon: 'text-red-500',
    }"
    icon="i-heroicons-exclamation-circle"
    :title="message"
  />
</template>
