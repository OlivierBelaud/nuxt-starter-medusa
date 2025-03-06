<script lang="ts" setup>
import type { StoreCartResponse } from '@medusajs/types'

const { data: cartResponse } = useNuxtData<StoreCartResponse>('cart')
const cart = computed(() => cartResponse.value?.cart)
</script>

<template>
  <div
    v-if="!!cart?.shipping_methods?.at(-1)?.shipping_option_id"
    class="flex flex-col w-1/3"
  >
    <div class="font-semibold text-black mb-1">
      Method
    </div>
    <div>
      {{ cart.shipping_methods?.at(-1)?.name }}
      (<StoreLocalizedPrice
        :amount="cart.shipping_methods?.at(-1)?.amount"
        :currency-code="cart?.currency_code"
      />)
    </div>
  </div>
</template>
