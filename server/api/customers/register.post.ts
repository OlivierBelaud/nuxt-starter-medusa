import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const body = await readBody(event)

  // Step 1: Get an authentication token via the auth.register method
  const token = await medusa.auth.register(
    'customer',
    'emailpass',
    {
      email: body.email,
      password: body.password,
    },
  )

  setCookie(event, 'medusa_jwt', token)

  // Step 2: Create the customer using the obtained token
  return await medusa.store.customer.create(
    {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
    },
    {}, // empty query params
    {
      Authorization: `Bearer ${token}`,
    },
  )
})
