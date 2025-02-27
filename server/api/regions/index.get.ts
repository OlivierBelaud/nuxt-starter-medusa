import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  const medusa = serverMedusaClient(event)

  return await medusa.store.region.list({
    fields: 'id,countries.iso_2,countries.name,countries.display_name,countries.region_id',
  })
})
