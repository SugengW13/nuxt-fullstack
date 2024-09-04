// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: { port: 3030 },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@prisma/nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts'
  ],
  supabase: {
    url: process.env.DATABASE_URI,
    key: process.env.DATABASE_KEY,
    redirect: false
  },
  prisma: {
    installCLI: false,
    installClient: false,
    installStudio: false
  },
  auth: {
    isEnabled: true,
    baseURL: `${process.env.API_BASE_URL}/auth`,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/profile', method: 'get' }
      },
      pages: undefined,
      token: {
        signInResponseTokenPointer: '/data/token',
        maxAgeInSeconds: 60 * 60 * 24
      },
      sessionDataType: {
        code: 'number',
        success: 'boolean',
        message: 'string',
        data: {
          id: 'string',
          email: 'string',
          token: 'string',
          name: 'string | null',
          role: 'string',
          createdAt: 'Date',
          updatedAt: 'Date',
          deletedAt: 'Date | null'
        }
      }
    }
  },
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap'
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_KEY: process.env.DATABAE_KEY,
      API_BASE_URL: process.env.API_BASE_URL
    }
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  }
})