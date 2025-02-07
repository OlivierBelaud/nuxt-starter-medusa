import type { StoreProductListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async (event) => {
  const { handle } = getRouterParams(event)
  const { region_id } = getQuery(event)

  const productListResponse = await $fetchMedusa<StoreProductListResponse>('/products', {
    params: {
      fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
      region_id,
      handle,
    },
  })

  if (!productListResponse.products.length) {
    throw createError({
      statusCode: 404,
      message: `Product ${handle} not found`,
    })
  }

  return productListResponse.products[0]
})
