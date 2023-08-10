<script setup>
import {defineProps, ref} from 'vue'
import TicketComponent from "@/components/dashboard/tickets/TicketComponent.vue";
import { ticketsStore } from "@/stores/ticketStore.ts"
const storeTickets = ticketsStore()

defineProps(['event'])
const over = ref(false)

const onDrop = (event, item) => {
  
  const itemData = JSON.parse(event.dataTransfer.getData('ticket'))

  storeTickets.updateEtatTicket(item, itemData)
  console.log(itemData)
  over.value = false
}



const dragEnter = () => {
  over.value = true
  console.log(over.value)
}
const dragLeave = () => {
  over.value = false
  console.log(over.value)
}
</script>

<template>
  <div class="flex flex-col w-72 h-screen min-h-screen relative">
    <div class="flex justify-center items-center text-white font-bold bg-[#201c2c] h-[10%] w-full my-8">{{event.name.toUpperCase()}}</div>
    <div class="bg-[#201c2c] h-screen w-full overflow-y-auto sidebar-custom py-4">
      <div class="flex flex-col h-auto min-h-[100%] w-64 mx-auto relative border border-4 border-dashed border-transparent" :class="[over ? 'bg-sky-500 bg-opacity-40 rounded border-sky-400' : '']" @drop="onDrop($event, event.name)" @dragenter.prevent @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave">
        <ticket-component v-for="ticket in event.list" :key="ticket" :ticket="ticket"></ticket-component>
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