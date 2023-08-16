<template>
    <div class="absolute z-10 right-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="toggleMenu"  @click="toggleMenu = false"></div>
    <div class="absolute z-10 top-0 left-0 w-80 h-screen bg-[#28293d] shadow-lg z-10 transform transition-all duration-500" :class="toggleMenu ? 'translate-x-0' : '-translate-x-full'">
        <div class="py-6 px-5 text-white font-bold text-xl relative">
            <span>Menu</span>
            <font-awesome-icon icon="fa-solid fa-close" class="absolute right-2 top-2 cursor-pointer" @click="toggleMenu = false"></font-awesome-icon>
        </div>
        
        <ul>
            <li @click="toggleMenu = false" class="text-white m-5 cursor-pointer">
                <router-link :to="{name: 'home'}">Home</router-link>
            </li>
            <li @click="toggleMenu = false" class="text-white m-5 cursor-pointer">
                <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
            </li>
        </ul>
    </div>

    <div class="bg-[#1c1c28] h-16 grid grid-cols-10 gap-2 text-white">
        <div class="flex justify-center items-center">
            <font-awesome-icon icon="fa-solid fa-bars" class="cursor-pointer" @click="toggleMenu = true"></font-awesome-icon>
        </div>
        <div class="col-start-2 col-end-3 flex items-center">
            <img class="w-12" src="../../assets/logo.png" alt="">
            <span class="font-bold ml-2">NANO</span>
        </div>
        <div class="col-start-4 col-end-8 flex justify-center items-center relative">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-7"></font-awesome-icon>
            <input type="text" class="bg-transparent border border-white rounded-xl w-full mx-4 pl-8 py-1">
        </div>
        <div class="col-start-10 flex justify-center items-center">
          <button v-if="storeAuth.token === ''" class="text-white m-5 cursor-pointer">
            <router-link :to="{name: 'auth'}">Se connecter</router-link>
          </button>
          <button v-else @click="removeToken()">Se déconnecter</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {authStore} from "@/stores/authStore.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const storeAuth = authStore()
const toggleMenu = ref(false)

const removeToken = () => {
  storeAuth.token = ""
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<style>
    
</style>