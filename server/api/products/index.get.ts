import type { StoreProductListResponse } from '@medusajs/types'
import { SORT_OPTIONS } from '~/types/filter'

export default defineWrappedResponseHandler(async (event) => {
  // We don't spread query object in fetch params because we want to control the fields allowed in frontend
  const {
    handle,
    region_id,
    collection_id,
    category_id,
    limit,
    offset,
  } = getQuery(event)

  return await $fetchMedusa<StoreProductListResponse>('/products', {
    params: {
      fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
      order: SORT_OPTIONS.CREATED_AT,
      handle,
      region_id,
      collection_id,
      category_id,
      limit,
      offset,
    },
  })
})
