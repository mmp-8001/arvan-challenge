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
    class="block bg-primary relative overflow-hidden w-full rounded p-2 text-white"
  >
    <c-loader v-show="loading" />
    <span :class="{ '!invisible': loading }"><slot /></span>
  </button>
</template>

<style scoped></style>
