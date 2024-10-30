<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import { formValidationKey } from '@/components/plugins/keys'

// init
const errors = shallowRef<string[]>([])

// define props
const props = withDefaults(
  defineProps<{
    rules?: ((input: string) => string | true)[]
    name: string
    loading?: boolean
    placeholder?: string
    label: string
  }>(),
  {
    rules: () => [],
    placeholder: '',
    label: '',
    loading: false,
    autocomplete: '',
    type: 'text',
  },
)

// input v-model
const model = defineModel<string>({ default: '' })

// call if input is valid
const validate = () => {
  errors.value = props.rules.reduce((acc, rule) => {
    const result = rule(model.value)
    if (result !== true) acc.push(result)
    return acc
  }, [] as string[])

  // check if no errors exist
  return errors.value.length <= 0
}

// inject all validation from parent form and add this validation to it
const injectValidation = inject(formValidationKey)
injectValidation?.validateFunctions.push(validate)

// computed error and error class state
const errorObject = computed(() => ({
  hasError: errors.value.length > 0,
  errorInputClass:
    errors.value.length > 0
      ? 'border-error !text-error focus:border-error'
      : '',
  errorText: errors.value[0] || '',
}))
</script>

<template>
  <div class="mb-5 w-full">
    <label
      data-test-id="label"
      :for="name"
      class="block mb-2 text-sm font-medium text-body-1"
      :class="{ '!text-error': errorObject.hasError }"
      >{{ label }}</label
    >
    <div
      v-if="loading"
      class="bg-slate-100 w-full animate-pulse h-[201px]"
    ></div>
    <textarea
      v-else
      :id="name"
      v-model="model"
      data-test-id="input"
      class="outline-none border resize-none border-gray-300 text-gray-900 text-sm rounded focus:border-blue-500 block w-full p-2.5"
      :class="[errorObject.errorInputClass]"
      rows="9"
      :placeholder="placeholder"
      @blur="validate"
    />

    <div class="text-sm text-error">
      <span v-show="errorObject.hasError" class="pt-1" data-test-id="error">{{
        errorObject.errorText
      }}</span>
    </div>
  </div>
</template>

<style scoped></style>
