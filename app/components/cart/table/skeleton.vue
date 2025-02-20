<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const {
  isPreview,
  isDropDown,
} = defineProps<{
  isPreview?: boolean
  isDropDown?: boolean
}>()

const columns = [
  {
    accessorKey: 'item',
    header: 'Item',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'total',
    header: () => h('div', { class: 'text-right' }, 'Total'),
  },
]

const data = computed(() => {
  return [{}]
})

const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 768 })
const activeBreakpoint = breakpoints.active()

const isMobile = computed(() => activeBreakpoint.value === 'sm' || !activeBreakpoint.value)

const isSmall = computed(() => isPreview || isDropDown)

const columnVisibility = computed(() => {
  return {
    price: !isMobile.value && !isSmall.value,
    quantity: !isSmall.value,
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <UTable
      v-model:column-visibility="columnVisibility"
      :data="data"
      :columns="columns"
      :loading="true"
      class="flex-1"
      :ui="{
        thead: isSmall ? 'hidden' : 'default',
      }"
    >
      <template #item-cell>
        <div
          class="flex items-center gap-x-4"
          :class="{
            '-ml-4': isSmall,
          }"
        >
          <USkeleton :class="isPreview ? 'w-16 h-16' : 'w-24 h-24'" />

          <div>
            <div>
              <USkeleton class="h-4 w-[200px] mb-2" />
            </div>
            <div>
              <USkeleton class="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </template>
      <template #quantity-cell>
        <USkeleton class="h-6 w-[100px]" />
      </template>
      <template #price-cell>
        <USkeleton class="h-4 w-[60px]" />
      </template>
      <template #total-cell>
        <div
          class="flex justify-end"
          :class="{
            '-mr-4': isSmall,
          }"
        >
          <USkeleton class="h-4 w-[60px]" />
        </div>
      </template>
    </UTable>
    <USeparator />
  </div>
</template>
