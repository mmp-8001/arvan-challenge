<script setup lang="ts">
import type { ArticleInfo, PaginationMeta } from '@/types'
import router from '@/router'
import { nextTick, onUpdated, ref } from 'vue'
import { initDropdowns, initModals } from 'flowbite'

// init
const selectArticle = ref('')

// props
const props = defineProps<{
  pagination: PaginationMeta | undefined
  data: { articles: ArticleInfo[] } | undefined
  loading: boolean
}>()

// next page
async function nextPage() {
  if (
    props.pagination &&
    props.pagination.current + 1 <= props.pagination?.total
  )
    return await router.push({
      name: 'Articles',
      params: { page: props.pagination.current + 1 },
    })
}

// emits
defineEmits(['remove-article'])

// prev page
async function prevPage() {
  if (props.pagination && props.pagination.current - 1 > 1)
    return await router.push({
      name: 'Articles',
      params: { page: props.pagination.total - 1 },
    })
  if (props.pagination && props.pagination.current - 1 === 1)
    return await router.push({
      path: '/articles',
    })
}

// mounted
onUpdated(() => {
  nextTick(() => {
    initDropdowns()
    initModals()
  })
})
</script>

<template>
  <section>
    <div class="bg-white relative overflow-hidden">
      <div class="flex pb-10 text-4xl">
        <h1>All Articles</h1>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-card">
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">Title</th>
              <th scope="col" class="px-4 py-3">Author</th>
              <th scope="col" class="px-4 py-3 text-center">Tags</th>
              <th scope="col" class="px-4 py-3">Descriptions</th>
              <th scope="col" class="px-4 py-3">Created</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr
                v-for="x in 10"
                :key="x"
                class="border-b h-[49px] animate-pulse"
              >
                <td class="bg-gray-200" colspan="10"></td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(row, number) in data?.articles"
                :key="row.slug"
                class="border-b"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ number + 1 }}
                </th>
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ row.title }}
                </th>
                <td class="px-4 py-3">@{{ row.author.username }}</td>
                <td class="px-4 text-center py-3">
                  <div class="flex w-full justify-center flex-wrap">
                    <div v-for="tag in row.tagList" :key="tag" class="p-0.5">
                      <div
                        class="bg-slate-200 text-slate-800 rounded-full whitespace-nowrap px-1.5 py-0.5"
                      >
                        {{ tag }}
                      </div>
                    </div>

                    <div
                      v-if="row.tagList.length <= 0"
                      class="bg-error/10 text-error rounded-full whitespace-nowrap px-2 py-0.5"
                    >
                      No Tags
                    </div>
                  </div>
                </td>
                <td
                  class="px-4 lg:whitespace-break-spaces whitespace-nowrap lg:max-w-xl max-w-[100px] overflow-hidden text-ellipsis py-3"
                >
                  {{ $helpers.extractExcerpt(row.body) }}
                </td>
                <td class="px-4 py-3">
                  {{ $helpers.formatDate(row.createdAt) }}
                </td>
                <td class="px-4 py-3">
                  <button
                    :data-dropdown-toggle="row.slug + '-dropdown'"
                    class="inline-flex bg-secondary text-white items-center p-1 text-sm font-medium text-center t hover:text-gray-800 rounded focus:outline-none"
                    type="button"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                      />
                    </svg>
                  </button>
                  <div
                    :id="row.slug + '-dropdown'"
                    class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                  >
                    <ul
                      :aria-labelledby="row.slug + '-button'"
                      class="py-1 text-sm text-gray-700"
                    >
                      <li>
                        <router-link
                          :to="{
                            name: 'ArticlesEdit',
                            params: { slug: row.slug },
                          }"
                          class="block py-2 px-4 hover:bg-gray-100"
                          >Edit</router-link
                        >
                      </li>
                      <li>
                        <button
                          data-modal-target="delete-article"
                          data-modal-toggle="delete-article"
                          type="button"
                          class="block w-full text-left py-2 px-4 hover:bg-gray-100"
                          @click="selectArticle = row.slug"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <nav
        v-if="pagination"
        class="flex flex-col md:flex-row justify-center items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <ul class="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              :disabled="pagination.current <= 1"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white disabled:pointer-events-none disabled:opacity-40 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              @click="prevPage"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          <li v-for="page in pagination.total" :key="page">
            <router-link
              v-if="page === 1"
              exact-active-class="bg-primary text-white"
              :to="{ path: '/articles' }"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-primary/60 hover:text-white"
              >{{ page }}</router-link
            >
            <router-link
              v-else
              exact-active-class="bg-primary text-white"
              :to="{ name: 'Articles', params: { page: page } }"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-primary/60 hover:text-white"
              >{{ page }}</router-link
            >
          </li>
          <li>
            <button
              :disabled="pagination.current >= pagination.total"
              class="flex items-center justify-center px-4 h-10 disabled:pointer-events-none disabled:opacity-40 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              @click="nextPage"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <c-modal name="delete-article" @ok="$emit('remove-article', selectArticle)">
      <template #header>Delete Article</template>
      <template #body>Are you sure to delete article?</template>
      <template #cancel>No</template>
      <template #accept>Yes</template>
    </c-modal>
  </section>
</template>

<style scoped></style>
