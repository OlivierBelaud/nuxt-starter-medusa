<script lang="ts" setup>
import type { StoreCart } from '@medusajs/types'

defineProps<{
  cart: StoreCart
}>()
</script>

<template>
  <div>
    <div class="flex flex-col gap-y-2 font-medium">
      <div class="flex items-center justify-between text-sm">
        <span class="flex gap-x-1 items-center">
          Subtotal (excl. shipping and taxes)
        </span>
        <StoreLocalizedPrice
          :amount="cart.subtotal"
          :currency-code="cart.currency_code"
        />
      </div>
      <div
        v-if="cart.discount_total"
        class="flex items-center justify-between text-sm"
      >
        <span class="flex gap-x-1 items-center">
          Discount
        </span>
        <StoreLocalizedPrice
          :amount="cart.discount_total"
          :currency-code="cart.currency_code"
        />
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex gap-x-1 items-center">
          Shipping
        </span>
        <StoreLocalizedPrice
          :amount="cart.shipping_subtotal"
          :currency-code="cart.currency_code"
        />
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex gap-x-1 items-center">
          Taxes
        </span>
        <StoreLocalizedPrice
          :amount="cart.tax_total"
          :currency-code="cart.currency_code"
        />
      </div>
      <div
        v-if="cart.gift_card_total"
        class="flex items-center justify-between text-sm"
      >
        <span class="flex gap-x-1 items-center">
          Gift card
        </span>
        <StoreLocalizedPrice
          :amount="cart.gift_card_total"
          :currency-code="cart.currency_code"
        />
      </div>
    </div>
    <USeparator class="my-4" />
    <div class="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
      <span class="text-sm text-black">Total</span>
      <StoreLocalizedPrice
        class="text-lg font-semibold"
        :amount="cart.total"
        :currency-code="cart.currency_code"
      />
    </div>
    <USeparator class="mt-4" />
  </div>
</template>
