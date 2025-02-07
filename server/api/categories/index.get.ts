import type { StoreProductCategoryListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async () => {
  return await $fetchMedusa<StoreProductCategoryListResponse>('/product-categories', {
    params: {
      fields: 'handle,name',
    },
  })
})
