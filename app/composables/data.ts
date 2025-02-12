import type { StoreProductListParams } from '@medusajs/types'

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

export const useFetchClientProducts = ({ query }: {
  query: MaybeRef<StoreProductListParams>
}) => {
  const { userRegionId } = useUserCountry()

  const queryRef = toRef(query)

  const queryParams = computed(() => ({
    region_id: userRegionId.value,
    ...queryRef.value,
  }))

  return useLazyFetch('/api/products', {
    params: queryParams,
    cache: 'force-cache',
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  })
}

export const useFetchProducts = ({ query }: {
  query: MaybeRef<StoreProductListParams>
}) => {
  const medusa = useMedusaClient()
  const { userRegionId } = useUserCountry()

  const queryRef = toRef(query)
  return useLazyAsyncData(
    `products:${JSON.stringify(queryRef.value)}`,
    async () => {
      return await medusa.store.product.list({
        fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
        region_id: userRegionId.value,
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
  const { userRegionId } = useUserCountry()

  return useLazyAsyncData(
    `product:${handle}:region:${userRegionId.value}`,
    async () => {
      return await medusa.store.product.list({
        handle: handle,
        region_id: userRegionId.value,
        fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
      })
    },
    {
      transform: data => data.products[0],
      dedupe: 'defer',
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })
}
