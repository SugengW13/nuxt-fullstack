import type { EventHandler } from 'h3'
import { handlePrismaError } from './handle-prisma-error'

export function handleAsync(handler: EventHandler) {
  return defineEventHandler(async (event) => {
    try {
      const res = await handler(event)
      return res
    } catch (e: any) {
      console.log(e)
      handlePrismaError(e)
      throw createError({ ...e })
    }
  })
}
