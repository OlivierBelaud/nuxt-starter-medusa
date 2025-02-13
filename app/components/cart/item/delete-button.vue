<script lang="ts" setup>
import type { StoreCartLineItem, StoreOrderLineItem } from '@medusajs/types'

const {
  item,
} = defineProps<{
  item?: StoreCartLineItem | StoreOrderLineItem
}>()

const { mutate, loading } = useDeleteLineItem()

const removeItem = () => {
  if (!item) return
  mutate(item?.id)
}
</script>

<template>
  <button
    class="cursor-pointer flex items-center gap-x-1"
    @click="removeItem()"
  >
    <UIcon
      v-if="loading"
      name="i-lucide-refresh-cw"
      class="size-4 animate-spin"
    />
    <UIcon
      v-else
      name="i-lucide-trash-2"
      class="size-4"
    />
    <slot />
  </button>
</template>
