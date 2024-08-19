import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    async login(form: any) {
      const { signIn } = useAuth()

      signIn({ ...form }, { callbackUrl: '/dashboard', redirect: true })
        .then(() => { console.log('Success') })
        .catch((e) => { console.log(e) })
    },

    async register(form: any) {
      const { signUp } = useAuth()

      signUp({ ...form }, { callbackUrl: '/login', redirect: true }, { preventLoginFlow: true })
        .then(() => { console.log('Success') })
        .catch((e) => {
          console.table(e.message)
          useToast().add({ title: e })
        })
    },

    async logout() {
      const { signOut } = useAuth()

      signOut({ callbackUrl: '/login', redirect: true })
        .then(() => { console.log('Success') })
        .catch((e) => { console.log(e) })
    }
  }
})