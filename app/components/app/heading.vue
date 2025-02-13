<script lang="ts" setup>
defineProps<{
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
</script>

<template>
  <component
    :is="as"
    class="text-3xl font-medium text-color-highlighted"
  >
    <slot />
  </component>
</template>
