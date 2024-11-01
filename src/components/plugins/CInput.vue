<script setup lang="ts">
import { computed, inject, type InputTypeHTMLAttribute, shallowRef } from 'vue'
import { formValidationKey } from '@/components/plugins/keys'

// init
const errors = shallowRef<string[]>([])

// define props
const props = withDefaults(
  defineProps<{
    rules?: ((input: string) => string | true)[]
    name: string
    placeholder?: string
    label: string
    loading?: boolean
    autocomplete?: string
    type?: InputTypeHTMLAttribute
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

// emits
defineEmits(['enterPressed'])

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
      class="block h-[42px] w-full rounded animate-pulse bg-slate-100"
    ></div>
    <input
      v-else
      :id="name"
      v-model="model"
      data-test-id="input"
      :type="type"
      :autocomplete="autocomplete"
      class="outline-none border border-gray-300 text-gray-900 text-sm rounded focus:border-blue-500 block w-full p-2.5"
      :class="[errorObject.errorInputClass]"
      :placeholder="placeholder"
      @keydown.enter="$emit('enterPressed', $event)"
      @blur="validate"
    />

    <div class="pt-1 text-sm text-error">
      <span v-show="errorObject.hasError" data-test-id="error">{{
        errorObject.errorText
      }}</span>
    </div>
  </div>
</template>

<style scoped></style>
