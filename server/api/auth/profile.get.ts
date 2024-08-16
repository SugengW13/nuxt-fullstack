import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    console.log(event.context.auth)
    const userId = event.context.auth?.sub as string

    const user = await prisma.user.findUnique({
      where: {id: userId}
    })
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

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
  } catch(error: any) {
    console.log(error)
    throw createError({...error})
  }
})