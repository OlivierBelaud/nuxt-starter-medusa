<script lang="ts" setup>
const emit = defineEmits<{
  validate: [boolean]
}>()
const { data: cart } = useFetchCart()
const { data } = useFetchShippingOptions()
const { loading, mutate } = useSetShippingMethod()

const shippingOptions = computed(() => data.value?.shipping_options)

const value = ref(cart.value?.shipping_methods?.at(-1)?.shipping_option_id)

watch(value, (newValue) => {
  if (newValue)
    mutate(newValue)
})

const validateDelivery = () => {
  if (cart.value?.shipping_methods?.at(-1)?.shipping_option_id) {
    emit('validate', true)
  }
}
</script>

<template>
  <div>
    <div
      v-if="cart && shippingOptions"
      class="w-full mb-6"
    >
      <URadioGroup
        v-model="value"
        :items="shippingOptions"
        color="neutral"
        value-key="id"
        label-key="name"
        description-key="amount"
        :ui="{
          root: 'cursor-pointer',
          fieldset: 'w-full gap-y-2',
          item: 'w-full items-center rounded-lg border border-neutral-200',
          container: 'ml-4',
          wrapper: 'w-full',
          label: 'w-full p-4 cursor-pointer',
          description: 'hidden',
        }"
      >
        <template #label="{ item }">
          <div class="flex items-center justify-between gap-x-2 w-full ">
            <div>{{ item.name }}</div>
            <div class="text-neutral-500">
              <StoreLocalizedPrice
                v-if="item.price_type === 'flat'"
                :amount="item.amount"
                :currency-code="cart.currency_code"
              />
            </div>
          </div>
        </template>
      </URadioGroup>
    </div>
    <UButton
      class="cursor-pointer"
      color="neutral"
      size="xl"
      :loading="loading"
      :disabled="!value"
      @click="validateDelivery"
    >
      Continue to payment
    </UButton>
  </div>
</template>
