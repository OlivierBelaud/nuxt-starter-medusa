<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data: product } = await useFetchProductByHandle(handle.value)
</script>

<template>
  <div>
    <LazyProductDetail
      v-if="product"
      :product="product"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
