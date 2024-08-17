import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlePrismaError(error: any) {
  let message = undefined

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        message = `Unique constraint failed on the ${error.meta?.target}`
    }

    throw createError({
      statusCode: 400,
      message
    })
  }
}