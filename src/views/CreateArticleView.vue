<script setup lang="ts">
import ArticlesTag from '@/components/ArticlesTag.vue'
import { shallowReactive } from 'vue'
import CTextarea from '@/components/plugins/CTextarea.vue'
import { useFetch } from '@/composables/fetch'
import { createArticle } from '@/api/articleService'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'
import router from '@/router'

// init
const createParameter = shallowReactive({
  title: '',
  description: '',
  body: '',
  tagList: [],
})

// on created successfully
const articleCreated = async () => {
  useToast().success({
    component: CToast,
    props: {
      title: 'Well done! ',
      additional: 'Article created successfully',
    },
  })
  return await router.push({ name: 'Home' })
}

// create article api
const { execute, loading } = useFetch(
  () => createArticle(createParameter),
  articleCreated,
)
</script>

<template>
  <c-form class="flex flex-row flex-wrap" @submit="execute">
    <div class="flex lg:w-3/4 w-full lg:pr-3 flex-col">
      <c-input
        v-model="createParameter.title"
        label="Title"
        name="title"
        placeholder="Title"
        :rules="[$rules.required]"
      />
      <c-input
        v-model="createParameter.description"
        label="Description"
        name="description"
        placeholder="Description"
        :rules="[$rules.required]"
      />
      <c-textarea
        v-model="createParameter.body"
        label="Body"
        name="body"
        class="mb-0"
        :rules="[$rules.required]"
        placeholder="Enter article body"
      />
    </div>
    <articles-tag
      v-model="createParameter.tagList"
      class="lg:w-1/4 w-full lg:pl-3"
    />
    <div class="w-full mt-5 items-start">
      <c-button :loading="loading" class="inline-block w-auto px-5"
        >Submit</c-button
      >
    </div>
  </c-form>
</template>

<style scoped></style>
