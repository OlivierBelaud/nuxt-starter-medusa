<script lang="ts" setup>
const { data: cart } = useFetchCart()

const activeSession = computed(() => cart.value?.payment_collection?.payment_sessions?.find(
  paymentSession => paymentSession.status === 'pending',
))

const paymentMethod = computed(() => providers.find(({ id }) => id === activeSession.value?.provider_id))
</script>

<template>
  <div
    v-if="paymentMethod"
    class="flex items-start gap-x-1 w-full"
  >
    <div class="flex flex-col w-1/3">
      <div class="font-semibold text-black mb-1">
        Payment method
      </div>
      <div>
        {{ paymentMethod.label }}
      </div>
    </div>
    <div class="flex flex-col w-1/3">
      <div class="font-semibold text-black mb-1">
        Payment details
      </div>
      <div
        class="flex gap-2 text-medium items-center"
      >
        <div class="flex items-center h-7 w-fit p-2 bg-neutral-50 rounded-lg border border-neutral-200">
          <UIcon
            :name="paymentMethod.icon"
            class="size-5"
          />
        </div>
        <div class="text-sm">
          Another step will appear
        </div>
      </div>
    </div>
  </div>
</template>
