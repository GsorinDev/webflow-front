<template>
    <div class="flex h-screen overflow-y-auto">
        <div class="bg-[#201c2c] relative top-0 right-0" :class="{ 'w-4': !isClosed, 'w-56' : isClosed}">
            <div v-if="isClosed" class="text-white flex justify-center items-center">
                <ul class="w-56 flex flex-col">
                    <li class="h-12 flex items-center" :class="[link === 'tickets' ? 'bg-sky-600 bg-opacity-70' : '']">
                        <router-link class="ml-4" :to="{name: 'tickets'}" @click="link = 'tickets'">Tickets</router-link>
                    </li>
                    <li class="h-12 flex items-center" :class="[link === 'backlog' ? 'bg-sky-600 bg-opacity-70' : '']">
                      <router-link class="ml-4" :to="{name: 'backlog'}" @click="link = 'backlog'" >Backlog</router-link>
                    </li>
                    <li class="h-12 flex items-center" :class="[link === 'gantt' ? 'bg-sky-600 bg-opacity-70' : '']">
                        <router-link class="ml-4" :to="{name: 'gantt'}" @click="link = 'gantt'" >Gantt</router-link>
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

  <div>
    <modal-ticket-component v-if="modalOpen" @closeModalTicket="modalOpen = false"></modal-ticket-component>
    <modal-create-ticket-component v-if="modalCreateTicket" @closeModalCreateTicket="modalCreateTicket = false"></modal-create-ticket-component>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalTicketComponent from "@/components/modals/modalTicketComponent.vue";
import {modalCreateTicket, modalOpen} from "@/utils/utils.ts";
import ModalCreateTicketComponent from "@/components/modals/modalCreateTicketComponent.vue";

const router = useRouter()
const link = ref(router.currentRoute.value.name)

const isClosed = ref(true)
</script>


<style></style>