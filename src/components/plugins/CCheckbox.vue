<script setup lang="ts">
// props
defineProps<{
  name: string
  value: string
}>()

// model
const model = defineModel<string[]>({ default: [] })
</script>

<template>
  <label
    :for="name"
    class="max-w-xs flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500"
  >
    <input
      :id="name"
      v-model="model"
      :value="value"
      type="checkbox"
      class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    />
    <span class="text-md ms-3"><slot /></span>
  </label>
</template>

<style scoped></style>
