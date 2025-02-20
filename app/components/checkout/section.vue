<script lang="ts" setup>
// const { data: cart } = useFetchCart()
</script>

<template>
  <UContainer class="py-12">
    <!-- <div v-if="!cart">
      ... Loading
    </div> -->
    <div
      class="grid grid-cols-1 sm:grid-cols-[1fr_416px] gap-x-40"
    >
      <CheckoutForm />
      <CartSummaryWrapper
        title="In your Cart"
        is-checkout
      />
    </div>
  </UContainer>
</template>
