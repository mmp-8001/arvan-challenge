// this files created manually for showcase
// for better result use vite plugins

export {}

declare module 'vue' {
  export interface GlobalComponents {
    CForm: (typeof import('./src/components/plugins/CForm.vue'))['default']
    CInput: (typeof import('./src/components/plugins/CInput.vue'))['default']
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $rules: {
      required: (v: never) => true | string
    }
  }
}
