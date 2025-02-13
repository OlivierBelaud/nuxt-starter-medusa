<script lang="ts" setup>
import type { StoreCartLineItem, StoreOrderLineItem } from '@medusajs/types'

const {
  item,
} = defineProps<{
  item: StoreCartLineItem | StoreOrderLineItem
}>()

const { mutate, loading } = useUpdateLineItem()

const updateQuantity = (quantity: number) => {
  if (quantity !== item.quantity)
    mutate(item.id, { quantity })
}
</script>

<template>
  <div class="flex items-center gap-x-3">
    <UInputNumber
      :model-value="item?.quantity"
      color="neutral"
      class="w-20"
      size="sm"
      :max="10"
      :min="1"
      @update:model-value="updateQuantity"
    />
    <UIcon
      v-if="loading"
      name="i-lucide-refresh-cw"
      class="size-4 animate-spin"
    />
    <CartItemDeleteButton
      v-else
      :item="item"
    />
  </div>
</template>
