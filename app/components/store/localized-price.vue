<script lang="ts" setup>
const { country } = useCountry()

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
  country: country.value?.iso_2,
}))
</script>

<template>
  <span>
    {{ localizedPrice }}
  </span>
</template>
