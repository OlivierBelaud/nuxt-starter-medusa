<script lang="ts" setup>
const { userCountryCode } = useUserCountry()

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
  country: userCountryCode.value,
}))
</script>

<template>
  <span>
    {{ localizedPrice }}
  </span>
</template>
