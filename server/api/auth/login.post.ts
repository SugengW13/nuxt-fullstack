import prisma from "~/lib/prisma"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addDays, getUnixTime } from "date-fns"
import { resultOK, resultError } from "~/server/utils/handle-response"

export default defineEventHandler(handleAsync(async (event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw resultError(400, 'Invalid email or password')

  const isValidPassword = await compare(password, user.password)

  if (!isValidPassword) throw resultError(400, 'Invalid email or password')

  const token = jwt.sign({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(addDays(new Date(), 1))
  }, process.env.JWT_SECRET_KEY ?? 'SECRET_KEY')

  const authenticatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { token }
  })

  setCookie(event, 'access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  })

  const { password: _password, ...noPasswordUser } = authenticatedUser

  return resultOK({ ...noPasswordUser })
}))