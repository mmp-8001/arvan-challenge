import type { App } from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$helpers = {
      formatDate: (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      extractExcerpt: (text: string) => {
        const split = text.split(' ').slice(0, 20)
        if (split.length >= 20) return split.join(' ') + ' ...'
        return split.join(' ')
      },
    }
  },
}
