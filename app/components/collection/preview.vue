<script setup lang="ts">
import type { StoreCollection } from '@medusajs/types'

const {
  handle,
} = defineProps<{
  handle: StoreCollection['handle']
}>()

const { data: collection } = await useFetchCollectionByHandle(handle)

const { data } = await useFetchProductsWithCache({
  query: {
    collection_id: collection.value?.id,
    limit: 4,
  },
})

const products = computed(() => data.value?.products || [])
</script>

<template>
  <UContainer
    class="py-12 sm:py-24"
  >
    <div class="flex justify-between mb-8">
      <p class="font-medium text-2xl">
        {{ collection?.title }}
      </p>
      <AppLinkButton
        :to="`/collections/${collection?.handle}`"
        class="pl-0"
      >
        View all
      </AppLinkButton>
    </div>
    <ProductList
      :products="products"
    />
  </UContainer>
</template>
