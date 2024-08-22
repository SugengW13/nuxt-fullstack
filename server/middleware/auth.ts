import { handleAuth } from "#imports"

export default defineEventHandler(handleAsync(async (event) => {
  const path = getRequestURL(event).pathname
  const method = event.method

  const protectedRoutes: Record<string, string[]> = {
    'GET': ['/api/auth/profile'],
    'POST': ['/api/auth/logout'],
    'PUT': ['/api/auth/profile'],
    'DELETE': []
  }

  if (protectedRoutes[method] && protectedRoutes[method].includes(path)) {
    await handleAuth(event)
  }
}))
