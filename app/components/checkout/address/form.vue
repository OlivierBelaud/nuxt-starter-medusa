<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits<{
  validate: [boolean]
}>()

const { currentCountry } = useCurrentCountry()
const { data: cart } = useFetchCart()
const { mutate: updateCart, loading } = useUpdateCart()

const { data: regions } = await useFetchRegions()
const countries = computed(() => getCountriesFromRegions(regions.value?.regions))
const { setCurrentCountry } = useCurrentCountry()

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
watch(currentCountry, (country) => {
  if (country?.iso_2 && state.shipping_address) {
    state.shipping_address.country_code = country.iso_2
  }
}, { immediate: true })

// Redirect to the right store if shipping address changes - Not applicable for billing address
watch(state, (value) => {
  if (value.shipping_address?.country_code !== currentCountry.value?.iso_2) {
    const country = countries.value.find(country => country.iso_2 === value.shipping_address?.country_code)
    setCurrentCountry(country)
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
      <div class="grid grid-cols-2 gap-4 pb-8">
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.first_name"
        >
          <UInput
            v-model="state.shipping_address.first_name"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">First name<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.last_name"
        >
          <UInput
            v-model="state.shipping_address.last_name"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Last name<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.address_1"
        >
          <UInput
            v-model="state.shipping_address.address_1"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Address<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.company"
        >
          <UInput
            v-model="state.shipping_address.company"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Company</span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.postal_code"
        >
          <UInput
            v-model="state.shipping_address.postal_code"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Postal code<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.city"
        >
          <UInput
            v-model="state.shipping_address.city"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">City<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.country_code"
        >
          <StoreSelectCountry v-model="state.shipping_address.country_code" />
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.province"
        >
          <UInput
            v-model="state.shipping_address.province"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Province</span>
            </label>
          </UInput>
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
        >
          <UInput
            v-model="state.email"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Email<span class="text-red-500">*</span></span>
            </label>
          </UInput>
        </UFormField>
        <UFormField
          required
          size="xl"
          class="w-full"
          name="shipping_address.phone"
        >
          <UInput
            v-model="state.shipping_address.phone"
            placeholder=""
            color="neutral"
            size="xl"
            :ui="{ base: 'peer' }"
            class="w-full"
          >
            <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-[var(--ui-bg)] px-1">Phone</span>
            </label>
          </UInput>
        </UFormField>
      </div>
      <div
        v-if="!sameAsBilling"
        class="pb-6"
      >
        <AppHeading
          as="h2"
          class="mb-6"
        >
          Billing Address
        </AppHeading>
        <div class="grid grid-cols-2 gap-4">
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.first_name"
          >
            <UInput
              v-model="state.billing_address.first_name"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">First name<span class="text-red-500">*</span></span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.last_name"
          >
            <UInput
              v-model="state.billing_address.last_name"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Last name<span class="text-red-500">*</span></span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.address_1"
          >
            <UInput
              v-model="state.billing_address.address_1"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Address<span class="text-red-500">*</span></span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.company"
          >
            <UInput
              v-model="state.billing_address.company"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Company</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.postal_code"
          >
            <UInput
              v-model="state.billing_address.postal_code"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Postal code<span class="text-red-500">*</span></span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.city"
          >
            <UInput
              v-model="state.billing_address.city"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">City<span class="text-red-500">*</span></span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.country_code"
          >
            <StoreSelectCountry v-model="state.billing_address.country_code" />
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.province"
          >
            <UInput
              v-model="state.billing_address.province"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Province</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField
            required
            size="xl"
            class="w-full"
            name="billing_address.phone"
          >
            <UInput
              v-model="state.billing_address.phone"
              placeholder=""
              color="neutral"
              size="xl"
              :ui="{ base: 'peer' }"
              class="w-full"
            >
              <label class="pointer-events-none py-1 absolute left-0 -top-2.5 text-[var(--ui-text-highlighted)] text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-[var(--ui-text-highlighted)] peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--ui-text-dimmed)] peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-[var(--ui-bg)] px-1">Phone</span>
              </label>
            </UInput>
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
