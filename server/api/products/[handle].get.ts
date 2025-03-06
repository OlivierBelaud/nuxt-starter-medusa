import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const query = getQuery(event)
  const handle = getRouterParam(event, 'handle')

  const response = await medusa.store.product.list({
    fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
    handle: handle,
    ...query,
  })

  return response.products[0]
})
