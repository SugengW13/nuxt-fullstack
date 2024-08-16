export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth()

  const protectedRoutePath = [
    '/dashboard'
  ]

  if (status.value === 'unauthenticated' && protectedRoutePath.includes(from.path)) {
    console.log('Redirect to login')
  }

  if (status.value === 'authenticated' && to.path === '/login') {
    console.log('adf')
    return navigateTo('/dashboard')
  }
})