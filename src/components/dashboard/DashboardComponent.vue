<template>
    <div class="flex h-full">
        <div class="bg-[#201c2c] relative top-0 right-0 h-full" :class="{ 'w-4': !isClosed, 'w-56' : isClosed}">
            <div v-if="isClosed" class="text-white flex justify-center items-center">
                <ul class="w-56">
                    <li class="my-4">
                        <router-link :to="{name: 'tickets'}" @click="link = 'tickets'" :class="[link === 'tickets' ? 'bg-blue-600 bg-opacity-50' : '']">Tickets</router-link>
                    </li>
                    <li class="my-4">
                        <router-link :to="{name: 'gant'}" @click="link = 'gant'">Gant</router-link>
                    </li>
                </ul>
            </div>
            <div class="absolute top-0 right-0 h-full w-0.5 bg-gray-500"></div>
            <div class="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 w-8 h-8 flex justify-center items-center rounded-3xl">
                <div class="absolute z-1 w-7 h-7 bg-[#201c2c] rounded-3xl"></div>
                <font-awesome-icon v-if="isClosed" class="absolute z-2 text-white cursor-pointer w-3 h-3" icon="fa-solid fa-greater-than" @click="isClosed = !isClosed"></font-awesome-icon>
                <font-awesome-icon v-else class="absolute z-2 text-white cursor-pointer w-3 h-3" icon="fa-solid fa-less-than" @click="isClosed = !isClosed"></font-awesome-icon>
            </div>
        </div>
        <router-view name="board"></router-view>
    </div>
</template>

<script setup>
import { ref } from "vue";

const link = ref('tickets')

const isClosed = ref(true)
</script>


<style></style>