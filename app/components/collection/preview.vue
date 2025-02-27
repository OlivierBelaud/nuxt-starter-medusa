<script setup lang="ts">
import type { StoreCollection } from '@medusajs/types'

const {
  handle,
} = defineProps<{
  handle: StoreCollection['handle']
}>()

const { data } = await useFetchCollectionByHandle(handle)
const collection = computed(() => data.value?.collections?.[0])

const { data: productsFromCollection } = await useFetchProducts({
  query: {
    collection_id: collection.value?.id,
    limit: 4,
  },
})

const products = computed(() => productsFromCollection.value?.products || [])
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
