<script setup>
import {defineProps, ref} from 'vue'
import TicketComponent from "@/components/dashboard/tickets/TicketComponent.vue";
import { ticketsStore } from "@/stores/ticketStore.ts"
const storeTickets = ticketsStore()
import {modalOpen} from "@/utils/utils.ts";

defineProps(['event'])
const over = ref(false)

const onDrop = (event, item) => {
  const itemData = JSON.parse(event.dataTransfer.getData('ticket'))
  storeTickets.updateEtatTicket(item, itemData)
  over.value = false
}

const dragEnter = () => {
  over.value = true
}
const dragLeave = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    over.value = false
    console.log(over.value)
  }
}

const modalTicket = (ticket) => {
  storeTickets.ticket = ticket
  modalOpen.value = true
}
</script>

<template>
  <div class="flex flex-col w-72 relative">
    <div class="flex justify-center items-center text-white font-bold bg-[#201c2c] h-16 w-full py-8 my-8">{{event.name.toUpperCase()}}</div>
    <div class="bg-[#201c2c] h-auto w-full overflow-y-auto sidebar-custom py-4" @dragenter="dragEnter" @dragleave="dragLeave($event)"  @drop="onDrop($event, event.name)" @dragenter.prevent @dragover.prevent>
      <div class="flex h-auto flex-col w-64 mx-auto relative border-4 border-dashed" :class="[over ? 'bg-sky-500 bg-opacity-40 rounded border-sky-400' : 'border-transparent']" >
        <ticket-component v-for="ticket in event.list" :key="ticket" :ticket="ticket" v-show="storeTickets.filteredDeveloppementTickets(ticket)" @click="modalTicket(ticket)"></ticket-component>
      </div>
    </div>
  </div>

</template>

<style>
::-webkit-scrollbar {
  width: 6px;
}

/* Style du "pouce" (la poignée de la barre de défilement) */
::-webkit-scrollbar-thumb {
  background-color: #4A5568;
}

/* Style de la piste (la partie de la barre de défilement non utilisée) */
::-webkit-scrollbar-track {
  background-color: #201c2c;
}
</style>