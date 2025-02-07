import type { StoreRegionListResponse } from '@medusajs/types'

export default defineWrappedResponseHandler(async () => {
  return await $fetchMedusa<StoreRegionListResponse>('/regions', {
    params: {
      fields: 'id,countries.iso_2,countries.name,countries.display_name,countries.region_id',
    },
  })
})
