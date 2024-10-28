<script setup lang="ts"></script>

<template>
  <c-form class="card">
    <h1 class="text-4xl text-head-1 py-2">Login</h1>
    <c-input label="Email" name="email" :rules="[$rules.required]" />
    <c-input label="Password" name="password" :rules="[$rules.required]" />
    <c-button> Login </c-button>
    <p class="self-start text-sm mt-5">
      Don't have account?
      <router-link to="register" class="font-bold p-2 pl-1 hover:underline"
        >Register Now
      </router-link>
    </p>
  </c-form>
</template>
