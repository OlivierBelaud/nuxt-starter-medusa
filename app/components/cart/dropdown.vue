<script setup lang="ts">
const { isCartDropdownOpen } = useCartDropdown()

const { currentCountryCode } = useCurrentCountry()

const { data: cart } = useFetchCart()

const cartItemsCount = computed(() => cart.value?.items?.reduce((acc, item) => acc + item.quantity, 0))
const subtotal = computed(() => convertToLocale({
  amount: cart.value?.subtotal,
  currency_code: cart.value?.currency_code,
  country: currentCountryCode.value,
}))
</script>

<template>
  <UPopover
    v-model:open=" isCartDropdownOpen"
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
      <div class="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
        <CartTableWrapper is-drop-down />
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
          :to="`/${currentCountryCode}/cart`"
          color="neutral"
          size="lg"
          :block="true"
          class="w-full"
        >
          Go to cart
        </UButton>
      </div>
      <div
        v-if="!cart || cartItemsCount === 0"
        class="p-4 flex flex-col gap-y-4 text-xs"
      >
        <div class="flex items-center justify-center">
          <div>Your shopping cart is empty</div>
        </div>
        <div class="flex items-center justify-center pb-8">
          <UButton
            :to="`/${currentCountryCode}/store`"
            color="neutral"
          >
            Explore products
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>
