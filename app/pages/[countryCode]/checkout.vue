<script lang="ts" setup>
const { data: cart } = useFetchCart()
</script>

<template>
  <UContainer class="py-12">
    <div
      class="grid grid-cols-1 sm:grid-cols-[1fr_416px] gap-x-40"
    >
      <!-- <CheckoutForm /> -->
      <CartSummary
        title="In your Cart"
        :cart="cart"
        is-checkout
      />
    </div>
  </UContainer>
</template>
