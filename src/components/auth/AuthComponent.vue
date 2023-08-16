<script setup>

import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import {ref} from "vue";
import { authStore } from '@/stores/authStore.ts'

const storeAuth = authStore()
const error = ref(false)
const success = ref(false)
const popupError = () => {
  if (storeAuth.error !== "") {
    error.value = true
    setTimeout(() => {
      storeAuth.error = ""
      error.value = false
    } , 2000)
  }
  if (storeAuth.success !== "") {
    success.value = true
    setTimeout(() => {
      storeAuth.error = ""
      success.value = false
    } , 2000)
  }
}
</script>

<template>
<div class="flex flex-col justify-center items-center h-full">
  <span v-if="error" class="mb-12 w-1/2 bg-red-500 py-2 flex justify-center rounded">{{storeAuth.error}}</span>
  <span v-if="success" class="mb-12 w-1/2 bg-green-500 py-2 flex justify-center rounded">{{storeAuth.success}}</span>
  <div class="flex items-center justify-center">
    <LoginComponent @error="popupError()"></LoginComponent>
    <RegisterComponent @error="popupError()"></RegisterComponent>
  </div>

</div>
</template>

<style scoped>

</style>