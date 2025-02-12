<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

const {
  productFromList,
} = defineProps<{
  productFromList: StoreProduct
}>()

const { data: product } = await useFetchProductByHandle(productFromList.handle)

const cheapestVariant = computed(() => getCheapestVariant(product.value))

onMounted(() => {
  refreshNuxtData(`product:${productFromList.handle}`)
})
</script>

<template>
  <AppLink
    :to="`/products/${product?.handle}`"
    class="group"
  >
    <div class="rounded-lg bg-color-muted relative overflow-hidden border border-color-muted group-hover:shadow transition-shadow ease-in-out duration-150 aspect-[11/14] w-full">
      <NuxtImg
        v-if="product?.thumbnail"
        :src="product.thumbnail || undefined"
        :srcset="product.thumbnail || undefined"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <div class="flex mt-4 justify-between items-center text-sm">
      <h3>
        {{ product?.title }}
      </h3>
      <div class="text-color-dimmed">
        <ProductPrice
          :variant="cheapestVariant"
          display-inline
        />
      </div>
    </div>
  </AppLink>
</template>
