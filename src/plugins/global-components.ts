import CForm from '@/components/plugins/CForm.vue'
import CInput from '@/components/plugins/CInput.vue'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.component('CForm', CForm)
    app.component('CInput', CInput)
  },
}
