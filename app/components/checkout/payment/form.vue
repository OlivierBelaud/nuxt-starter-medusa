<script lang="ts" setup>
const emit = defineEmits<{
  validate: [boolean]
}>()

const { data: cart } = useFetchCart()
const { data } = useFetchPaymentProviders()
const { loading, mutate } = useInitiatePaymentSession()

const paymentProviders = computed(() => data.value?.payment_providers?.map(provider => ({
  ...provider,
  ...providers.find(({ id }) => id === provider.id),
})))

const activeSession = computed(() => cart.value?.payment_collection?.payment_sessions?.find(
  paymentSession => paymentSession.status === 'pending',
))

const value = ref(activeSession.value?.provider_id)

const validatePayment = async () => {
  if (value.value && !activeSession.value) {
    await mutate(value.value)
  }
  emit('validate', true)
}
</script>

<template>
  <div>
    <div class="w-full mb-6">
      <URadioGroup
        v-model="value"
        :items="paymentProviders"
        color="neutral"
        value-key="id"
        label-key="label"
        description-key="icon"
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
            <div>{{ item.label }}</div>
            <UIcon
              :name="item.icon || 'i-lucide-credit-card'"
              class="size-5"
            />
          </div>
        </template>
        <template #description />
      </URadioGroup>
    </div>
    <UButton
      class="cursor-pointer"
      color="neutral"
      size="xl"
      :disabled="!value"
      :loading="loading"
      @click="validatePayment"
    >
      Continue to review
    </UButton>
  </div>
</template>
