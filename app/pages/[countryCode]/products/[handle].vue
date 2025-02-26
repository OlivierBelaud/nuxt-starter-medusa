<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, isStatic } = await useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
</script>

<template>
  <div>
    <ProductDetail
      :product="product"
      :loading="isStatic"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
