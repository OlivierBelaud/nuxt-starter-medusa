<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, origin, refreshCachedData } = await useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
const isStatic = computed(() => origin.value.fetchOrigin === 'static')

// onMounted(() => {
//   console.log('Product page mounted')
//   refreshCachedData()
// })
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
