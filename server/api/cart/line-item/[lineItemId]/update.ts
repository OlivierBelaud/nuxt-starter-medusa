import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)
  // const query = getQuery(event)
  const cartId = getCookie(event, 'cart_id')
  const lineItemId = getRouterParam(event, 'lineItemId')
  const data = await readBody(event)

  if (!cartId || !lineItemId) {
    return {
      statusCode: 400,
      body: {
        message: 'No cart found',
      },
    }
  }

  return await medusa.store.cart.updateLineItem(cartId, lineItemId, data)
})
