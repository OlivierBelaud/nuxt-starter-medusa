import type { AsyncDataOptions, NuxtApp } from '#app'

interface Context {
  fetchOrigin: 'server' | 'client' | 'static'
  fetchTimestamp: number
}

export const useStaticAsyncData = <T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
) => {
  const nuxtApp = useNuxtApp()

  const origin = useState<Context>(`context-${key}`, () => ({
    fetchOrigin: nuxtApp.payload.prerenderedAt ? 'static' : 'server',
    fetchTimestamp: nuxtApp.payload.prerenderedAt || Date.now(),
  }))

  const { data, status, error, refresh, execute, clear } = useLazyAsyncData<T>(
    key,
    () => {
      const callTimestamp = Date.now()
      if (import.meta.server) {
        origin.value = {
          fetchOrigin: 'server',
          fetchTimestamp: callTimestamp,
        }
      }
      else if (import.meta.client) {
        console.log('fetching data from client')
        origin.value = {
          fetchOrigin: 'client',
          fetchTimestamp: callTimestamp,
        }
      }
      console.log('fetching data from', import.meta.server ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  watchEffect(() => {
    console.log('origin.value', origin.value)
  })

  const refreshCachedData = async (): Promise<void> => {
    await refreshNuxtData(key)
  }

  return {
    data,
    status,
    error,
    origin,
    refresh,
    execute,
    clear,
    refreshCachedData,
  }
}
