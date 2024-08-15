import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    async login(form: any) {
      const { signIn } = useAuth()

      signIn({ ...form })
        .then(() => { console.log('Success') })
        .catch((e) => { console.log(e) })
    },

    async register(form: any) {
      const { signUp } = useAuth()

      signUp({ ...form })
        .then(() => { console.log('Success') })
        .catch(() => { console.log('Error') })
    }
  }
})