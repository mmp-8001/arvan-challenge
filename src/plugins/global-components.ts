import type { App } from 'vue'
import CForm from '@/components/plugins/CForm.vue'
import CInput from '@/components/plugins/CInput.vue'
import CButton from '@/components/plugins/CButton.vue'

export default {
  install(app: App) {
    app.component('CForm', CForm)
    app.component('CInput', CInput)
    app.component('CButton', CButton)
  },
}
