import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const handle = getRouterParam(event, 'handle')

  const response = await medusa.store.category.list({
    handle: handle,
    fields: 'handle,name',
  })

  return response.product_categories[0]
})
