<script lang="ts" setup>
const { data: cart } = useFetchCart()
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
