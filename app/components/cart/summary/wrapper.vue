<script setup lang="ts">
defineProps<{
  title: string
  isCheckout?: boolean
}>()

const { data: cart } = useFetchCart()
</script>

<template>
  <CartSummary
    :cart="cart || undefined"
    :title="title"
    :is-checkout="isCheckout"
  />
</template>
