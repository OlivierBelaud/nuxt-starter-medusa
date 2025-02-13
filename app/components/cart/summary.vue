<script lang="ts" setup>
import type { StoreCart } from '@medusajs/types'

const { currentCountryCode } = useCurrentCountry()

defineProps<{
  title: string
  cart: StoreCart
  isCheckout?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <AppHeading as="h2">
      {{ title }}
    </AppHeading>
    <USeparator />
    <CartTotals :cart="cart" />
    <CartTable
      v-if="isCheckout"
      :cart="cart"
      is-preview
    />
    <UButton
      v-if="!isCheckout"
      :to="`/${currentCountryCode}/checkout`"
      :block="true"
      color="neutral"
      size="lg"
    >
      Go to checkout
    </UButton>
  </div>
</template>
