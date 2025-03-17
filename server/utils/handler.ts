import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import type { MedusaError } from '../types/medusa-error'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event: H3Event) => {
    try {
      return await handler(event)
    }
    catch (err) {
      console.error('Error while handling event', err)

      // Handle Medusa errors with appropriate status codes
      const medusaError = err as MedusaError

      throw createError({
        statusCode: medusaError.status || 500,
        message: medusaError.message || 'Internal Server Error',
      })
    }
  })
