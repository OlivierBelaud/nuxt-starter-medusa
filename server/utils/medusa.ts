import type { NitroFetchOptions } from 'nitropack'

export const $fetchMedusa = <T>(endpoint: string, opts: NitroFetchOptions<string> = {}) => {
  const config = useRuntimeConfig()
  if (!config.medusaBackendUrl) {
    throw new Error('Missing Medusa backend URL')
  }
  if (!config.medusaPublishableKey) {
    throw new Error('Missing Medusa publishable key')
  }
  return $fetch<T>(`${config.medusaBackendUrl}/store${endpoint}`, {
    ...opts,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': config.medusaPublishableKey,
      ...opts.headers,
    },
  })
}
