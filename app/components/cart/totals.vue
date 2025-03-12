<script lang="ts" setup>
import type { StoreCart, StoreOrder } from '@medusajs/types'

const { cart } = defineProps<{
  cart?: StoreCart | StoreOrder
}>()

const hasCartItems = computed(() => cart?.items && cart.items.length > 0)
</script>

<template>
  <div>
    <div class="flex flex-col gap-y-2 font-medium">
      <div class="flex items-center justify-between text-sm">
        <span class="flex gap-x-1 items-center">
          Subtotal (excl. shipping and taxes)
        </span>
        <StoreLocalizedPrice
          v-if="hasCartItems"
          :amount="cart?.subtotal"
          :currency-code="cart?.currency_code"
        />
        <USkeleton
          v-else
          class="h-4 w-[60px]"
        />
      </div>
      <div
        v-if="cart?.discount_total"
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
          v-if="hasCartItems"
          :amount="cart?.shipping_subtotal"
          :currency-code="cart?.currency_code"
        />
        <USkeleton
          v-else
          class="h-4 w-[60px]"
        />
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex gap-x-1 items-center">
          Taxes
        </span>
        <StoreLocalizedPrice
          v-if="hasCartItems"
          :amount="cart?.tax_total"
          :currency-code="cart?.currency_code"
        />
        <USkeleton
          v-else
          class="h-4 w-[60px]"
        />
      </div>
      <div
        v-if="cart?.gift_card_total"
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
        v-if="hasCartItems"
        class="text-lg font-semibold"
        :amount="cart?.total"
        :currency-code="cart?.currency_code"
      />
      <USkeleton
        v-else
        class="h-7 w-[80px]"
      />
    </div>
    <USeparator class="mt-4" />
  </div>
</template>
