<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { initDrawers, initDropdowns, initModals } from 'flowbite'

// init
const userStore = useUserStore()

// on mounted init flowbite
onMounted(() => {
  initDrawers()
  initModals()
  initDropdowns()
})
</script>

<template>
  <!-- navbar header -->
  <nav class="fixed top-0 z-50 w-full bg-body-1">
    <div class="px-3 h-[64px] lg:px-5 lg:pl-3">
      <div class="flex items-center h-full justify-between">
        <div
          class="flex w-full text-white items-center justify-start rtl:justify-end"
        >
          <!--     mobile menu toggle button     -->
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex mr-3 items-center p-2 text-sm text-gray-500 rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <router-link :to="{ name: 'Home' }" class="font-medium mr-3 text-lg">
            Arvan Challenge
          </router-link>
          <span class="text-sm hidden md:inline grow"
            >Welcome {{ userStore.username }}</span
          >
          <div class="grow"></div>

          <!--     logout button     -->
          <c-button
            class="px-4 bg-transparent hover:bg-body-1 text-sm border hover:bg-white/10 border-secondary !text-secondary"
            data-modal-target="logout-modal"
            data-modal-toggle="logout-modal"
            type="button"
          >
            Logout
          </c-button>
        </div>
      </div>
    </div>
  </nav>

  <!-- sidebar -->
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-[64px] transition-transform -translate-x-full bg-primary sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full pb-4 overflow-y-auto bg-primary">
      <h1 class="p-3 text-xl text-white">Post</h1>
      <ul class="space-y-2">
        <li>
          <router-link
            active-class="bg-white/10"
            to="/articles"
            class="flex items-center pl-4 p-2 text-white hover:bg-white/10 group"
          >
            <span class="ms-3">All Articles</span>
          </router-link>
        </li>
        <li>
          <router-link
            active-class="bg-white/10"
            :to="{ name: 'ArticlesCreate' }"
            class="flex items-center pl-4 p-2 text-white hover:bg-white/10 group"
          >
            <span class="ms-3">New Article</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>

  <!-- main content -->
  <div class="p-4 mt-[64px] sm:ml-64">
    <div class="lg:p-4">
      <router-view />
    </div>
  </div>

  <!-- logout modal -->
  <c-modal name="logout-modal" @ok="userStore.logout">
    <template #header>Confirm Logout</template>
    <template #body>Are you sure you want to logout?</template>
    <template #accept>Yes</template>
    <template #cancel>Cancel</template>
  </c-modal>
</template>

<style scoped></style>
