<script setup lang="ts">
import type { StoreOrder } from '@medusajs/types'

const {
  order,
  isPreview,
  isDropDown,
} = defineProps<{
  order?: StoreOrder
  isPreview?: boolean
  isDropDown?: boolean
}>()
</script>

<template>
  <div>
    <template v-if="order?.items">
      <CartTable
        v-if="order.items.length > 0"
        :cart="order"
        :is-preview="isPreview"
        :is-drop-down="isDropDown"
      />
      <CartEmpty v-else-if="!isPreview && !isDropDown" />
    </template>
    <template v-else>
      <CartTableSkeleton
        :is-preview="isPreview"
        :is-drop-down="isDropDown"
      />
    </template>
  </div>
</template>
