<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data, origin, refresh } = await useFetchProductByHandle(handle.value)
const product = computed(() => data.value?.products[0])
const isStatic = computed(() => origin.value.fetchOrigin === 'static')

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
