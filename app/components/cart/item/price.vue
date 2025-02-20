<script setup lang="ts">
import type { StoreCartLineItem, StoreOrderLineItem } from '@medusajs/types'

const {
  item,
  currencyCode,
} = defineProps<{
  item: StoreCartLineItem | StoreOrderLineItem
  currencyCode?: string
}>()

const adjustmentsSum = computed(() => {
  return (item.adjustments || []).reduce((acc, adjustment) => {
    return acc + adjustment.amount
  }, 0)
})

const currentPrice = computed(() => {
  return item.total ? item.total - adjustmentsSum.value : 0
})

const originalPrice = computed(() => {
  return item.original_total || 0
})
</script>

<template>
  <div class="flex justify-end">
    <ProductPrice
      :original-price="originalPrice"
      :current-price="currentPrice"
      :currency-code="currencyCode"
      display-inline
    />
  </div>
</template>
