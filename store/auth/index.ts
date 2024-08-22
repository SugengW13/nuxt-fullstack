import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: {
      form: false,
      detail: false
    }
  }),
  actions: {
    async login(form: any) {
      this.isLoading.form = true

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
        throw e
      } finally {
        this.isLoading.form = false
      }
    },

    async register(form: any) {
      this.isLoading.form = true

      try {
        const { signUp } = useAuth()

        await signUp(
          { ...form },
          { callbackUrl: '/dashboard', redirect: true }
        )

        toast.success('Success')
        return true
      } catch (e: any) {
        toast.error('Email already registered')
        throw e
      } finally {
        this.isLoading.form = false
      }
    },

    async logout() {
      this.isLoading.form = true

      try {
        const { signOut } = useAuth()

        await signOut({ callbackUrl: '/dashboard', redirect: true })

        toast.success('Success')
        return true
      } catch (e: any) {
        toast.error('Unauthorized')
        throw e
      } finally {
        this.isLoading.form = false
      }
    },

    async getProfile() {
      this.isLoading.detail = true

      try {
        const { getSession } = useAuth()

        const res = await getSession()

        const newToken = res?.data.token

        useCookie('auth.token').value = newToken
        return true
      } catch (e: any) {
        toast.error(e.message)
        throw e
      } finally {
        this.isLoading.detail = false
      }
    },

    async updateProfile(form: FormEditProfile) {
      this.isLoading.form = true

      try {
        const res = api.put('/auth/profile', {
          body: { ...form }
        })

        toast.success('Success')
        return res
      } catch (e: any) {
        toast.error(e.message)
        throw e
      } finally {
        this.isLoading.form = false
      }
    }
  }
})