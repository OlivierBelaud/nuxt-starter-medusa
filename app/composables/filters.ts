import { SORT_OPTIONS, type SortOptionsType } from '~/types/filter'

export const useFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const sortOptions = [
    {
      value: SORT_OPTIONS.CREATED_AT,
      label: 'Latest Arrivals',
    },
    {
      value: SORT_OPTIONS.PRICE_ASC,
      label: 'Price: Low -> High',
    },
    {
      value: SORT_OPTIONS.PRICE_DESC,
      label: 'Price: High -> Low',
    },
  ]

  const pageNumber = ref(route.query.page ? parseInt(route.query.page as string) : 1)
  const sortBy = ref((route.query.sortBy as SortOptionsType | undefined) || SORT_OPTIONS.CREATED_AT)

  watch(pageNumber, (newPageNumber) => {
    const newQuery = { ...route.query }
    delete newQuery.page
    if (newPageNumber !== 1) {
      newQuery.page = newPageNumber.toString()
    }
    router.push({
      query: newQuery,
    })
  })

  watch(sortBy, async (newSortBy) => {
    const newQuery = { ...route.query }
    delete newQuery.sortBy
    if (newSortBy !== SORT_OPTIONS.CREATED_AT) {
      newQuery.sortBy = newSortBy
    }
    await router.push({
      query: newQuery,
    })
    nextTick(() => {
      pageNumber.value = 1
    })
  })

  return {
    sortOptions,
    sortBy,
    pageNumber,
  }
}
