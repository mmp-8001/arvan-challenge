<script setup lang="ts">
// imports
import { useFetch } from '@/composables/fetch'
import { login } from '@/api/authService'
import { shallowReactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserInfo } from '@/types'
import router from '@/router'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'

// init parameters
const loginParameter = shallowReactive({
  email: '',
  password: '',
})

// on login success
const successLogin = async (response: { user: UserInfo }) => {
  useUserStore().setUser(response.user)
  useToast().success({
    component: CToast,
    props: { textType: 'login', additional: response.user.username },
  })
  await router.push('/')
}

// api call
const { execute, loading } = useFetch(() => login(loginParameter), successLogin)
</script>

<template>
  <c-form class="card" @submit="execute">
    <h1 class="text-4xl text-head-1 py-2">Login</h1>
    <c-input
      v-model="loginParameter.email"
      label="Email"
      name="email"
      :rules="[$rules.required]"
    />
    <c-input
      v-model="loginParameter.password"
      label="Password"
      type="password"
      name="password"
      autocomplete="current-password"
      :rules="[$rules.required]"
    />
    <c-button class="w-full" :loading="loading"> Login </c-button>
    <p class="self-start text-sm mt-5">
      Don't have account?
      <router-link to="register" class="font-bold p-2 pl-1 hover:underline"
        >Register Now
      </router-link>
    </p>
  </c-form>
</template>
