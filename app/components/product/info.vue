<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

defineProps<{
  product?: StoreProduct
}>()
</script>

<template>
  <div class="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
    <AppLink
      v-if="product"
      :to="`/collections/${product?.collection?.handle}`"
      class=""
    >
      {{ product?.collection?.title }}
    </AppLink>
    <USkeleton
      v-else
      class="h-6 w-[160px]"
    />
    <h1
      v-if="product"
      class="text-3xl leading-10 font-medium text-color-highlighted"
    >
      {{ product?.title }}
    </h1>
    <USkeleton
      v-else
      class="h-8 w-full"
    />
    <p
      class="text-sm text-color-toned leading-6"
    >
      {{ product?.description }}
    </p>
  </div>
</template>
