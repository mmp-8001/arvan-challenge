import type { App } from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$rules = {
      required: (v: never) => !!v || 'Required field',
    }
  },
}
