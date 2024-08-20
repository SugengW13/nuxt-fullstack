import { handleAuth } from "#imports"

export default defineEventHandler(handleAsync(async (event) => {
  const requestURL = getRequestURL(event)

  const protectedRoutes = [
    '/api/auth/profile',
    '/api/auth/logout',
    '/api/grade'
  ]

  if (protectedRoutes.includes(requestURL.pathname))
    handleAuth(event)
}))
