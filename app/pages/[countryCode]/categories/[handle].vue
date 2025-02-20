<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data: category } = await useFetchCategoryByHandle(handle.value)
</script>

<template>
  <StoreCatalog
    :title="category?.name"
    :category-id="category?.id"
  />
</template>
