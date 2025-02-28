import type { AsyncData, AsyncDataOptions, NuxtApp } from '#app'

interface Context {
  fetchOrigin: 'server' | 'client' | 'static'
  fetchTimestamp: number
}

type StaticAsyncDataReturn<T, E = unknown> = AsyncData<T, E> & {
  origin: Ref<Context>
  refreshCachedData: () => Promise<void>
}

export const useStaticAsyncData = async <T, E = unknown>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
): Promise<StaticAsyncDataReturn<T, E>> => {
  const nuxtApp = useNuxtApp()

  const origin = useState<Context>(key, () => ({
    fetchOrigin: (nuxtApp.payload && nuxtApp.payload.prerenderedAt)
      ? 'static'
      : (import.meta.server ? 'server' : 'client'),
    fetchTimestamp: (nuxtApp.payload && nuxtApp.payload.prerenderedAt) || Date.now(),
  }))

  watchEffect(() => {
    console.log('origin.value', key, origin.value)
  })

  const refreshCachedData = async (): Promise<void> => {
    await refreshNuxtData(key)
  }

  return {
    ...useLazyAsyncData<T>(
      key,
      async () => {
        console.log('Fetching data from', import.meta.server ? 'server' : 'client')
        return await fetcher(nuxtApp).then((data) => {
          const callTimestamp = Date.now()
          if (import.meta.server) {
            origin.value = {
              fetchOrigin: (nuxtApp.payload && nuxtApp.payload.prerenderedAt) ? 'static' : 'server',
              fetchTimestamp: callTimestamp,
            }
          }
          else if (import.meta.client) {
            origin.value = {
              fetchOrigin: 'client',
              fetchTimestamp: callTimestamp,
            }
          }
          return data
        })
      },
      options,
    ),
    origin,
    refreshCachedData,
  } as unknown as AsyncData<T, E>
}
