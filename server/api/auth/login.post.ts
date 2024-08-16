import prisma from "~/lib/prisma"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addDays, getUnixTime } from "date-fns"

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    let user = await prisma.user.findUnique({
      where: { email: email }
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email or password'
      })
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email or password'
      })
    }

    const token = jwt.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(addDays(new Date(), 1))
    }, process.env.JWT_SECRET_KEY ?? 'SECRET_KEY')

    user = await prisma.user.update({
      where: { id: user.id },
      data: { token }
    })

    return {
      code: 200,
      success: true,
      message: 'Success',
      data: {
        id: user.id,
        email: user.email,
        token: user.token,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at
      }
    }
  } catch (error: any) {
    console.log(error)
    throw createError({ ...error })
  }
})