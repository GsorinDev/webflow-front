<script setup>
import {ref, defineEmits} from "vue";
import { authStore } from '@/stores/authStore.ts'
import {useRouter} from "vue-router";

const storeAuth = authStore()
const emit = defineEmits(['error'])
const user = ref({email: "", password: ""})
const router = useRouter()
const login = async () => {
  await storeAuth.login(user.value).then(
      () => emit('error')
  )
  if(storeAuth.error === "") {
    await router.push('/')
    storeAuth.token = localStorage.getItem('token')
  }
}
</script>

<template>
<div class="bg-[#201c2c] w-80 h-[358px] mx-8 flex flex-col justify-center items-center text-white">
  <div class="h-2/3 flex flex-col justify-center items-center">
    <div class="flex flex-col mb-4 ">
      <label for="email">Email :</label>
      <input name="email" id="email" type="email" class="border border-transparent text-sm text-white w-60 px-2 rounded-lg bg-[#28293d] outline-0 py-1 mt-2" v-model="user.email">
    </div>
    <div class="flex flex-col">
      <label for="password">Password :</label>
      <input name="password" id="password" type="password" class="border border-transparent text-sm text-white px-2 w-60 rounded-lg bg-[#28293d] outline-0 py-1 mt-2" v-model="user.password">
    </div>
  </div>
  <button class="bg-sky-700 w-24 py-1 rounded mt-4" @click="login()">Login</button>
</div>
</template>

<style scoped>

</style>