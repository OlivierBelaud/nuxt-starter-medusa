import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const body = await readBody(event)

  const token = await medusa.auth.login(
    'customer',
    'emailpass',
    {
      email: body.email,
      password: body.password,
    },
  )

  setCookie(event, 'medusa_jwt', token)

  return await medusa.store.customer.retrieve({}, {
    Authorization: `Bearer ${token}`,
  })
})
