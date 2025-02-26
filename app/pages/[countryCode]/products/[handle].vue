<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, isStatic, refresh } = await useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])

onMounted(() => {
  console.log('Product page mounted')
  refresh()
})
</script>

<template>
  <div>
    <ProductDetail
      :class="{ 'animate-pulse': isStatic }"
      :product="product"
      :loading="isStatic"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
