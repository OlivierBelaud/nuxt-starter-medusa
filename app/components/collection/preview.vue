<script setup lang="ts">
import type { StoreCollection } from '@medusajs/types'

const {
  handle,
} = defineProps<{
  handle: StoreCollection['handle']
}>()

const { data: collection } = await useFetchCollectionByHandle(handle)
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
    <CollectionPreviewProducts
      v-if="collection?.id"
      :collection-id="collection.id"
    />
    <ProductListSkeleton v-else />
  </UContainer>
</template>
