<script lang="ts" setup>
import type { StoreCart } from '@medusajs/types'

const { currentCountryCode } = useCurrentCountry()

defineProps<{
  title: string
  cart?: StoreCart
  isCheckout?: boolean
}>()
</script>

<template>
  <div
    v-if="!cart || (cart.items && cart.items.length > 0)"
    :cart="cart && cart.items && cart.items.length > 0 ? cart : undefined"
    class="flex flex-col gap-y-4"
  >
    <AppHeading as="h2">
      {{ title }}
    </AppHeading>
    <USeparator />
    <CartTotals
      :cart="cart"
    />
    <CartTableWrapper
      v-if="isCheckout"
      is-preview
    />
    <UButton
      v-if="!isCheckout"
      :to="`/${currentCountryCode}/checkout`"
      :block="true"
      color="neutral"
      :disabled="!cart"
      size="lg"
    >
      Go to checkout
    </UButton>
  </div>
</template>
