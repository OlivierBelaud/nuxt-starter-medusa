import type { AsyncDataOptions, NuxtApp } from '#app'

export const useStaticAsyncData = <T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
) => {
  const nuxtApp = useNuxtApp()
  const isStatic = useState<boolean>(`isStatic-${key}`, () => !!nuxtApp.payload.prerenderedAt)

  const origin = useState<string>(`origin-${key}`, () => nuxtApp.payload.prerenderedAt ? 'static' : 'server')
  // const isServer = useState<boolean>(`isStatic-${key}`, () => import.meta.server)
  // const isClient = useState<boolean>(`isStatic-${key}`, () => import.meta.client)
  // const origin = ref()
  const time = ref()

  const { data, status, error } = useLazyAsyncData<T>(
    key,
    () => {
      const callTimestamp = Date.now()
      // if (isStatic.value) {
      //   origin.value = 'static'
      //   time.value = nuxtApp.payload.prerenderedAt
      // }
      // else if (import.meta.server) {
      //   origin.value = 'server'
      // }
      // else {
      //   origin.value = 'client'
      // }
      if (import.meta.server) {
        origin.value = 'server'
      }
      else if (import.meta.client) {
        origin.value = 'client'
      }
      time.value = callTimestamp
      // console.log('callTimestamp', key, callTimestamp)
      // console.log('import.meta', key, import.meta)
      // console.log('isServer', key, import.meta.server)
      // console.log('isClient', key, import.meta.client)
      // console.log('origin.value', origin.value, time.value)
      console.log('fetching data from', import.meta.server ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  watchEffect(() => {
    console.log('origin.value', origin.value, time.value)
    // console.log('isStatic', key, isStatic.value)
    // // console.log('isServer', key, isServer.value)
    // // console.log('isClient', key, isClient.value)
    // console.log('import.meta', key, import.meta)
    // console.log('nuxtApp.payload', nuxtApp.payload)
  })

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
