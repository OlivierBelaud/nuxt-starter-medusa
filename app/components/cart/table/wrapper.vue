<script setup lang="ts">
const { data: cart } = useFetchCart()
</script>

<template>
  <div>
    <template v-if="cart?.items">
      <CartTable
        v-if="cart.items.length > 0"
        :cart="cart"
      />
      <CartEmpty v-else />
    </template>
    <template v-else>
      <CartTableSkeleton />
    </template>
  </div>
</template>
