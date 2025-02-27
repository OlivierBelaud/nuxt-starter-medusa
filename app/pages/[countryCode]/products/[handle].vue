<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, origin, refreshCachedData, refresh } = await useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
const isStatic = computed(() => origin.value.fetchOrigin === 'static')

watchEffect(() => {
  console.log('isStatic', isStatic.value)
})

onMounted(() => {
  if (isStatic.value) {
    refreshCachedData()
  }
  else {
    refresh()
  }
})
</script>

<template>
  <div>
    <ProductDetail
      :class="{ 'animate-pulse': isStatic }"
      :product="product"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
