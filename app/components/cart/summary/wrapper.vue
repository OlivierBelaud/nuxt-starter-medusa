<script setup lang="ts">
const { data: cart } = useFetchCart()
</script>

<template>
  <CartSummary
    :cart="cart || undefined"
    title="Summary"
    has-checkout-button
  />
</template>
