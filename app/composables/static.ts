import type { AsyncDataOptions, NuxtApp } from '#app'

export const useStaticAsyncData = <T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
) => {
  const nuxtApp = useNuxtApp()
  const isStatic = useState<boolean>(`isStatic-${key}`, () => !!nuxtApp.payload.prerenderedAt)
  // const isServer = useState<boolean>(`isStatic-${key}`, () => import.meta.server)
  // const isClient = useState<boolean>(`isStatic-${key}`, () => import.meta.client)

  watchEffect(() => {
    console.log('isStatic', key, isStatic.value)
    // console.log('isServer', key, isServer.value)
    // console.log('isClient', key, isClient.value)
    console.log('import.meta', key, import.meta)
    console.log('nuxtApp.payload', nuxtApp.payload)
  })

  const { data, status, error } = useLazyAsyncData<T>(
    key,
    () => {
      const callTimestamp = Date.now()
      console.log('callTimestamp', key, callTimestamp)
      console.log('import.meta', key, import.meta)
      console.log('isServer', key, import.meta.server)
      console.log('isClient', key, import.meta.client)
      console.log('fetching data from', import.meta.server ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  const refresh = async (): Promise<void> => {
    await refreshNuxtData(key)
    isStatic.value = false
  }

  return {
    data,
    status,
    error,
    isStatic,
    refresh,
  }
}
