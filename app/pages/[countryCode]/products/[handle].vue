<script setup lang="ts">
const route = useRoute()
const { currentRegionId } = useRegions()

const handle = route.params.handle as string

const fetchProductsParams = computed(() => ({
  handle,
  region_id: currentRegionId.value,
}))
const fetchProductKey = computed(() => `product:${JSON.stringify(fetchProductsParams.value)}`)
const { data } = await useLazyFetch('/api/products', {
  params: fetchProductsParams,
  key: fetchProductKey.value,
})
const product = computed(() => data.value?.products?.[0])

onMounted(async () => {
  // Refresh the static cache with the latest data on client side
  await refreshNuxtData(fetchProductKey.value)
})
</script>

<template>
  <div>
    <ProductDetail :product="product" />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
