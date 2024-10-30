<script setup lang="ts">
import ArticlesTable from '@/components/ArticlesTable.vue'
import { watchEffect } from 'vue'
import { useFetch } from '@/composables/fetch'
import { getArticles } from '@/api/articleService'

// props
const props = defineProps<{
  page: number
}>()

// get articles
const { data, execute, loading } = useFetch(() =>
  getArticles({ page: props.page, perPage: 10 }),
)

watchEffect(async () => {
  execute()
})
</script>

<template>
  <div>
    <ArticlesTable :loading="loading" :data="data" :pagination="data?.meta" />
  </div>
</template>

<style scoped></style>
