import { CartTableWrapper } from '../../../.nuxt/components';
<script setup lang="ts">
// const { data: cart } = useFetchCart()
</script>

<template>
  <UContainer class="py-12">
    <!-- <div v-if="!cart">
      ... Loading
    </div> -->
    <div>
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-x-20 xl:gap-x-40"
      >
        <div class="flex flex-col bg-white py-6 gap-y-6">
          <div class="flex flex-col gap-y-3">
            <AppHeading
              as="h1"
            >
              Cart
            </AppHeading>
            <LazyCartTableWrapper />
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <!-- <CartSummary
                title="Summary"
                :cart="cart"
                has-checkout-button
              /> -->
            </div>
          </div>
        </div>
      </div>
      <!-- <CartEmpty v-else /> -->
    </div>
  </UContainer>
</template>
