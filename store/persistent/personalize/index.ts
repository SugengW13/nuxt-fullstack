export const usePersonalizeStore = defineStore('personalize', {
  state: () => ({
    primaryColor: 'red'
  }),
  actions: {
    setPrimaryColor(color: string) {
      this.primaryColor = color
    }
  },
  persist: {
    storage: localStorage
  }
})