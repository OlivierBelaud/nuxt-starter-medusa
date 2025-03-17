import type { MedusaError } from '../../types/medusa-error'
import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)

  const token = getCookie(event, 'medusa_jwt')
  console.log('medusa_jwt', token)

  try {
    // Retrieve current customer information
    return await medusa.store.customer.retrieve({}, {
      Authorization: `Bearer ${token}`,
    })
  }
  catch (error) {
    // If the error is a 401 error, the user is not logged in
    const medusaError = error as MedusaError
    if (medusaError.status === 401) {
      return { customer: null }
    }

    // For any other error, propagate it to the global handler
    throw error
  }
})
