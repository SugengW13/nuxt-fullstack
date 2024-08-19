import type { EventHandler } from 'h3'
import { handleError } from './handle-error'

export function handleAsync(handler: EventHandler) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event)
    } catch (e: any) {
      throw handleError(e)
    }
  })
}
