import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const body = await readBody(event)

  const token = getCookie(event, 'medusa_jwt')

  // Update customer information
  return await medusa.store.customer.update(body, {
    Authorization: `Bearer ${token}`,
  })
})
