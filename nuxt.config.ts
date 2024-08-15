// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: { port: 3030 },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@prisma/nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  supabase: {
    url: process.env.DATABASE_URL,
    key: process.env.DATABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register']
    }
  },
  prisma: {
    installStudio: false
  },
  auth: {
    isEnabled: true,
    baseURL: `${process.env.API_BASE_URL}/api/auth`,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/profile', method: 'get' }
      },
      pages: { login: '/login' },
      token: {
        signInResponseTokenPointer: '/data/token',
        maxAgeInSeconds: 60 * 60 * 24
      }
    },
    globalAppMiddleware: true
  },
  googleFonts: {
    families: {
      Poppins: true
    },
    display: 'swap'
  }
})