<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

defineProps<{
  product?: StoreProduct
}>()
</script>

<template>
  <div class="flex items-start relative">
    <div class="flex flex-col flex-1 sm:mx-16 gap-y-4">
      <div class="rounded-lg bg-color-muted relative aspect-[29/34] w-full overflow-hidden border border-color-muted">
        <NuxtImg
          v-if="product?.images?.[0]?.url"
          :src="product?.images?.[0]?.url"
        />
      </div>
    </div>
  </div>
</template>
