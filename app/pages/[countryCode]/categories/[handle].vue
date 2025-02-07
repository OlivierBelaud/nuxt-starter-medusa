<script setup lang="ts">
const route = useRoute()

const handle = route.params.handle as string
const { data: category } = await useFetchCategoryByHandle(handle)
</script>

<template>
  <StoreCatalog
    :title="category?.name"
    :category-id="category?.id"
  />
</template>
