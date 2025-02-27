<script setup lang="ts">
const { data: cart, refreshCachedData, origin } = useFetchCart()

const isStatic = computed(() => origin.value.fetchOrigin === 'static')
// const { retrieveCart } = useCart()

// const { data: cart, refresh } = useStaticAsyncData(
//   `cart-exp`,
//   async () => await retrieveCart(),
// )

watchEffect(() => {
  console.log('Cart:', cart.value)
})

onMounted(() => {
  console.log('Product page mounted')
  if (isStatic.value) {
    refreshCachedData()
  }
})

// const cart = computed(() => data.value || undefined)
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
            <CartEmpty v-if="cart?.items?.length === 0" />
            <CartTable
              v-else
              :cart="cart"
            />
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <CartSummary
                title="Summary"
                :cart="cart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
