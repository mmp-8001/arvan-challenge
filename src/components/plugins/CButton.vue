<script setup lang="ts">
import CLoader from '@/components/plugins/CLoader.vue'

// define props
const { loading = false } = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button
    :disabled="loading"
    class="bg-primary relative focus:ring-4 focus:outline-none disabled:pointer-events-none disabled:opacity-40 transition-colors hover:bg-primary-darker focus:ring-primary-300 overflow-hidden rounded p-2 text-white"
  >
    <c-loader v-show="loading" />
    <span :class="{ '!invisible': loading }"><slot /></span>
  </button>
</template>

<style scoped></style>
