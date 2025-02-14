<script setup lang="ts">
const route = useRoute()

const handle = route.params.handle as string
const { data: product } = await useFetchProductByHandle(handle)
</script>

<template>
  <div>
    <div>{{ product?.title }}</div>
    <!-- <LazyProductDetail
      v-if="product"
      :product="product"
    /> -->
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
