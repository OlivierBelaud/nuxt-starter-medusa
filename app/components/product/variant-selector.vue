<script lang="ts" setup>
import type { StoreProduct } from '@medusajs/types'
import lodash from 'lodash'

const { isEqual } = lodash
const { currentRegionId } = useCurrentCountry()

const {
  product: _product,
} = defineProps<{
  product: StoreProduct
}>()

const { data } = await useFetchProductByHandle(_product?.handle)

const product = computed(() => data.value || _product)

onMounted(() => {
  refreshNuxtData(`product:${_product?.handle}:region:${currentRegionId.value}`)
})
const selectedOptions = ref<Record<string, string | undefined>>()

const cheapestVariant = computed(() => getCheapestVariant(product.value))
const hasMoreThanOneVariant = computed(() => (product.value?.variants?.length ?? 0) > 1)

// If there is only 1 variant, preselect the options
watch(() => product.value?.variants, (variants) => {
  if (variants?.length === 1 && variants[0]?.options) {
    const variantOptions = optionsAsKeyMap(variants[0].options)
    if (!variantOptions) return
    selectedOptions.value = variantOptions
  }
}, { immediate: true })

const selectedVariant = computed(() => {
  if (!selectedOptions.value || !product.value?.variants || product.value.variants.length === 0) return
  return product.value.variants.find((variant) => {
    const variantOptions = optionsAsKeyMap(variant.options)
    return isEqual(variantOptions, selectedOptions.value)
  })
})

const isValidVariant = computed(() => {
  return product.value?.variants?.some((variant) => {
    const variantOptions = optionsAsKeyMap(variant.options)
    return isEqual(variantOptions, selectedOptions.value)
  })
})

const inStock = computed(() => {
  // If we don't manage inventory, we can always add to cart
  if (selectedVariant.value && !selectedVariant.value.manage_inventory) {
    return true
  }

  // If we allow back orders on the variant, we can add to cart
  if (selectedVariant.value?.allow_backorder) {
    return true
  }

  // If there is inventory available, we can add to cart
  if (
    selectedVariant.value?.manage_inventory
    && (selectedVariant.value?.inventory_quantity || 0) > 0
  ) {
    return true
  }

  // Otherwise, we can't add to cart
  return false
})

const buttonLabel = computed(() => {
  if (!selectedVariant.value && !selectedOptions.value) {
    return 'Select variant'
  }

  if (!inStock.value || !isValidVariant.value) {
    return 'Out of stock'
  }

  return 'Add to cart'
})

const disabled = computed(() => {
  return !selectedVariant.value || !inStock.value || !isValidVariant.value
})

// update the options when a variant is selected
function setOptionValue({ optionId, value }: { optionId: string, value: string }) {
  selectedOptions.value = {
    ...selectedOptions.value,
    [optionId]: value,
  }
}
const { loading, mutate } = useAddToCart()
const { isCartDropdownOpen } = useCartDropdown()
async function handleAddToCart() {
  if (!selectedVariant.value) return
  await mutate({
    variant_id: selectedVariant.value?.id,
    quantity: 1,
  })
  isCartDropdownOpen.value = true
}

const variantForPrice = computed(() => selectedVariant.value || cheapestVariant.value)

const currentPrice = computed(() => variantForPrice.value?.calculated_price?.calculated_amount || undefined)
const originalPrice = computed(() => variantForPrice.value?.calculated_price?.original_amount || undefined)
const currencyCode = computed(() => variantForPrice.value?.calculated_price?.currency_code || undefined)
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div
      v-if="hasMoreThanOneVariant"
      class="flex flex-col gap-y-4"
    >
      <ProductOptionSelector
        v-for="option in product?.options"
        :key="option.id"
        :option="option"
        :current="selectedOptions?.[option.id]"
        @select:option="setOptionValue"
      />
      <USeparator />
    </div>
    <ProductPrice
      :original-price="originalPrice"
      :current-price="currentPrice"
      :currency-code="currencyCode"
      :is-cheapest="!selectedVariant"
      extended
    />
    <UButton
      nuxt-client
      color="neutral"
      class="cursor-pointer"
      :block="true"
      :disabled="disabled"
      :loading="loading"
      @click="handleAddToCart"
    >
      {{ buttonLabel }}
    </UButton>
  </div>
</template>
