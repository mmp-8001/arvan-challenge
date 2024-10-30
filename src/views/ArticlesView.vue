<script setup lang="ts">
import ArticlesTable from '@/components/ArticlesTable.vue'
import { watchEffect } from 'vue'
import { useFetch } from '@/composables/fetch'
import { getArticles, deleteArticle } from '@/api/articleService'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'

// props
const props = defineProps<{
  page: number
}>()

// get articles
const { data, execute, loading } = useFetch(() =>
  getArticles({ page: props.page, perPage: 10 }),
)

// delete article
const delArticle = (slug: string) => {
  loading.value = true
  deleteArticle(slug)
    .then(() => {
      useToast().success({
        component: CToast,
        props: {
          title: 'Well done! ',
          additional: 'Article deleted successfully',
        },
      })
    })
    .finally(execute)
}

watchEffect(async () => {
  execute()
})
</script>

<template>
  <div>
    <ArticlesTable
      :loading="loading"
      :data="data"
      :pagination="data?.meta"
      @remove-article="delArticle"
    />
  </div>
</template>

<style scoped></style>
