<script setup lang="ts">
import ArticlesTag from '@/components/ArticlesTag.vue'
import { ref } from 'vue'

import { useFetch } from '@/composables/fetch'
import { getArticle, updateArticle } from '@/api/articleService'
import { useRoute } from 'vue-router'
import type { ArticleSingle } from '@/types'

// init
const editParameter = ref<ArticleSingle>({
  title: '',
  description: '',
  body: '',
  tagList: [],
})

// get slug param
const slug = <string>useRoute().params.slug

// update article api
const { execute: executeUpdate, loading: loadingUpdate } = useFetch(() =>
  updateArticle(slug, editParameter.value),
)

// get article api
const { execute: executeFetch, loading: loadingFetch } = useFetch(
  () => getArticle(slug),
  response =>
    (editParameter.value = {
      title: response.article.title,
      description: response.article.description,
      body: response.article.body,
      tagList: response.article.tagList,
    }),
)

executeFetch()
</script>

<template>
  <c-form class="flex flex-row flex-wrap" @submit="executeUpdate">
    <div class="flex lg:w-3/4 w-full lg:pr-3 flex-col">
      <c-input
        v-model="editParameter.title"
        label="Title"
        name="title"
        :loading="loadingFetch"
        placeholder="Title"
        :rules="[$rules.required]"
      />
      <c-input
        v-model="editParameter.description"
        :loading="loadingFetch"
        label="Description"
        name="description"
        placeholder="Description"
        :rules="[$rules.required]"
      />
      <c-textarea
        v-model="editParameter.body"
        :loading="loadingFetch"
        label="Body"
        name="body"
        class="mb-0"
        :rules="[$rules.required]"
        placeholder="Enter article body"
      />
    </div>
    <articles-tag
      v-model="editParameter.tagList"
      class="lg:w-1/4 w-full lg:pl-3"
    />
    <div class="w-full mt-5 items-start">
      <c-button
        :loading="loadingUpdate"
        :disabled="loadingFetch"
        class="inline-block w-auto px-5"
        >Submit</c-button
      >
    </div>
  </c-form>
</template>

<style scoped></style>
