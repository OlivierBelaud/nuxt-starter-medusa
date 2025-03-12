<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

const {
  product,
} = defineProps<{
  product?: StoreProduct
}>()

const cheapestVariant = computed(() => getCheapestVariant(product))

const currentPrice = computed(() => cheapestVariant.value?.calculated_price?.calculated_amount || undefined)
const originalPrice = computed(() => cheapestVariant.value?.calculated_price?.original_amount || undefined)
const currencyCode = computed(() => cheapestVariant.value?.calculated_price?.currency_code || undefined)
</script>

<template>
  <AppLink
    :to="product?.handle ? `/products/${product?.handle}` : undefined"
    class="group"
  >
    <div
      v-if="product"
      class="rounded-lg bg-color-muted relative overflow-hidden border border-color-muted group-hover:shadow transition-shadow ease-in-out duration-150 aspect-[11/14] w-full"
    >
      <NuxtImg
        v-if="product?.thumbnail"
        :src="product.thumbnail || undefined"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <USkeleton
      v-else
      class="rounded-lg relative overflow-hidden aspect-[11/14] w-full"
    />
    <div class="flex mt-4 justify-between items-center text-sm">
      <h3 v-if="product">
        {{ product?.title }}
      </h3>
      <USkeleton
        v-else
        class="h-4 w-[160px]"
      />
      <div class="text-color-dimmed">
        <ProductPrice
          v-if="product"
          :original-price="originalPrice"
          :current-price="currentPrice"
          :currency-code="currencyCode"
          display-inline
        />
        <USkeleton
          v-else
          class="h-4 w-[60px]"
        />
      </div>
    </div>
  </AppLink>
</template>
