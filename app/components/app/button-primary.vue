<script lang="ts" setup>
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  to?: string
  loading?: boolean
  disabled?: boolean
  block?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<template>
  <UButton
    :type="type || 'button'"
    :to="to"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    variant="solid"
    color="neutral"
    :size="size || 'lg'"
    class="bg-black text-white hover:bg-gray-800"
  >
    <slot />
  </UButton>
</template>
