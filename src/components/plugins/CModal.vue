<script setup lang="ts">
// props
defineProps<{ name: string }>()

// emits
defineEmits(['ok'])
</script>

<template>
  <div
    :id="name"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-3 border-b rounded-t">
          <h3 class="text-xl font-bold text-gray-900">
            <slot name="header" />
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            :data-modal-hide="name"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-3 pb-10 font-light space-y-4">
          <slot name="body" />
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-3 justify-end border-t border-gray-200 rounded-b"
        >
          <button
            :data-modal-hide="name"
            type="button"
            class="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            <slot name="cancel" />
          </button>
          <button
            :data-modal-hide="name"
            type="button"
            class="text-white ms-3 bg-error hover:bg-error/70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-6 py-2 text-center"
            @click="$emit('ok')"
          >
            <slot name="accept" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
