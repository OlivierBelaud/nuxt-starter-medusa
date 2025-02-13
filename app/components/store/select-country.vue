<script setup lang="ts">
const { data } = await useFetchRegions()
const countries = computed(() => getCountriesFromRegions(data.value?.regions))
const value = defineModel<string>()
</script>

<template>
  <USelect
    v-model="value"
    :items="countries"
    value-key="iso_2"
    label-key="display_name"
    class="w-full"
    placeholder="Country*"
    color="neutral"
    required
  />
</template>
