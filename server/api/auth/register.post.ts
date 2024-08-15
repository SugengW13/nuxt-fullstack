import { hash } from 'bcrypt'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const { email, password, passwordConfirmation } = await readBody(event)

    if (!email || !password || !passwordConfirmation) {
      return {
        message: 'All fields are required'
      }
    }

    if (password !== passwordConfirmation) {
      return {
        message: 'Passwords must match'
      }
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    return {
      success: true,
      code: 201,
      data: { ...user },
      message: 'Success'
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      success: false
    }
  }
})