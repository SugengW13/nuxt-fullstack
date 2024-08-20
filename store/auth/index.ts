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
        console.log(e)
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
        console.log(e)
        toast.error('Unauthorized')
      } finally {
        this.isLoading = false
      }
    }
  }
})