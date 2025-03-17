<script lang="ts" setup>
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="text-center mb-8">
    <h2 class="text-xl font-bold mb-2">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-sm text-gray-600"
    >
      {{ description }}
    </p>
  </div>
</template>
