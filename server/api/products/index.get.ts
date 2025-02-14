import { SORT_OPTIONS } from '~/types/filter'
import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  const query = getQuery(event)

  return await medusa.store.product.list({
    fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
    order: SORT_OPTIONS.CREATED_AT,
    ...query,
  })
})
