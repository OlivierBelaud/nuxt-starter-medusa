<script setup lang="ts">
const { isCartDropdownOpen } = useCartDropdown()

const { country } = useCountry()
const { updateCart } = useCart()

const { data: cartResponse, status } = await useFetchCart()
const cart = computed(() => cartResponse.value?.cart || undefined)

const cartItemsCount = computed(() => cart.value?.items?.reduce((acc, item) => acc + item.quantity, 0))
const subtotal = computed(() => convertToLocale({
  amount: cart.value?.subtotal,
  currency_code: cart.value?.currency_code,
  country: country.value?.iso_2,
}))

watch(country, () => {
  if (cart.value && cart.value.region_id !== country.value?.region_id) {
    updateCart({ region_id: country.value?.region_id })
  }
})
</script>

<template>
  <UPopover
    v-model:open="isCartDropdownOpen"
    mode="hover"
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 24,
    }"
    :ui="{ content: 'w-[420px] rounded-none' }"
  >
    <AppLink
      to="/cart"
    >
      Cart <span v-if="cartItemsCount">({{ cartItemsCount }})</span>
    </AppLink>
    <template #content>
      <div class="p-4 flex items-center justify-center">
        <h3 class="font-bold text-lg">
          Cart
        </h3>
      </div>
      <div
        v-if="cart === null || cart?.items?.length === 0"
        class="p-4 flex flex-col gap-y-4 text-xs"
      >
        <div class="flex items-center justify-center">
          <div>Your shopping cart is empty</div>
        </div>
        <div class="flex items-center justify-center pb-8">
          <UButton
            :to="`/${country?.iso_2}/store`"
            color="neutral"
          >
            Explore products
          </UButton>
        </div>
      </div>
      <div v-else>
        <div class="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
          <CartTable
            is-drop-down
            :cart="!cart && status === 'pending' ? undefined : cart"
          />
        </div>
        <div
          v-if="cartItemsCount && cartItemsCount > 0"
          class="px-4 pb-4 flex flex-col gap-y-4 text-xs"
        >
          <div class="flex items-end justify-between">
            <span class="font-bold flex items-center gap-x-1">
              Subtotal
              <span class="font-normal">(excl. taxes)</span>
            </span>
            <span class="font-bold text-lg">{{ subtotal }}</span>
          </div>
          <UButton
            :to="`/${country?.iso_2}/cart`"
            color="neutral"
            size="lg"
            :block="true"
            class="w-full"
          >
            Go to cart
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>
