<script setup lang="ts">
import type { StoreCartResponse } from '@medusajs/types'

const { data: cartResponse } = useNuxtData<StoreCartResponse>('cart')
const cart = computed(() => cartResponse.value?.cart)

const isCartEmpty = computed(() => cart.value?.items?.length === 0)
</script>

<template>
  <UContainer class="py-12">
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
            <ClientOnly>
              <CartEmpty
                v-if="isCartEmpty"
              />
              <CartTable
                v-else-if="cart"
                :cart="cart"
              />
              <CartTableSkeleton v-else />
              <template #fallback>
                <CartTableSkeleton />
              </template>
            </ClientOnly>
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <ClientOnly>
                <CartSummary
                  v-if="!isCartEmpty"
                  title="Summary"
                  :cart="cart"
                />
                <template #fallback>
                  <CartSummary
                    title="Summary"
                    :cart="undefined"
                  />
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
