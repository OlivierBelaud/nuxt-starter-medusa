import type { StoreAddCartLineItem, StoreCartShippingMethod, StoreOrder, StoreProductListParams, StoreUpdateCart, StoreUpdateCartLineItem } from '@medusajs/types'

export const useFetchCategories = () => {
  const medusa = useMedusaClient()
  return useAsyncData(
    `categories`,
    async () => {
      return await medusa.store.category.list({
        fields: 'handle,name',
      })
    })
}

export const useFetchCategoryByHandle = (handle: string) => {
  const medusa = useMedusaClient()
  return useAsyncData(
    `category:${handle}`,
    async () => {
      return await medusa.store.category.list({
        handle: handle,
        fields: 'handle,name',
      })
    },
    {
      transform: data => data.product_categories[0],
    })
}

export const useFetchCollections = () => {
  const medusa = useMedusaClient()
  return useAsyncData(
    `collections`,
    async () => {
      return await medusa.store.collection.list({
        fields: 'handle,title',
      })
    })
}

export const useFetchCollectionByHandle = (handle: string) => {
  const medusa = useMedusaClient()
  return useAsyncData(
    `collection:${handle}`,
    async () => {
      return await medusa.store.collection.list({
        handle: handle,
        fields: 'handle,title',
      })
    },
    {
      transform: data => data.collections[0],
    })
}

export const useFetchRegions = () => {
  const medusa = useMedusaClient()
  return useLazyAsyncData(
    `regions`,
    async () => {
      return await medusa.store.region.list({
        fields: 'id,countries.iso_2,countries.name,countries.display_name,countries.region_id',
      })
    },
    {
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })
}

export const useFetchProductsWithCache = ({ query }: {
  query: MaybeRef<StoreProductListParams>
}) => {
  const { currentRegionId } = useCurrentCountry()

  const queryRef = toRef(query)

  const queryParams = computed(() => ({
    region_id: currentRegionId.value,
    ...queryRef.value,
  }))

  return useLazyFetch('/api/products', {
    params: queryParams,
    cache: 'force-cache',
  })
}

export const useFetchProducts = ({ query }: {
  query: MaybeRef<StoreProductListParams>
}) => {
  const medusa = useMedusaClient()
  const { currentRegionId } = useCurrentCountry()

  const queryRef = toRef(query)
  return useLazyAsyncData(
    `products:${JSON.stringify(queryRef.value)}:region:${currentRegionId.value}`,
    async () => {
      return await medusa.store.product.list({
        fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
        region_id: currentRegionId.value,
        ...queryRef.value,
      })
    }, {
      watch: [queryRef],
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })
}

export const useFetchProductByHandle = (handle: string) => {
  const medusa = useMedusaClient()
  const { currentRegionId } = useCurrentCountry()

  return useLazyAsyncData(
    `product:${handle}:region:${currentRegionId.value}`,
    async () => {
      return await medusa.store.product.list({
        handle: handle,
        region_id: currentRegionId.value,
        fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
      })
    },
    {
      transform: data => data.products[0],
      dedupe: 'cancel',
    })
}

export const useCart = () => {
  const medusa = useMedusaClient()
  const { cartId, setCartId } = useUserCart()
  const { currentRegionId } = useCurrentCountry()

  const retrieveCart = async () => {
    if (!cartId.value)
      return null

    const cartResponse = await medusa.store.cart.retrieve(cartId.value, {
      fields: '*items,*region,*items.product,*items.variant,*items.thumbnail,*items.metadata,+items.total,*promotions,+shipping_methods.name',
    })

    const cart = cartResponse.cart

    if (cart && cart?.region_id !== currentRegionId.value) {
      return await updateCart({ region_id: currentRegionId.value })
    }

    return cart
  }

  const createCart = async () => {
    const cartResponse = await medusa.store.cart.create({
      region_id: currentRegionId.value,
    })
    const cart = cartResponse.cart
    setCartId(cart.id)
    return cart
  }

  const retrieveOrCreateCart = async () => {
    const cart = await retrieveCart()
    if (!cart)
      return await createCart()
    return cart
  }

  const updateCart = async (data: StoreUpdateCart) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.update(cartId.value, data)
    refreshNuxtData('cart')
    return cartResponse.cart
  }

  const createLineItem = async (item: StoreAddCartLineItem) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.createLineItem(cartId.value, item)
    refreshNuxtData('cart')
    return cartResponse.cart
  }

  const updateLineItem = async (lineItemId: string, data: StoreUpdateCartLineItem) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    // const cartResponse = await $fetch(`/api/cart/line-item/${lineItemId}/update`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // })

    const cartResponse = await medusa.store.cart.updateLineItem(cartId.value, lineItemId, data)
    refreshNuxtData('cart')
    return cartResponse.cart
  }

  const updateOrCreateLineItem = async (item: StoreAddCartLineItem) => {
    const cart = await retrieveOrCreateCart()
    if (!cart)
      throw new Error('No existing cart found, please create one before adding items')

    const existingItem = cart.items?.find(
      lineItem => lineItem.variant_id === item.variant_id,
    )

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + (item.quantity || 1)
      return await updateLineItem(existingItem.id, { quantity: updatedQuantity })
    }
    else {
      return await createLineItem(item)
    }
  }

  const deleteLineItem = async (lineItemId: string) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.deleteLineItem(cartId.value, lineItemId)
    refreshNuxtData('cart')
    return cartResponse.deleted
  }

  const addShippingMethod = async (shippingMethodId: StoreCartShippingMethod['id']) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.addShippingMethod(cartId.value, { option_id: shippingMethodId })
    refreshNuxtData('cart')
    return cartResponse.cart
  }

  const completeOrder = async () => {
    if (!cartId.value)
      throw new Error('No existing cart found')

    return await medusa.store.cart.complete(cartId.value)
  }

  return {
    retrieveCart,
    createCart,
    retrieveOrCreateCart,
    updateCart,
    createLineItem,
    updateLineItem,
    updateOrCreateLineItem,
    deleteLineItem,
    addShippingMethod,
    completeOrder,
  }
}

export const useFetchOrder = (orderId: StoreOrder['id']) => {
  const medusa = useMedusaClient()

  return useLazyAsyncData(
    `order:${orderId}`,
    async () => await medusa.store.order.retrieve(orderId, {
      fields: '*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product',
    }),
    {
      transform: data => data.order,
    },
  )
}

export const useFetchShippingOptions = () => {
  const medusa = useMedusaClient()
  const { cartId } = useUserCart()

  return useLazyAsyncData(
    `shipping-options`,
    async () => {
      if (!cartId.value) {
        return null
      }
      return await medusa.store.fulfillment.listCartOptions({
        cart_id: cartId.value,
      })
    },
    {},
  )
}

export const useFetchPaymentProviders = () => {
  const medusa = useMedusaClient()
  const { currentRegionId } = useCurrentCountry()

  return useLazyAsyncData(
    `payment-providers`,
    async () => {
      if (!currentRegionId.value) {
        return null
      }
      return await medusa.store.payment.listPaymentProviders({
        region_id: currentRegionId.value,
      })
    },
    {},
  )
}

export const usePaymentSession = () => {
  const medusa = useMedusaClient()
  const { retrieveCart } = useCart()

  const initiatePaymentSession = async (provider_id: string) => {
    const cart = await retrieveCart()
    if (!cart)
      throw new Error('No existing cart found, please create one before updating')

    const paymentResponse = await medusa.store.payment.initiatePaymentSession(cart, {
      provider_id,
    })
    await refreshNuxtData('cart')
    return paymentResponse.payment_collection
  }

  return {
    initiatePaymentSession,
  }
}
