import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    async login(form: any) {
      this.isLoading = true

      try {
        const { signIn } = useAuth()

        await signIn(
          { ...form },
          { callbackUrl: '/dashboard', redirect: true }
        )

        toast.success('Success')
        return true
      } catch (e: any) {
        toast.error('Wrong email or password')
      } finally {
        this.isLoading = false
      }
    },

    async register(form: any) {
      this.isLoading = true

      try {
        const { signUp } = useAuth()

        await signUp(
          { ...form },
          { callbackUrl: '/login', redirect: true },
          { preventLoginFlow: true }
        )

        toast.success('Success')
        return true
      } catch (e: any) {
        toast.error('Email already registered')
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true

      try {
        const { signOut } = useAuth()

        await signOut({ callbackUrl: '/login', redirect: true })

        toast.success('Success')
        return true
      } catch (e: any) {
        toast.error('Unauthorized')
      } finally {
        this.isLoading = false
      }
    },

    async getProfile() {
      this.isLoading = true

      try {
        const { getSession } = useAuth()

        const res = await getSession()

        const newToken = res?.data.token

        useCookie('auth.token').value = newToken
        return true
      } catch (e: any) {
        toast.error(e.message)
      } finally {
        this.isLoading = false
      }
    },

    async updateProfile(form: FormEditProfile) {
      this.isLoading = true

      try {
        const res = api.put('/auth/profile', {
          body: { ...form }
        })

        toast.success('Success')
        return res
      } catch (e: any) {
        toast.error(e.message)
      } finally {
        this.isLoading = false
      }
    }
  }
})