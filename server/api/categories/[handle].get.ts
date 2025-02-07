import type { StoreProductCategoryListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')

  const categoryListResponse = await $fetchMedusa<StoreProductCategoryListResponse>('/product-categories', {
    params: {
      fields: 'handle,name',
      handle,
    },
  })

  if (!categoryListResponse.product_categories.length) {
    throw createError({
      statusCode: 404,
      message: `Category ${handle} not found`,
    })
  }

  return categoryListResponse.product_categories[0]
})
