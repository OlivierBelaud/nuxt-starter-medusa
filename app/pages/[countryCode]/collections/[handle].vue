<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data: collection } = await useFetchCollectionByHandle(handle.value)
</script>

<template>
  <StoreCatalog
    :title="collection?.title"
    :collection-id="collection?.id"
  />
</template>
