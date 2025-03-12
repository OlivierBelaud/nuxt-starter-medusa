<script lang="ts" setup>
import type { StoreCartResponse } from '@medusajs/types'
import { providers } from '~/utils/payment'

const emit = defineEmits<{
  validate: [boolean]
}>()

const { data: cartResponse } = useNuxtData<StoreCartResponse>('cart')
const cart = computed(() => cartResponse.value?.cart)

const { data } = await useFetchPaymentProviders()
const { loading, mutate } = useInitiatePaymentSession()

interface PaymentProviderData {
  id: string
  label: string
  icon: string
}

const paymentProviders = computed<PaymentProviderData[] | undefined>(() => {
  const availableProviders = data.value?.payment_providers?.map((provider) => {
    const providerConfig = providers.find(p => p.id === provider.id)
    return {
      id: provider.id,
      label: providerConfig?.label || provider.id,
      icon: providerConfig?.icon || 'i-lucide-credit-card',
    }
  })
  return availableProviders
})

const activeSession = computed(() => {
  const session = cart.value?.payment_collection?.payment_sessions?.find(
    paymentSession => paymentSession.status === 'pending',
  )
  return session
})
const value = ref(activeSession.value?.provider_id)

const isButtonDisabled = computed(() => {
  return !value.value
})

const paymentError = ref<string | null>(null)
const isValidating = ref(false)

const validatePayment = async () => {
  try {
    paymentError.value = null
    isValidating.value = true

    if (!value.value) {
      paymentError.value = 'Please select a payment method'
      isValidating.value = false
      return
    }

    if (activeSession.value && activeSession.value.provider_id === value.value) {
      emit('validate', true)
      return
    }

    try {
      await mutate(value.value)
      emit('validate', true)
    }
    catch (error) {
      console.error('Error initializing payment session:', error)
      paymentError.value = 'Failed to initialize payment. Please try again.'
    }
  }
  finally {
    isValidating.value = false
  }
}
</script>

<template>
  <div>
    <div
      v-if="paymentProviders"
      class="w-full mb-6"
    >
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
    <div
      v-else
      class="mb-6"
    >
      <UIcon
        name="i-lucide-loader-circle"
        class="size-6 animate-spin"
      />
    </div>

    <UAlert
      v-if="paymentError"
      color="error"
      variant="soft"
      icon="i-lucide-alert-circle"
      class="mb-4"
    >
      {{ paymentError }}
    </UAlert>

    <UButton
      class="cursor-pointer"
      color="neutral"
      size="xl"
      :disabled="isButtonDisabled"
      :loading="loading || isValidating"
      @click="validatePayment"
    >
      Continue to review
    </UButton>
  </div>
</template>
