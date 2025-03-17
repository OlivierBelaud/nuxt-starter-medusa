<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { LoginCustomerData } from '~/composables/customer'

const emit = defineEmits<{
  'switch-to-register': []
}>()

// Connection with Medusa API
const { login, isLoading: isLoggingIn, error: apiError } = useCustomer()

// Validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
})

type FormType = z.infer<typeof formSchema>

// Form initial state
const form = ref<FormType>({
  email: '',
  password: '',
})

const formError = ref<string | undefined>(undefined)

// Form submission
const onSubmit = async (_event: FormSubmitEvent<FormType>) => {
  formError.value = undefined

  try {
    const loginData: LoginCustomerData = {
      email: form.value.email,
      password: form.value.password,
    }

    await login(loginData)
    await refreshNuxtData('customer')
  }
  catch {
    // Use API error or form error
    if (!apiError.value) {
      formError.value = 'An error occurred during sign in. Please try again.'
    }
  }
}

const displayError = computed(() => apiError.value || formError.value)

const switchToRegister = () => {
  emit('switch-to-register')
}
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <AuthFormHeader
      title="SIGN IN"
      description="Sign in to your account to continue."
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
          autocomplete="current-password"
          required
          label="Password"
          size="xl"
        />
      </UFormField>

      <!-- Sign in button -->
      <AppButtonPrimary
        type="submit"
        block
        :loading="isLoggingIn"
        class="mt-6"
      >
        Sign in
      </AppButtonPrimary>
    </UForm>

    <div class="mt-6 text-center text-xs">
      <p>
        Not a member?
        <span
          class="underline cursor-pointer"
          @click="switchToRegister"
        >
          Join us
        </span>
      </p>
    </div>
  </div>
</template>
