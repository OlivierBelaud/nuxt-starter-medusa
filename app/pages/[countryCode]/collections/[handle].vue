<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
const { data } = await useFetchCollectionByHandle(handle.value)
const collection = computed(() => data.value?.collections?.[0])
</script>

<template>
  <StoreCatalog
    :title="collection?.title"
    :collection-id="collection?.id"
  />
</template>
