<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, origin, refreshCachedData } = useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
const isStatic = computed(() => origin.value.fetchOrigin === 'static')

onMounted(() => {
  // here i want to have the freshest data possible, so I will tel the browser each time.
  console.log('Product page mounted')
  refreshCachedData()
})
</script>

<template>
  <div>
    <ProductDetail
      v-if="product"
      :class="{ 'animate-pulse': isStatic }"
      :product="product"
      :loading="isStatic"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
