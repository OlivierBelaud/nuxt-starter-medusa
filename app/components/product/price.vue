<script lang="ts" setup>
const {
  originalPrice,
  currentPrice,
  currencyCode,
  displayInline,
  isCheapest,
  extended,
} = defineProps<{
  originalPrice?: number
  currentPrice?: number
  currencyCode?: string
  displayInline?: boolean
  isCheapest?: boolean
  extended?: boolean
}>()

const percentageDiff = computed(() => getPercentageDiff(originalPrice, currentPrice))
const hasReducedPrice = computed(() => currentPrice && originalPrice ? currentPrice < originalPrice : false)
</script>

<template>
  <div
    class="flex gap-x-2"
    :class="[displayInline ? 'flex-row items-center' : 'flex-col']"
  >
    <div
      v-if="hasReducedPrice"
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
      :class="{ 'text-primary-500': hasReducedPrice }"
    >
      <span v-if="isCheapest">From</span>
      <StoreLocalizedPrice
        :amount="currentPrice"
        :currency-code="currencyCode"
      />
      <div
        v-if="hasReducedPrice && extended"
        class="text-primary-500"
      >
        (-{{ percentageDiff }}%)
      </div>
    </div>
  </div>
</template>
