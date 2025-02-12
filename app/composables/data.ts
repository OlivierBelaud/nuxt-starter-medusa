import type { StoreProductListParams } from '@medusajs/types'
import { SORT_OPTIONS } from '~/types/filter'

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

export const useFetchProducts = ({ query }: {
  query: MaybeRef<StoreProductListParams>
}) => {
  const { userRegionId } = useUserCountry()

  const queryRef = toRef(query)

  watchEffect(() => {
    console.log('queryRef', queryRef.value)
  })

  const queryParams = computed(() => ({
    fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
    region_id: userRegionId.value,
    order: SORT_OPTIONS.CREATED_AT,
    ...queryRef.value,
  }))

  return useLazyFetch('/api/products', {
    params: queryParams,
    cache: 'force-cache',
  })

  // return useAsyncData(
  //   `products:${JSON.stringify(queryRef.value)}`,
  //   async () => {
  //     console.log('fetch')
  //     return await medusa.store.product.list({
  //       fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
  //       region_id: userRegionId.value,
  //       ...queryRef.value,
  //     })
  //   }, {
  //     watch: [queryRef],
  //     getCachedData(key, nuxtApp) {
  //       console.log('nuxtApp.payload.data[key])', key, nuxtApp.payload.data[key])
  //       return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  //     },
  //   })
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
    })
}
