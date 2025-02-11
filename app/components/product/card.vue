<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

const { userRegionId } = useUserCountry()

const {
  productFromList,
} = defineProps<{
  productFromList: StoreProduct
}>()

const fetchProductsParams = computed(() => ({
  region_id: userRegionId.value,
}))
const fetchProductKey = computed(() => `product:${productFromList.handle}-${JSON.stringify(fetchProductsParams.value)}`)
const { data } = await useLazyFetch(`/api/products/${productFromList.handle}`, {
  params: fetchProductsParams,
  key: fetchProductKey.value,
})

const product = computed(() => data.value || productFromList)

const cheapestVariant = computed(() => getCheapestVariant(product.value))

onMounted(async () => {
  // Refresh the static cache with the latest data on client side
  await refreshNuxtData(fetchProductKey.value)
})
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
          :variant="cheapestVariant"
          display-inline
        />
      </div>
    </div>
  </AppLink>
</template>
