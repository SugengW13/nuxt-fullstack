export const toast = {
  success(title: string) {
    useToast().add({
      title,
      color: 'green',
      icon: 'material-symbols:check-circle-outline'
    })
  },

  info(title: string) {
    useToast().add({
      title,
      color: 'blue',
      icon: 'material-symbols:info-outline'
    })
  },

  warning(title: string) {
    useToast().add({
      title,
      color: 'yellow',
      icon: 'material-symbols:warning-outline'
    })
  },

  error(title: string) {
    useToast().add({
      title,
      color: 'red',
      icon: 'material-symbols:error-outline'
    })
  }
}