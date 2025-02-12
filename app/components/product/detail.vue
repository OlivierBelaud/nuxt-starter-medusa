<script lang="ts" setup>
import type { StoreProduct } from '@medusajs/types'

defineProps<{
  product: StoreProduct
}>()
</script>

<template>
  <div>
    <UContainer class="flex flex-col sm:flex-row sm:items-start py-6 relative">
      <div class="flex flex-col sm:sticky sm:top-48 sm:py-0 sm:max-w-[300px] w-full py-8 gap-y-6">
        <ProductInfo :product="product" />
      </div>
      <div class="block w-full relative">
        <ProductGallery :product="product" />
      </div>
      <div class="flex flex-col sm:sticky sm:top-48 sm:py-0 sm:max-w-[300px] w-full py-8 gap-y-12">
        <ProductVariantSelector
          :product="product"
        />
      </div>
    </UContainer>
  </div>
</template>
