export default defineNuxtRouteMiddleware((to, _) => {
  const { status } = useAuth()

  const protectedRoutePath = [
    '/profile'
  ]

  if (!isAuthenticated(status.value) && protectedRoutePath.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})