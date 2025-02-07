import type { StoreCollectionListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')

  const collectionListResponse = await $fetchMedusa<StoreCollectionListResponse>('/collections', {
    params: {
      fields: 'handle,title',
      handle,
    },
  })

  if (!collectionListResponse.collections.length) {
    throw createError({
      statusCode: 404,
      message: `Collection ${handle} not found`,
    })
  }

  return collectionListResponse.collections[0]
})
