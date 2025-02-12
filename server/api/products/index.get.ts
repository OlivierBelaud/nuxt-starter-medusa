import type { StoreProductListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async (event) => {
  const query = getQuery(event)

  return await $fetchMedusa<StoreProductListResponse>('/products', {
    params: query,
  })
})
