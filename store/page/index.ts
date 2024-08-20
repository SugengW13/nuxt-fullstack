export const usePageStore = defineStore('page', {
  state: () => ({
    title: '' as string
  }),
  actions: {
    setTitle(title: string) {
      this.title = title
    }
  }
})