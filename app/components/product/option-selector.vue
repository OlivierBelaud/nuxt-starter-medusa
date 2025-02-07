<script setup lang="ts">
import type { StoreProductOption } from '@medusajs/types'

const props = defineProps<{
  option: StoreProductOption
  current?: string
}>()

defineEmits<{
  'select:option': [{ optionId: string, value: string }]
}>()

const optionValues = computed(() => {
  return props.option.values?.map(v => v.value)
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <div class="text-sm font-medium text-neutral-900">
      Select {{ option.title }}
    </div>
    <div
      class="flex flex-wrap justify-between gap-2"
    >
      <div
        v-for="optionValue in optionValues"
        :key="optionValue"
        class="flex-1"
      >
        <UButton
          :block="true"
          color="neutral"
          class="cursor-pointer"
          :variant="current === optionValue ? 'outline' : 'subtle'"
          @click="$emit('select:option', { optionId: option.id, value: optionValue })"
        >
          {{ optionValue }}
        </UButton>
      </div>
    </div>
  </div>
</template>
