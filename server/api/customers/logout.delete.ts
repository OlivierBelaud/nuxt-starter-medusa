// import { serverMedusaClient } from '#medusa/server'

export default defineWrappedResponseHandler(async (event) => {
  deleteCookie(event, 'medusa_jwt')

  return { success: true }
})
