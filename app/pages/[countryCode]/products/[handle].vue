<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, origin, refreshCachedData, refresh } = useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
const isStatic = computed(() => origin.value.fetchOrigin === 'static')

onMounted(() => {
  if (isStatic.value) {
    // Here we want to have the freshest data possible.
    console.log('Product page mounted')
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
      v-if="product"
      :class="{ 'animate-pulse': isStatic }"
      :product="product"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
