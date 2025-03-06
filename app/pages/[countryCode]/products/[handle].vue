<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data: product } = await useFetchProductByHandle(handle.value)
</script>

<template>
  <div>
    <ProductDetail
      :product="product"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
