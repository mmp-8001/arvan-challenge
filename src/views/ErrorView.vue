<script setup lang="ts"></script>

<template>
  <div
    class="flex w-full h-full items-center p-5 justify-center flex-col bg-gray-100 rounded"
  >
    <h1 class="lg:text-[15rem] text-[7rem] -my-5 font-bold">
      <span class="text-primary">4</span>
      <span class="text-body-1">0</span>
      <span class="text-primary">4</span>
    </h1>
    <p class="lg:text-3xl text-xl font-bold">PAGE NOT FOUND</p>
    <router-link
      :to="{ name: 'Home' }"
      class="bg-primary rounded py-2 px-4 hover:bg-primary/80 text-white mt-6"
      >GO HOME</router-link
    >
  </div>
</template>

<style scoped></style>
