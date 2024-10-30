<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

// init
const { username } = useUserStore()
const menuOpen = ref(false)
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header
      class="flex fixed top-0 z-[48] !h-[50px] min-h-[50px] w-full flex-wrap text-sm md:flex-nowrap md:justify-start items-center bg-body-1 space-x-3 text-white px-3"
    >
      <!-- Mobile menu button -->
      <button
        type="button"
        class="relative inline-flex lg:hidden items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        aria-controls="mobile-menu"
        aria-expanded="false"
        @click="menuOpen = !menuOpen"
      >
        <span class="absolute -inset-0.5"></span>
        <span class="sr-only">Open main menu</span>
        <!-- Menu open: "hidden", Menu closed: "block" -->
        <svg
          class="block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <!-- Menu open: "block", Menu closed: "hidden" -->
        <svg
          class="hidden h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 class="text-lg font-semibold">Arvan Challenge</h1>
      <span class="hidden grow text-left sm:block">Welcome {{ username }}</span>
      <button
        class="text-white border border-white px-3 py-1 rounded hover:bg-gray-700"
      >
        Logout
      </button>
    </header>

    <!-- Sidebar -->
    <aside
      :class="{ 'open-menu': menuOpen }"
      class="w-[16rem] bg-primary fixed top-[50px] transition-transform z-10 lg:translate-x-0 open-menu:translate-x-0 translate-x-[-100%] lg:block text-white left-0 bottom-0"
    >
      <h2 class="text-lg font-semibold p-4">Post</h2>
      <nav class="space-y-2">
        <router-link
          :to="{ name: 'Articles' }"
          active-class="bg-white/10"
          class="block pl-6 py-2 hover:bg-white/10"
          >All Articles
        </router-link>
        <router-link
          :to="{ name: 'ArticlesCreate' }"
          active-class="bg-white/10"
          class="block pl-6 py-2 hover:bg-white/10"
          >New Article</router-link
        >
      </nav>
    </aside>

    <!-- Main Area -->
    <main class="w-full h-full pt-[50px] lg:ps-64">
      <div class="p-4 h-full overflow-y-auto sm:p-6 space-y-4 sm:space-y-6">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
