<script setup lang="ts"></script>

<template>
  <c-form class="card">
    <h1 class="text-4xl text-head-1 py-2">Register</h1>
    <c-input label="User" name="username" :rules="[$rules.required]" />
    <c-input label="Email" name="email" :rules="[$rules.required]" />
    <c-input label="Password" name="password" :rules="[$rules.required]" />
    <c-button> Register </c-button>
    <p class="self-start text-sm mt-5">
      Already Registered?
      <router-link to="login" class="font-bold p-2 pl-1 hover:underline"
        >Login
      </router-link>
    </p>
  </c-form>
</template>
