export const useFetchCategories = () => useLazyFetch('/api/categories')
export const useFetchCategoryByHandle = (handle: string) => useLazyFetch(`/api/categories/${handle}`)

export const useFetchCollections = () => useLazyFetch('/api/collections')
export const useFetchCollectionByHandle = (handle: string) => useLazyFetch(`/api/collections/${handle}`)

export const useFetchRegions = () => useLazyFetch('/api/regions', {
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
