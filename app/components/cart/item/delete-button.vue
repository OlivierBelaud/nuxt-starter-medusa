<script lang="ts" setup>
import type { StoreCartLineItem } from '@medusajs/types'

const {
  item,
} = defineProps<{
  item?: StoreCartLineItem
}>()

const { mutate, loading } = useDeleteLineItem()

const removeItem = () => {
  if (!item) return
  mutate(item?.id)
}
</script>

<template>
  <button
    class="cursor-pointer flex items-center gap-x-1"
    @click="removeItem()"
  >
    <UIcon
      v-if="loading"
      name="i-lucide-refresh-cw"
      class="size-4 animate-spin"
    />
    <UIcon
      v-else
      name="i-heroicons-trash"
      class="size-4"
    />
    <slot />
  </button>
</template>
