<script lang="ts" setup>
const { data: cart } = useFetchCart()
const { data: regions } = await useFetchRegions()
const countries = computed(() => getCountriesFromRegions(regions.value?.regions))

function getCountryName(countryCode?: string) {
  if (!countryCode) return
  return countries.value.find(country => country.iso_2 === countryCode)?.display_name
}

const sameAsBilling = computed(() => {
  return compareAddresses(cart.value?.shipping_address, cart.value?.billing_address)
})
</script>

<template>
  <div
    v-if="cart"
    class="flex items-start gap-x-8 text-sm"
  >
    <div class="flex items-start gap-x-1 w-full">
      <div
        class="flex flex-col w-1/3"
      >
        <div class="font-semibold text-black mb-1">
          Shipping Address
        </div>
        <div>
          {{ cart.shipping_address?.first_name }}
          {{ cart.shipping_address?.last_name }}
        </div>
        <div>
          {{ cart.shipping_address?.address_1 }}
          {{ cart.shipping_address?.address_2 }}
        </div>
        <div>
          {{ cart.shipping_address?.postal_code }},
          {{ cart.shipping_address?.city }}
        </div>
        <div>
          {{ getCountryName(cart.shipping_address?.country_code) }}
        </div>
      </div>

      <div
        class="flex flex-col w-1/3 "
      >
        <div class="font-semibold text-black mb-1">
          Contact
        </div>
        <div>
          {{ cart.shipping_address?.phone }}
        </div>
        <div>
          {{ cart.email }}
        </div>
      </div>

      <div
        class="flex flex-col w-1/3"
      >
        <div class="font-semibold text-black mb-1">
          Billing Address
        </div>

        <div
          v-if="sameAsBilling"
        >
          Billing- and delivery address are the same.
        </div>
        <div
          v-else
        >
          <div>
            {{ cart.billing_address?.first_name }}
            {{ cart.billing_address?.last_name }}
          </div>
          <div>
            {{ cart.billing_address?.address_1 }}
            {{ cart.billing_address?.address_2 }}
          </div>
          <div>
            {{ cart.billing_address?.postal_code }}
            {{ cart.billing_address?.city }}
          </div>
          <div>
            {{ getCountryName(cart.billing_address?.country_code) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    ...loading
  </div>
</template>
