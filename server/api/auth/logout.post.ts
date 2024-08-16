import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.sub as string

    const user = await prisma.user.update({
      where: {id: userId},
      data: {token: null}
    })
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    event.context.auth = undefined

    return {
      code: 200,
      success: true,
      message: 'Success'
    }
  } catch (error: any) {
    console.log(error)
    throw createError({ ...error })
  }
})