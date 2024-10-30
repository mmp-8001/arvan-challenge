<script setup lang="ts">
// imports
import { useFetch } from '@/composables/fetch'
import { register } from '@/api/authService'
import { shallowReactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'
import router from '@/router'
import type { UserInfo } from '@/types'

// init
const registerParameter = shallowReactive({
  email: '',
  username: '',
  password: '',
})

// on register success
const successRegister = async (response: { user: UserInfo }) => {
  useUserStore().setUser(response.user)
  useToast().success({
    component: CToast,
    props: { textType: 'login', additional: response.user.username },
  })
  await router.push('/')
}

const { execute, loading } = useFetch(
  () => register(registerParameter),
  successRegister,
)
</script>

<template>
  <c-form class="card" @submit="execute">
    <h1 class="text-4xl text-head-1 py-2">Register</h1>
    <c-input
      v-model="registerParameter.username"
      label="User"
      name="username"
      :rules="[$rules.required]"
    />
    <c-input
      v-model="registerParameter.email"
      label="Email"
      name="email"
      :rules="[$rules.required]"
    />
    <c-input
      v-model="registerParameter.password"
      label="Password"
      type="password"
      autocomplete="current-password"
      name="password"
      :rules="[$rules.required]"
    />
    <c-button class="w-full" :loading="loading"> Register </c-button>
    <p class="self-start text-sm mt-5">
      Already Registered?
      <router-link to="login" class="font-bold p-2 pl-1 hover:underline"
        >Login
      </router-link>
    </p>
  </c-form>
</template>
