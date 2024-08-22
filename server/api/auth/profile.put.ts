import prisma from "~/lib/prisma"
import { handleAsync } from "~/server/utils/handle-async"
import jwt from 'jsonwebtoken'
import { addDays, getUnixTime } from "date-fns"

export default defineEventHandler(handleAsync(async (event) => {
  const userId = event.context.auth?.sub as string

  const { name } = await readBody(event)

  if (!name) throw resultError(400, 'Name is required')

  const user = await prisma.user.update({
    where: { id: userId },
    data: { name }
  })

  if (!user) throw resultUnauthorized()

  const token = jwt.sign({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(addDays(new Date(), 1))
  }, process.env.JWT_SECRET_KEY ?? 'SECRET_KEY')

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { token }
  })

  setCookie(event, 'access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  })
  const { password: _password, ...noPasswordUser } = updatedUser

  return {
    code: 200,
    success: true,
    message: 'Success',
    data: { ...noPasswordUser }
  }
}))