import type { AsyncDataOptions, NuxtApp } from '#app'

export const useStaticAsyncData = <T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
) => {
  const nuxtApp = useNuxtApp()
  const isStatic = useState<boolean>(`isStatic-${key}`, () => !!nuxtApp.payload.prerenderedAt)

  const { data, status, error, refresh: refreshAsyncData } = useLazyAsyncData<T>(
    key,
    () => {
      console.log('fetching data from', isStatic.value ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  const refresh = async (): Promise<void> => {
    refreshAsyncData().then(() => {
      isStatic.value = false
    })
  }

  return {
    data,
    status,
    error,
    isStatic,
    refresh,
  }
}
