<script lang="ts" setup>
import type { StoreProductVariant } from '@medusajs/types'

const {
  variant,
  displayInline,
  isCheapest,
  extended,
} = defineProps<{
  variant?: StoreProductVariant
  displayInline?: boolean
  isCheapest?: boolean
  extended?: boolean
}>()

const calculatedPrice = computed(() => variant?.calculated_price?.calculated_amount || undefined)
const originalPrice = computed(() => variant?.calculated_price?.original_amount || undefined)
const percentageDiff = computed(() => getPercentageDiff(originalPrice.value, calculatedPrice.value))
const isOnSale = computed(() => variant?.calculated_price?.calculated_price?.price_list_type === 'sale')
const currencyCode = computed(() => variant?.calculated_price?.currency_code || undefined)
</script>

<template>
  <div
    class="flex gap-x-2"
    :class="[displayInline ? 'flex-row items-center' : 'flex-col']"
  >
    <div
      v-if="isOnSale"
      class="flex items-center gap-x-1"
    >
      <span v-if="extended">Original:</span>
      <StoreLocalizedPrice
        :amount="originalPrice"
        :currency-code="currencyCode"
        class="line-through"
      />
    </div>
    <div
      class="flex items-center gap-x-1"
      :class="{ 'text-primary-500': isOnSale }"
    >
      <span v-if="isCheapest">From</span>
      <StoreLocalizedPrice
        :amount="calculatedPrice"
        :currency-code="currencyCode"
      />
      <div
        v-if="isOnSale && extended"
        class="text-primary-500"
      >
        (-{{ percentageDiff }}%)
      </div>
    </div>
  </div>
</template>
