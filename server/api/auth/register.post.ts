import { hash } from 'bcrypt'
import prisma from '~/lib/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const { email, password, password_confirmation } = await readBody(event)

    if (!email || !password || !password_confirmation) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All fields are required'
      })
    }

    if (password !== password_confirmation) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must match'
      })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const { password: _password, ...noPasswordUser } = user

    return {
      success: true,
      code: 201,
      data: { ...noPasswordUser },
      message: 'Success'
    }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const code = error.code
      
      switch (code) {
        case 'P2002': throw createError({
          statusCode: 400,
          statusMessage: 'Email already registered'
        })
      }
    }
    
    console.log(error)

    throw createError({ ...error })
  }
})