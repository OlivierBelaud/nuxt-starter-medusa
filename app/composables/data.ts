import type { StoreAddCartLineItem, StoreCartResponse, StoreCartShippingMethod, StoreOrder, StoreProductListParams, StoreUpdateCart, StoreUpdateCartLineItem } from '@medusajs/types'

export const useFetchCategories = () => {
  const medusa = useMedusaClient()
  return useLazyAsyncData(
    `categories`,
    async () => {
      return await medusa.store.category.list({
        fields: 'handle,name,*parent_category,*category_children',
      })
    })
}

export const useFetchCollections = () => {
  const medusa = useMedusaClient()
  return useLazyAsyncData(
    `collections`,
    async () => {
      return await medusa.store.collection.list({
        fields: 'handle,title',
      })
    })
}

export const useFetchCollectionByHandle = (handle: string) => useLazyFetch(`/api/collections/${handle}`, {
  key: `collection:${handle}`,
})

export const useFetchCategoryByHandle = (handle: string) => useLazyFetch(`/api/categories/${handle}`, {
  key: `category:${handle}`,
})

export const useFetchProducts = (query: MaybeRef<StoreProductListParams>, prefetch?: boolean) => {
  const { country } = useCountry()

  const queryRef = toRef(query)

  const queryParams = computed(() => ({
    region_id: country.value?.region_id,
    ...queryRef.value,
  }))

  const key = computed(() => `products:${queryParams.value?.collection_id}:${queryParams.value?.category_id}:${queryParams.value?.limit}:${queryParams.value?.offset}:${country.value?.region_id}`)

  return useLazyFetch('/api/products', {
    key: key.value,
    params: queryParams,
    watch: prefetch ? false : [queryParams],
    immediate: !prefetch,
  })
}

export const useFetchProductByHandle = (handle: string) => {
  const { country } = useCountry()
  const NuxtApp = useNuxtApp()

  return useLazyFetch(
    `/api/products/${handle}`,
    {
      key: `product:${handle}:region:${country.value?.region_id}`,
      params: {
        region_id: country.value?.region_id,
      },
      default: () => {
        for (const key of Object.keys(NuxtApp.payload.data)) {
          if (key.startsWith('products')) {
            const productsList = NuxtApp.payload.data[key].products
            if (Array.isArray(productsList)) {
              for (const product of productsList) {
                if (product.handle === handle) {
                  return product
                }
              }
            }
          }
        }
      },
    })
}

export const useFetchCountries = () => {
  return useLazyFetch('/api/regions', {
    key: 'countries',
    transform: data => getCountriesFromRegions(data?.regions),
  })
}

export const useCart = () => {
  const medusa = useMedusaClient()
  const { cartId, setCartId } = useUserCart()
  const { country } = useCountry()

  const retrieveCart = async () => {
    if (!cartId.value)
      return { cart: null }

    const cartResponse = await medusa.store.cart.retrieve(cartId.value, {
      fields: '*items,*region,*items.product,*items.variant,*items.thumbnail,*items.metadata,+items.total,*promotions,+shipping_methods.name',
    })

    if (cartResponse.cart && cartResponse.cart?.region_id !== country.value?.region_id) {
      updateCart({ region_id: country.value?.region_id })
    }

    return cartResponse
  }

  const createCart = async () => {
    const cartResponse = await medusa.store.cart.create({
      region_id: country.value?.region_id,
    })
    setCartId(cartResponse.cart.id)
    return cartResponse
  }

  const retrieveOrCreateCart = async () => {
    const cartResponse = await retrieveCart()
    if (!cartResponse.cart)
      return await createCart()
    return cartResponse
  }

  const updateCart = async (data: StoreUpdateCart) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.update(cartId.value, data)
    refreshNuxtData(`cart`)
    return cartResponse.cart
  }

  const createLineItem = async (item: StoreAddCartLineItem) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.createLineItem(cartId.value, item)
    refreshNuxtData(`cart`)
    return cartResponse.cart
  }

  const updateLineItem = async (lineItemId: string, data: StoreUpdateCartLineItem) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.updateLineItem(cartId.value, lineItemId, data)
    refreshNuxtData(`cart`)
    return cartResponse.cart
  }

  const updateOrCreateLineItem = async (item: StoreAddCartLineItem) => {
    const cartResponse = await retrieveOrCreateCart()
    if (!cartResponse.cart)
      throw new Error('No existing cart found, please create one before adding items')

    const existingItem = cartResponse.cart.items?.find(
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
    refreshNuxtData(`cart`)
    return cartResponse.deleted
  }

  const addShippingMethod = async (shippingMethodId: StoreCartShippingMethod['id']) => {
    if (!cartId.value)
      throw new Error('No existing cart found, please create one before updating')

    const cartResponse = await medusa.store.cart.addShippingMethod(cartId.value, { option_id: shippingMethodId })
    refreshNuxtData(`cart`)
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
  const { country } = useCountry()

  return useLazyAsyncData(
    `payment-providers`,
    async () => {
      if (!country.value?.region_id) {
        return null
      }
      return await medusa.store.payment.listPaymentProviders({
        region_id: country.value?.region_id,
      })
    },
    {},
  )
}

export const usePaymentSession = () => {
  const medusa = useMedusaClient()

  const initiatePaymentSession = async (provider_id: string) => {
    const { data: cartResponse } = useNuxtData<StoreCartResponse>('cart')
    if (!cartResponse.value?.cart)
      throw new Error('No existing cart found, please create one before updating')

    const paymentResponse = await medusa.store.payment.initiatePaymentSession(cartResponse.value?.cart, {
      provider_id,
    })
    await refreshNuxtData(`cart`)
    return paymentResponse.payment_collection
  }

  return {
    initiatePaymentSession,
  }
}
