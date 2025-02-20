import { SORT_OPTIONS, type SortOptionsType } from '~/types/filter'

export const useFilters = () => {
  const route = useRoute()
  const router = useRouter()

  // Options de tri disponibles
  const sortOptions = [
    { value: SORT_OPTIONS.CREATED_AT, label: 'Latest Arrivals' },
    { value: SORT_OPTIONS.PRICE_ASC, label: 'Price: Low -> High' },
    { value: SORT_OPTIONS.PRICE_DESC, label: 'Price: High -> Low' },
  ]

  // Flag pour différencier SSR et client
  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })

  const pageNumber = computed<number>({
    get: () => {
      if (!isMounted.value) return 1
      return route.query.page ? parseInt(route.query.page as string) : 1
    },
    set: (newPage: number) => {
      const newQuery = { ...route.query }
      if (newPage === 1) {
        delete newQuery.page
      }
      else {
        newQuery.page = newPage.toString()
      }
      router.push({ query: newQuery })
    },
  })

  const sortBy = computed<SortOptionsType>({
    get: () => {
      if (!isMounted.value) return SORT_OPTIONS.CREATED_AT
      return (route.query.sortBy as SortOptionsType) || SORT_OPTIONS.CREATED_AT
    },
    set: async (newSortBy: SortOptionsType) => {
      const newQuery = { ...route.query }
      if (newSortBy === SORT_OPTIONS.CREATED_AT) {
        delete newQuery.sortBy
      }
      else {
        newQuery.sortBy = newSortBy
      }
      await router.push({ query: newQuery })
      nextTick(() => {
        pageNumber.value = 1
      })
    },
  })

  return { sortOptions, sortBy, pageNumber }
}
