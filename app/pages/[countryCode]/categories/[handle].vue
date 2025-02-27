<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data } = await useFetchCategoryByHandle(handle.value)
const category = computed(() => data.value?.product_categories?.[0])
</script>

<template>
  <StoreCatalog
    :title="category?.name"
    :category-id="category?.id"
  />
</template>
