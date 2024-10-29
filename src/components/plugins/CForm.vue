<script setup lang="ts">
import { provide } from 'vue'
import { formValidationKey } from '@/components/plugins/keys'

const emits = defineEmits(['submit'])
const validateFunctions: Array<() => boolean> = []

provide(formValidationKey, {
  validateFunctions,
})

const onSubmit = () => {
  if (validateFunctions.reduce((acc, fn) => fn() && acc, true)) emits('submit')
}
</script>

<template>
  <form ref="c-form" @submit.prevent="onSubmit"><slot /></form>
</template>

<style scoped></style>
