import type { StorePaymentCollection } from '@medusajs/types'

export const useInitiatePaymentSession = () => {
  const { initiatePaymentSession } = usePaymentSession()

  const loading = ref(false)
  const data = ref<StorePaymentCollection>()

  const mutate = async (provider_id: string) => {
    loading.value = true

    try {
      data.value = await initiatePaymentSession(provider_id)
    }
    catch (error) {
      console.error('Error initiating payment session:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}
