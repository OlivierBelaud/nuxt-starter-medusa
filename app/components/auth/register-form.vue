<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { RegisterCustomerData } from '~/composables/customer'

const emit = defineEmits<{
  'switch-to-signin': []
}>()

// Connection with Medusa API
const { register, isLoading: isRegistering, error: apiError } = useCustomer()

// Validation schema
const formSchema = z.object({
  first_name: z.string().min(2, 'First name must contain at least 2 characters'),
  last_name: z.string().min(2, 'Last name must contain at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
})

type FormType = z.infer<typeof formSchema>

// Form initial state
const form = ref<FormType>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
})

// Error message
const formError = ref<string | undefined>(undefined)

// Form submission
const onSubmit = async (_event: FormSubmitEvent<FormType>) => {
  formError.value = undefined

  try {
    // Prepare API data
    const customerData: RegisterCustomerData = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone || undefined,
    }

    // Call registration API
    await register(customerData)
    await refreshNuxtData('customer')
  }
  catch {
    // Use API error or form error
    if (!apiError.value) {
      formError.value = 'An error occurred during registration. Please try again.'
    }
  }
}

// Display API error or local error
const displayError = computed(() => apiError.value || formError.value)

// Switch to sign in form
const switchToSignin = () => {
  emit('switch-to-signin')
}
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <AuthFormHeader
      title="BECOME A MEDUSA STORE MEMBER"
      description="Create your Medusa Store Member profile, and get access to an enhanced shopping experience."
    />

    <AppFormError
      :message="displayError"
      :show="!!displayError"
      class="mb-4"
    />

    <UForm
      :schema="formSchema"
      :state="form"
      class="space-y-2"
      @submit="onSubmit"
    >
      <!-- First name input -->
      <UFormField
        name="first_name"
        required
        size="xl"
        class="w-full"
        :ui="{ error: 'text-xs' }"
      >
        <AppInput
          v-model="form.first_name"
          name="first_name"
          autocomplete="given-name"
          required
          label="First name"
          size="xl"
        />
      </UFormField>

      <!-- Last name input -->
      <UFormField
        name="last_name"
        required
        size="xl"
        class="w-full"
        :ui="{ error: 'text-xs' }"
      >
        <AppInput
          v-model="form.last_name"
          name="last_name"
          autocomplete="family-name"
          required
          label="Last name"
          size="xl"
        />
      </UFormField>

      <!-- Email input -->
      <UFormField
        name="email"
        required
        size="xl"
        class="w-full"
        :ui="{ error: 'text-xs' }"
      >
        <AppInput
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          label="Email"
          size="xl"
        />
      </UFormField>

      <!-- Phone input -->
      <UFormField
        name="phone"
        size="xl"
        class="w-full"
        :ui="{ error: 'text-xs' }"
      >
        <AppInput
          v-model="form.phone"
          name="phone"
          type="tel"
          autocomplete="tel"
          label="Phone"
          size="xl"
        />
      </UFormField>

      <!-- Password input with button to show/hide -->
      <UFormField
        name="password"
        required
        size="xl"
        class="w-full"
        :ui="{ error: 'text-xs' }"
      >
        <AppInputPassword
          v-model="form.password"
          name="password"
          autocomplete="new-password"
          required
          label="Password"
          size="xl"
        />
      </UFormField>

      <div class="text-xs py-6">
        By creating an account, you agree to Medusa Store's
        <AppLink
          class="underline"
          to="/privacy-policy"
        >
          Privacy Policy
        </AppLink>
        and
        <AppLink
          class="underline"
          to="/terms-of-use"
        >
          Terms of Use
        </AppLink>.
      </div>

      <!-- Join button -->
      <AppButtonPrimary
        type="submit"
        block
        :loading="isRegistering"
      >
        Join
      </AppButtonPrimary>
    </UForm>

    <div class="mt-6 text-center text-xs">
      <p>
        Already a member?
        <span
          class="underline cursor-pointer"
          @click="switchToSignin"
        >
          Sign in
        </span>
      </p>
    </div>
  </div>
</template>
