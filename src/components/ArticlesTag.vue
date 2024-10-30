<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@/composables/fetch'
import { getAll } from '@/api/tagService'

// init
const newTag = ref('')
const allTags = ref<string[]>([])

// model
const checkedTag = defineModel<string[]>({ default: [] })

// new tag
const addNewTag = () => {
  // return is empty
  if (newTag.value.length <= 0) return

  // add new tag
  allTags.value.unshift(newTag.value)
  newTag.value = ''
  checkedTag.value.push(allTags.value[0])
}

// get tag
const { execute, loading } = useFetch(
  () => getAll(),
  response => (allTags.value = response.tags),
)

// call
execute()

// watch to tags always sorted alphabetically
watch(
  allTags,
  newValue => {
    newValue.sort((a, b) => a.localeCompare(b))
  },
  { deep: true },
)
</script>

<template>
  <div>
    <c-input
      v-model="newTag"
      placeholder="New Tag"
      label="Tags"
      :loading="loading"
      name="username"
      @enter-pressed.prevent="addNewTag"
    />

    <div
      :class="{ 'bg-slate-100 animate-pulse': loading }"
      class="flex rounded max-h-[323px] min-h-[323px] overflow-y-auto border p-3 flex-col space-y-2"
    >
      <template v-if="!loading">
        <c-checkbox
          v-for="tag in allTags"
          :key="tag"
          v-model="checkedTag"
          :value="tag"
          :name="tag"
        >
          <span>{{ tag }}</span>
        </c-checkbox>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
