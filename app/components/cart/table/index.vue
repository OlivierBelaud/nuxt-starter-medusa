<script lang="ts" setup>
import type { StoreCart, StoreOrder } from '@medusajs/types'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const {
  cart,
  isPreview,
  isDropDown,
} = defineProps<{
  cart: StoreCart | StoreOrder
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
  return [...(cart?.items ?? [])].sort((a, b) => {
    if (!a.created_at || !b.created_at || a.created_at === b.created_at) return 0
    const dateA = a.created_at.toString()
    const dateB = b.created_at.toString()
    return dateA.localeCompare(dateB)
  })
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
      class="flex-1"
      :ui="{
        thead: isSmall ? 'hidden' : 'default',
      }"
    >
      <template #item-cell="{ row }">
        <div
          class="flex items-center gap-x-4"
          :class="{
            '-ml-4': isSmall,
          }"
        >
          <div :class="isPreview ? 'w-16' : 'w-24'">
            <CartItemThumbnail
              :src="row.original.thumbnail || undefined"
              :alt="row.original.title"
              :link="`/products/${row.original.product_handle}`"
            />
          </div>
          <div>
            <div class="text-black mb-1">
              {{ row.original.product_title }}
            </div>
            <div>Variant: {{ row.original.variant_title }}</div>
            <CartItemDeleteButton
              v-if="isDropDown"
              class="text-sm text-neutral-700 hover:text-neutral-900 mt-2"
              :item="row.original"
            >
              Remove
            </CartItemDeleteButton>
          </div>
        </div>
      </template>
      <template #quantity-cell="{ row }">
        <CartItemSelectQuantity :item="row.original" />
      </template>
      <template #price-cell="{ row }">
        <StoreLocalizedPrice
          :amount="row.original.unit_price"
          :currency-code="cart?.currency_code"
        />
      </template>
      <template #total-cell="{ row }">
        <div
          :class="{
            '-mr-4': isSmall,
          }"
        >
          <div
            v-if="isSmall && row.original.quantity > 1"
            class="text-neutral-500 text-right mb-1"
          >
            <span>{{ row.original.quantity }}</span>
            <span>x</span>
            <span>
              <StoreLocalizedPrice
                :amount="row.original.unit_price"
                :currency-code="cart?.currency_code"
              />
            </span>
          </div>
          <CartItemPrice
            :item="row.original"
            :currency-code="cart?.currency_code"
          />
        </div>
      </template>
    </UTable>
    <USeparator />
  </div>
</template>
