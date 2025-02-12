<script lang="ts" setup>
const { currentCountryCode } = useCurrentCountry()

const {
  amount,
  currencyCode,
} = defineProps<{
  amount?: number
  currencyCode?: string
}>()

const localizedPrice = computed(() => convertToLocale({
  amount: amount,
  currency_code: currencyCode,
  country: currentCountryCode.value,
}))
</script>

<template>
  <span>
    {{ localizedPrice }}
  </span>
</template>
