export const useGradeStore = defineStore('grade', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    async getGrades() {
      try {
        const res = await api.get('/api/grade')
        console.log(res)
      } catch(e: any) {
        console.log(e.message)
      }
    }
  }
})