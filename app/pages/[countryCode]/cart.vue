<script setup lang="ts">
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
            <CartTableWrapper />
            <!-- <ClientOnly>
              <CartTableWrapper />
              <template #fallback>
                <CartTableSkeleton />
              </template>
            </ClientOnly> -->
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <CartSummaryWrapper
                title="Summary"
                has-checkout-button
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
