<script setup lang="ts">
const isOpen = defineModel<boolean>()
const { title } = useAppConfig()

const { data } = await useFetchRegions()
const countries = getCountriesFromRegions(data.value?.regions)
const { currentCountry } = useCurrentCountry()
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="left"
    title="Menu"
  >
    <template #body>
      <div class="h-full min-h-48 flex flex-col justify-between">
        <div class="flex flex-col space-y-4">
          <AppLink
            to="/"
            @click="isOpen = false"
          >
            Home
          </AppLink>
          <AppLink
            to="/store"
            @click="isOpen = false"
          >
            Store
          </AppLink>
          <AppLink
            to="/account"
            @click="isOpen = false"
          >
            Account
          </AppLink>
          <AppLink
            to="/cart"
            @click="isOpen = false"
          >
            Cart
          </AppLink>
        </div>
        <div>
          <AppHeaderCountrySelector
            :countries="countries"
            @select:country="isOpen = false"
          >
            <div
              class="flex items-center justify-between cursor-pointer group"
            >
              <div class="text-xs flex items-center space-x-2">
                <span>Shipping to:</span>
                <UIcon :name="`i-flag-${currentCountry?.iso_2}-4x3`" />
                <span>{{ currentCountry?.display_name }}</span>
              </div>
              <UIcon
                name="i-lucide-arrow-right"
                class="group-hover:-rotate-90 ease-in-out duration-150 size-5"
              />
            </div>
          </AppHeaderCountrySelector>
        </div>
      </div>
    </template>
    <template #footer>
      <p class="text-xs text-color-muted">
        © 2025 {{ title }}. All rights reserved.
      </p>
    </template>
  </USlideover>
</template>
