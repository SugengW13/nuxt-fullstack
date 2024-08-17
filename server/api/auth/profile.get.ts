import prisma from "~/lib/prisma"
import { handleAsync } from "~/server/utils/handle-async"

export default defineEventHandler(handleAsync(async (event) => {
  const userId = event.context.auth?.sub as string

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw resultUnauthorized()

  const { password: _password, ...noPasswordUser } = user

  return {
    code: 200,
    success: true,
    message: 'Success',
    data: { ...noPasswordUser }
  }
}))