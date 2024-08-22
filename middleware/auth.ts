export default defineNuxtRouteMiddleware((to, _) => {
  const { status } = useAuth()

  const protectedRoutePath = [
    '/dashboard',
    '/profile'
  ]

  // if (status.value === 'unauthenticated' && protectedRoutePath.includes(to.path)) {
  //   return navigateTo('/login')
  // }

  // if (status.value === 'authenticated' && to.path === '/login') {
  //   return navigateTo('/dashboard')
  // }
})