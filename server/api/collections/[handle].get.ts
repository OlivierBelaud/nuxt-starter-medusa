import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const handle = getRouterParam(event, 'handle')

  const response = await medusa.store.collection.list({
    handle: handle,
    fields: 'handle,title',
  })

  return response.collections[0]
})
