<script lang="ts" setup>
definePageMeta({
  layout: 'checkout',
})
const { data: cart, status } = useFetchCart()
</script>

<template>
  <UContainer class="py-12">
    <div v-if="status === 'pending'">
      ... Loading
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-[1fr_416px] gap-x-40"
    >
      <CheckoutForm />
      <CartSummary
        v-if="cart"
        title="In your Cart"
        :cart="cart"
        is-checkout
      />
    </div>
  </UContainer>
</template>
