<script setup lang="ts">
const route = useRoute()

const handle = route.params.handle as string
const { data: collection } = await useFetchCollectionByHandle(handle)

const medusa = useMedusaClient()
const { data: collectionFromModule } = await useLazyAsyncData(`collection:${handle}`, async () => {
  return await medusa.store.collection.list({
    handle: handle,
  })
})
console.log('collectionFromModule', collectionFromModule.value)
</script>

<template>
  <StoreCatalog
    :title="collection?.title"
    :collection-id="collection?.id"
  />
</template>
