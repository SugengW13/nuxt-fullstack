import prisma from "~/lib/prisma"

export default defineEventHandler(handleAsync(async (event) => {
  const userId = event.context.auth?.sub as string

  const user = await prisma.user.update({
    where: { id: userId },
    data: { token: null }
  })

  if (!user) throw resultUnauthorized()

  deleteCookie(event, 'access_token')

  return {
    code: 200,
    success: true,
    message: 'Success'
  }
}))