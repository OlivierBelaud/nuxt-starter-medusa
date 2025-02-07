import type { StoreCollectionListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async () => {
  return await $fetchMedusa<StoreCollectionListResponse>('/collections', {
    params: {
      fields: 'handle,title',
    },
  })
})
