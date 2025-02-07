import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event: H3Event) => {
    try {
      return await handler(event)
    }
    catch (err) {
      // TODO: Handle Medusa errors
      console.error('Error while handling event', err)
      throw createError({
        statusCode: 500,
        message: 'Internal Server Error',
      })
    }
  })
