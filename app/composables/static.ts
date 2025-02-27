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

  const origin = useState<Context>(key, () => ({
    fetchOrigin: (nuxtApp.payload && nuxtApp.payload.prerenderedAt)
      ? 'static'
      : (import.meta.server ? 'server' : 'client'),
    fetchTimestamp: (nuxtApp.payload && nuxtApp.payload.prerenderedAt) || Date.now(),
  }))

  const { data, status, error, refresh, execute, clear } = useLazyAsyncData<T>(
    key,
    async () => {
      console.log('Fetching data from', import.meta.server ? 'server' : 'client')
      return await fetcher().then((data) => {
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
  )

  // Pour le debug : observe les mises à jour de origin
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
