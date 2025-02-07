<script setup lang="ts">
const route = useRoute()

const handle = route.params.handle as string
const { data: collection } = await useFetchCollectionByHandle(handle)
</script>

<template>
  <StoreCatalog
    :title="collection?.title"
    :collection-id="collection?.id"
  />
</template>
