import type { StoreAddCartLineItem, StoreCart, StoreCartShippingMethod, StoreOrder, StoreUpdateCart, StoreUpdateCartLineItem } from '@medusajs/types'

export const useUserCart = () => {
  const cartIdCookie = useCookie('cart_id', {
    maxAge: 60 * 60 * 24 * 90,
  })

  const setCartId = (cartId?: string) => {
    if (!cartId)
      cartIdCookie.value = null
    cartIdCookie.value = cartId
  }

  return {
    cartId: computed(() => cartIdCookie.value || undefined),
    setCartId,
  }
}

export const useCartDropdown = () => {
  const route = useRoute()
  const isCartDropdownOpen = useState('cart-dropdown', () => false)

  watch(route, (newRoute) => {
    if (newRoute.path.includes('cart'))
      isCartDropdownOpen.value = false
  })

  return {
    isCartDropdownOpen,
  }
}

export const useFetchCart = () => {
  const { retrieveCart } = useCart()

  return useLazyAsyncData(
    'cart',
    async () => await retrieveCart(),
    {
      server: false,
      dedupe: 'defer',
    },
  )
}

export const useAddToCart = () => {
  const { updateOrCreateLineItem } = useCart()

  const loading = ref(false)
  const data = ref<StoreCart>()

  const mutate = async (item: StoreAddCartLineItem) => {
    loading.value = true

    try {
      data.value = await updateOrCreateLineItem(item)
    }
    catch (error) {
      console.error('Error updating cart:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}

export const useUpdateCart = () => {
  const { updateCart } = useCart()

  const loading = ref(false)
  const data = ref<StoreCart>()

  const mutate = async (dataToUpdate: StoreUpdateCart) => {
    loading.value = true

    try {
      data.value = await updateCart(dataToUpdate)
    }
    catch (error) {
      console.error('Error updating cart:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}

export const useUpdateLineItem = () => {
  const { updateLineItem } = useCart()

  const loading = ref(false)
  const data = ref<StoreCart>()

  const mutate = async (itemId: string, dataToUpdate: StoreUpdateCartLineItem) => {
    loading.value = true

    try {
      data.value = await updateLineItem(itemId, dataToUpdate)
    }
    catch (error) {
      console.error('Error updating line item:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}

export const useDeleteLineItem = () => {
  const { deleteLineItem } = useCart()

  const loading = ref(false)
  const data = ref<boolean>()

  const mutate = async (itemId: string) => {
    loading.value = true

    try {
      data.value = await deleteLineItem(itemId)
    }
    catch (error) {
      console.error('Error deleting line item:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}

export const useSetShippingMethod = () => {
  const { addShippingMethod } = useCart()

  const loading = ref(false)
  const data = ref<StoreCart>()

  const mutate = async (shippingMethodId: StoreCartShippingMethod['id']) => {
    loading.value = true

    try {
      data.value = await addShippingMethod(shippingMethodId)
    }
    catch (error) {
      console.error('Error setting shipping method:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}

export const usePlaceOrder = () => {
  const { completeOrder } = useCart()
  const { setCartId } = useUserCart()
  const { currentCountryCode } = useCurrentCountry()

  const loading = ref(false)
  const data = ref<StoreOrder | StoreCart>()

  const mutate = async () => {
    loading.value = true

    try {
      const orderResponse = await completeOrder()
      if (orderResponse.type === 'order') {
        setCartId()
        data.value = orderResponse.order
        navigateTo(`/${currentCountryCode.value}/order/${orderResponse.order.id}/confirmed`)
      }
      else
        data.value = orderResponse.cart
    }
    catch (error) {
      console.error('Error placing order:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    mutate,
  }
}
