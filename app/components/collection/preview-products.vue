<script setup lang="ts">
import type { StoreCollection } from '@medusajs/types'

const {
  collectionId,
} = defineProps<{
  collectionId?: StoreCollection['id']
}>()

const { data: productsFromCollection, status } = await useFetchProducts({
  collection_id: collectionId,
  limit: 4,
})

const products = computed(() => productsFromCollection.value?.products || [])
</script>

<template>
  <ProductList
    v-if="products"
    :products="products"
  />
  <ProductListSkeleton v-if="products?.length === 0 && status === 'pending'" />
</template>
