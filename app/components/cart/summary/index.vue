<script lang="ts" setup>
import type { StoreCart } from '@medusajs/types'

const { country } = useCountry()

const {
  cart,
} = defineProps<{
  title: string
  cart?: StoreCart
  isCheckout?: boolean
}>()

const isCartEmpty = computed(() => cart?.items?.length === 0)
const isCartUndefined = computed(() => cart === undefined)
</script>

<template>
  <div
    v-if="isCartUndefined || !isCartEmpty"
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
    <CartTable
      v-if="isCheckout"
      :cart="cart"
      is-preview
    />
    <UButton
      v-if="!isCheckout"
      :to="`/${country?.iso_2}/checkout`"
      :block="true"
      color="neutral"
      :disabled="isCartUndefined"
      size="lg"
    >
      Go to checkout
    </UButton>
  </div>
</template>
