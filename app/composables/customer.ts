// Types
export interface Customer {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  has_account: boolean
}

export interface CustomerResponse {
  customer: Customer | null
}

export interface RegisterCustomerData {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

export interface LoginCustomerData {
  email: string
  password: string
}

export interface UpdateCustomerData {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  phone?: string
}

/**
 * Customer data fetching with lazy loading
 */
export const useFetchCustomer = () => {
  return useFetch<CustomerResponse>('/api/customers/me', {
    key: 'customer',
    lazy: true,
  })
}

/**
 * Customer actions management (auth, profile)
 */
export const useCustomer = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Customer data
  const { data: customerData } = useFetchCustomer()

  const customer = computed(() => customerData.value?.customer || null)
  const isAuthenticated = computed(() => !!customerData.value?.customer)

  // Registration
  const register = async (data: RegisterCustomerData) => {
    error.value = null
    isLoading.value = true

    try {
      const response = await $fetch<CustomerResponse>('/api/customers/register', {
        method: 'POST',
        body: data,
      })

      await refreshNuxtData('customer')
      return response
    }
    catch (err: unknown) {
      const errorResponse = err as { data?: { message?: string }, message?: string }

      if (errorResponse.data?.message) {
        error.value = errorResponse.data.message
      }
      else if (errorResponse.message) {
        error.value = errorResponse.message
      }
      else {
        error.value = 'An error occurred during registration'
      }
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  // Login
  const login = async (data: LoginCustomerData) => {
    error.value = null
    isLoading.value = true

    try {
      const response = await $fetch<CustomerResponse>('/api/customers/login', {
        method: 'POST',
        body: data,
      })

      await refreshNuxtData('customer')
      return response
    }
    catch (err: unknown) {
      const errorResponse = err as { data?: { message?: string }, message?: string }

      if (errorResponse.data?.message) {
        error.value = errorResponse.data.message
      }
      else if (errorResponse.message) {
        error.value = errorResponse.message
      }
      else {
        error.value = 'Invalid email or password'
      }
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    error.value = null
    isLoading.value = true

    try {
      await $fetch('/api/customers/logout', {
        method: 'DELETE',
      })

      await refreshNuxtData('customer')
    }
    catch {
      // Silence error
    }
    finally {
      isLoading.value = false
    }
  }

  // Profile update
  const updateCustomer = async (data: UpdateCustomerData) => {
    error.value = null
    isLoading.value = true

    try {
      const response = await $fetch<CustomerResponse>('/api/customers/me', {
        method: 'POST',
        body: data,
      })

      await refreshNuxtData('customer')
      return response
    }
    catch (err: unknown) {
      const errorResponse = err as { status?: number, data?: { message?: string }, message?: string }

      if (errorResponse.status === 401) {
        await refreshNuxtData('customer')
      }

      if (errorResponse.data?.message) {
        error.value = errorResponse.data.message
      }
      else if (errorResponse.message) {
        error.value = errorResponse.message
      }
      else {
        error.value = 'An error occurred while updating your profile'
      }
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    customer,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    updateCustomer,
  }
}
