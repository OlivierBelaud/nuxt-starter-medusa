<script lang="ts" setup>
import type { StoreProduct } from '@medusajs/types'
import type { SortOptionsType } from '~/types/filter'

const {
  products,
  sortBy,
} = defineProps<{
  products: StoreProduct[]
  sortBy?: SortOptionsType
}>()

const productsSorted = computed(() => sortProducts(products, sortBy))
</script>

<template>
  <ul
    class="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8"
  >
    <li
      v-for="product in productsSorted"
      :key="product.id"
    >
      <ProductCard
        :product="product"
      />
    </li>
  </ul>
</template>
