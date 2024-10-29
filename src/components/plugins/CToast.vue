<script setup lang="ts">
defineProps<{
  textType?: 'network' | 'login'
  additional?: string
  title?: string
}>()
</script>

<template>
  <div v-if="textType === 'network'">
    <strong>Network Error! </strong>
    <span>Please check your internet connection</span>
  </div>
  <div v-else-if="textType === 'login'">
    <strong>Login Successful! </strong>
    <span>Welcome {{ additional }}</span>
  </div>
  <div v-else>
    <strong>{{ title }} </strong>
    <span>{{ additional }}</span>
  </div>
</template>

<style scoped></style>
