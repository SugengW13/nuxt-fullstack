import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handleError(error: any) {
  console.log(error)

  let statusCode = error.statusCode
  let message = error.message

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        statusCode = 400
        message = `Unique constraint failed on the ${error.meta?.target}`
        break
    }
  }

  return createError({ statusCode, message })
}