<script lang="ts" setup>
import * as z from 'zod'
import type { StoreCartResponse } from '@medusajs/types'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits<{
  validate: [boolean]
}>()

const { country } = useCountry()

const { data: cartResponse } = useNuxtData<StoreCartResponse>('cart')
const cart = computed(() => cartResponse.value?.cart)
const { mutate: updateCart, loading } = useUpdateCart()

const schema = z.object({
  shipping_address: z.object({
    first_name: z.string({ required_error: 'First name is required' }).min(1, 'First name is required'),
    last_name: z.string({ required_error: 'Last name is required' }).min(1, 'Last name is required'),
    address_1: z.string({ required_error: 'Address is required' }).min(1, 'Address is required'),
    address_2: z.string().optional(),
    company: z.string().optional(),
    postal_code: z.string({ required_error: 'Postal code is required' }).min(1, 'Postal code is required'),
    city: z.string({ required_error: 'City is required' }).min(1, 'City is required'),
    country_code: z.string({ required_error: 'Country is required' }).min(1, 'Country is required'),
    province: z.string().optional(),
    phone: z.string().optional(),
  }),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  billing_address: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    company: z.string().optional(),
    postal_code: z.string().optional(),
    city: z.string().optional(),
    country_code: z.string().optional(),
    province: z.string().optional(),
    phone: z.string().optional(),
  }),
})

type Schema = z.output<typeof schema>

interface PartialSchema {
  shipping_address: Partial<Schema['shipping_address']>
  email?: Schema['email']
  billing_address: Partial<Schema['billing_address']>
}

const state = reactive<PartialSchema>({
  shipping_address: {
    first_name: cart.value?.shipping_address?.first_name || undefined,
    last_name: cart.value?.shipping_address?.last_name || undefined,
    address_1: cart.value?.shipping_address?.address_1 || undefined,
    address_2: cart.value?.shipping_address?.address_2 || undefined,
    company: cart.value?.shipping_address?.company || undefined,
    postal_code: cart.value?.shipping_address?.postal_code || undefined,
    city: cart.value?.shipping_address?.city || undefined,
    country_code: cart.value?.shipping_address?.country_code || undefined,
    province: cart.value?.shipping_address?.province || undefined,
    phone: cart.value?.shipping_address?.phone || undefined,
  },
  email: cart.value?.email || undefined,
  billing_address: {
    first_name: cart.value?.billing_address?.first_name || undefined,
    last_name: cart.value?.billing_address?.last_name || undefined,
    address_1: cart.value?.billing_address?.address_1 || undefined,
    address_2: cart.value?.billing_address?.address_2 || undefined,
    company: cart.value?.billing_address?.company || undefined,
    postal_code: cart.value?.billing_address?.postal_code || undefined,
    city: cart.value?.billing_address?.city || undefined,
    country_code: cart.value?.billing_address?.country_code || undefined,
    province: cart.value?.billing_address?.province || undefined,
    phone: cart.value?.billing_address?.phone || undefined,
  },
})

const sameAsBilling = ref(compareAddresses(cart.value?.shipping_address, cart.value?.billing_address))

async function onSubmit(event: FormSubmitEvent<PartialSchema>) {
  if (sameAsBilling.value)
    event.data.billing_address = event.data.shipping_address

  await updateCart(event.data)

  emit('validate', true)
}

// Use the current user country as the default shipping address country
watch(country, (newCountry) => {
  if (newCountry?.iso_2 && state.shipping_address) {
    state.shipping_address.country_code = newCountry?.iso_2
  }
}, { immediate: true })

// Redirect to the right store if shipping address changes - Not applicable for billing address
watch(state, (value) => {
  if (value.shipping_address?.country_code !== country.value?.iso_2) {
    navigateTo(`/${value.shipping_address?.country_code}/checkout?step=address`)
  }
})
</script>

<template>
  <div class="pb-8">
    <UForm
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.first_name"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.first_name"
            name="shipping_address.first_name"
            label="First name"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.last_name"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.last_name"
            name="shipping_address.last_name"
            label="Last name"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.address_1"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.address_1"
            name="shipping_address.address_1"
            label="Address"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          size="xl"
          class="w-full"
          name="shipping_address.company"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.company"
            name="shipping_address.company"
            label="Company"
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.postal_code"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.postal_code"
            name="shipping_address.postal_code"
            label="Postal code"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.city"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.city"
            name="shipping_address.city"
            label="City"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.country_code"
          :ui="{ error: 'text-xs' }"
        >
          <StoreSelectCountry v-model="state.shipping_address.country_code" />
        </UFormField>
        <UFormField
          size="xl"
          class="w-full"
          name="shipping_address.province"
        >
          <AppInput
            v-model="state.shipping_address.province"
            name="shipping_address.province"
            label="Province/State"
            size="xl"
          />
        </UFormField>
        <UFormField
          size="xl"
          class="w-full"
          name="shipping_address.phone"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.phone"
            name="shipping_address.phone"
            type="tel"
            label="Phone"
            size="xl"
          />
        </UFormField>
      </div>
      <div
        class="py-4"
      >
        <UCheckbox
          v-model="sameAsBilling"
          color="neutral"
          label="Billing address same as shipping address"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 pb-8">
        <UFormField
          required
          size="xl"
          class="w-full"
          name="email"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.email"
            name="email"
            type="email"
            label="Email"
            required
            size="xl"
          />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.phone"
          :ui="{ error: 'text-xs' }"
        >
          <AppInput
            v-model="state.shipping_address.phone"
            name="shipping_address.phone"
            type="tel"
            label="Phone"
            size="xl"
          />
        </UFormField>
      </div>
      <div
        v-if="!sameAsBilling"
      >
        <AppHeading
          as="h2"
          class="mb-6"
        >
          Billing Address
        </AppHeading>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.first_name"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.first_name"
              name="billing_address.first_name"
              label="First name"
              required
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.last_name"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.last_name"
              name="billing_address.last_name"
              label="Last name"
              required
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.address_1"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.address_1"
              name="billing_address.address_1"
              label="Address"
              required
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.company"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.company"
              name="billing_address.company"
              label="Company"
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.postal_code"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.postal_code"
              name="billing_address.postal_code"
              label="Postal code"
              required
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.city"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.city"
              name="billing_address.city"
              label="City"
              required
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.country_code"
            :ui="{ error: 'text-xs' }"
          >
            <StoreSelectCountry v-model="state.billing_address.country_code" />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.province"
          >
            <AppInput
              v-model="state.billing_address.province"
              name="billing_address.province"
              label="Province/State"
              size="xl"
            />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.phone"
            :ui="{ error: 'text-xs' }"
          >
            <AppInput
              v-model="state.billing_address.phone"
              name="billing_address.phone"
              type="tel"
              label="Phone"
              size="xl"
            />
          </UFormField>
        </div>
      </div>
      <UButton
        class="cursor-pointer"
        color="neutral"
        size="xl"
        type="submit"
        :loading="loading"
      >
        Continue to delivery
      </UButton>
    </UForm>
  </div>
</template>
