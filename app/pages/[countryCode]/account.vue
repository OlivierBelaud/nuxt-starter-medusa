<script setup lang="ts">
import { useFetchCustomer, useCustomer } from '~/composables/customer'

// Metadata
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Account - Medusa Store',
  meta: [
    { name: 'description', content: 'Manage your Medusa Store account' },
  ],
})

// Form management
const mode = ref<'signin' | 'register'>('signin')

// User data
const { status, data: customerData } = useFetchCustomer()
const { logout } = useCustomer()
const isAuthenticated = computed(() => !!customerData.value?.customer)
</script>

<template>
  <UContainer class="py-32">
    <div class="min-h-[40vh] flex items-center justify-center">
      <!-- Loading state -->
      <div
        v-if="status === 'pending'"
        class="text-center"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="animate-spin h-8 w-8 mx-auto mb-4"
        />
        <p>Loading your account information...</p>
      </div>

      <!-- Connected user -->
      <div
        v-else-if="isAuthenticated && customerData?.customer"
        class="w-full max-w-md p-6 bg-white shadow-md rounded-lg"
      >
        <h1 class="text-2xl font-semibold mb-6 text-center">
          My Account
        </h1>

        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="font-medium">Name:</span>
            <span>{{ customerData.customer.first_name }} {{ customerData.customer.last_name }}</span>
          </div>

          <div class="flex justify-between">
            <span class="font-medium">Email:</span>
            <span>{{ customerData.customer.email }}</span>
          </div>

          <div class="flex justify-between">
            <span class="font-medium">Phone:</span>
            <span>{{ customerData.customer.phone || 'Not provided' }}</span>
          </div>
        </div>

        <div class="mt-8 text-center">
          <UButton
            color="primary"
            @click="logout"
          >
            Sign Out
          </UButton>
        </div>
      </div>

      <!-- Authentication forms -->
      <Transition
        v-else
        name="fade"
        mode="out-in"
      >
        <!-- Sign in form -->
        <AuthSigninForm
          v-if="mode === 'signin'"
          :key="'signin'"
          @switch-to-register="mode = 'register'"
        />

        <!-- Registration form -->
        <AuthRegisterForm
          v-else
          :key="'register'"
          @switch-to-signin="mode = 'signin'"
        />
      </Transition>
    </div>
  </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
