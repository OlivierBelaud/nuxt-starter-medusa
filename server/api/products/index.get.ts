import type { StoreProductListResponse } from '@medusajs/types'
import { SORT_OPTIONS } from '~/types/filter'

export default defineWrappedResponseHandler(async (event) => {
  const query = getQuery(event)

  return await $fetchMedusa<StoreProductListResponse>('/products', {
    params: {
      fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
      order: SORT_OPTIONS.CREATED_AT,
      ...query,
    },
  })
})
