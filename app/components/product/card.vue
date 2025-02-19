<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

// const { currentRegionId } = useCurrentCountry()

const {
  product: _product,
} = defineProps<{
  product: StoreProduct
}>()

const { data } = await useFetchProductByHandle(_product.handle)

const product = computed(() => data.value || _product)

const cheapestVariant = computed(() => getCheapestVariant(product.value))

const currentPrice = computed(() => cheapestVariant.value?.calculated_price?.calculated_amount || undefined)
const originalPrice = computed(() => cheapestVariant.value?.calculated_price?.original_amount || undefined)
const currencyCode = computed(() => cheapestVariant.value?.calculated_price?.currency_code || undefined)

// onMounted(() => {
//   refreshNuxtData(`product:${_product.handle}:region:${currentRegionId.value}`)
// })
</script>

<template>
  <AppLink
    :to="`/products/${product?.handle}`"
    class="group"
  >
    <div class="rounded-lg bg-color-muted relative overflow-hidden border border-color-muted group-hover:shadow transition-shadow ease-in-out duration-150 aspect-[11/14] w-full">
      <NuxtImg
        v-if="product?.thumbnail"
        :src="product.thumbnail || undefined"
        :srcset="product.thumbnail || undefined"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <div class="flex mt-4 justify-between items-center text-sm">
      <h3>
        {{ product?.title }}
      </h3>
      <div class="text-color-dimmed">
        <ProductPrice
          :original-price="originalPrice"
          :current-price="currentPrice"
          :currency-code="currencyCode"
          display-inline
        />
      </div>
    </div>
  </AppLink>
</template>
