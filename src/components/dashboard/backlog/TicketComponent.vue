<script setup>
import {defineProps, ref} from 'vue'
import {ticketsStore} from "@/stores/ticketStore.ts";
import {modalOpen} from "@/utils/utils.ts";

const storeTickets = ticketsStore()
const props = defineProps(['ticket'])

const iconClass = () => {

  let icon = ''

  switch (props.ticket.priority) {
    case 'low':
      icon = 'fa-angles-down'
      break;
    case 'medium':
      icon = 'fa-equals'
      break;
    case 'high':
      icon = 'fa-angles-up'
      break;
  }

  return ['fa-solid', icon]
}

const updateEvent = () => {
  console.log(props.ticket)
  storeTickets.updateEtatTicketBacklog(etatTicket.value, props.ticket)
}

const modalTicket = (ticket) => {
  storeTickets.ticket = ticket
  modalOpen.value = true
}

const etatTicket = ref('backlog')

</script>

<template>
  <div class="bg-[#201c2c] h-10 mb-2 rounded text-white flex items-center grid grid-cols-8">
    <div class="col-start-1 col-end-2 mx-auto flex w-full justify-center">
      <div class="h-6 border mr-4 my-auto border-pink-600"></div>
      <span class="mr-8">{{ticket.id}}</span>
    </div>
    <span class="col-start-2 col-end-5 ">{{ticket.title}}</span>
    <span class="col-start-5 col-end-6 flex  items-center justify-end">
      <font-awesome-icon class="mr-4 bg-sky-500 rounded p-1 cursor-pointer" icon="fa-solid fa-eye" @click="modalTicket(ticket)"></font-awesome-icon>
      <font-awesome-icon :icon="iconClass()"></font-awesome-icon></span>
    <div class="col-start-6 col-end-8 mx-4">
      <select class="border border-transparent text-sm text-white px-1 w-full rounded-lg bg-[#28293d]" @change="updateEvent()" v-model="etatTicket">
        <option v-for="option in storeTickets.listEtatTicket" :key="option" :value="option" :selected="option == 'backlog'">{{option}}</option>
      </select>
    </div>
    <span class="col-start-8 flex justify-center">{{ticket.creator.email.split('@')[0]}}</span>
  </div>
</template>

<style scoped>

</style>