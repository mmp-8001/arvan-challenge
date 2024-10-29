import type { InjectionKey } from 'vue'

export const formValidationKey = Symbol() as InjectionKey<{
  validateFunctions: Array<() => boolean>
}>
