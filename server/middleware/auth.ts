import jwt from "jsonwebtoken"

export default defineEventHandler((event) => {
  try {
    const requestURL = getRequestURL(event)
    const headers = getHeaders(event)
    const authorizationHeader = headers.authorization

    const verifyJWT = () => {
      if (!authorizationHeader) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized'
        })
      }

      const token = authorizationHeader.split(' ')[1]

      jwt.verify(token, process.env.JWT_SECRET_KEY || 'SECRET_KEY', (error, decoded) => {        
        if (error) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
          })
        }

        event.context.auth = decoded
      })
    }

    const protectedRoutes = [
      '/api/auth/profile',
      '/api/auth/logout'
    ]

    if (protectedRoutes.includes(requestURL.pathname)) verifyJWT()
  } catch (error: any) {
    console.log(error)
    throw createError({ ...error })
  }
})
