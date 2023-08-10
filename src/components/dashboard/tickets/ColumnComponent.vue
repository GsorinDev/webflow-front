<script setup>
import {defineProps} from 'vue'
import TicketComponent from "@/components/dashboard/tickets/TicketComponent.vue";
import { ticketsStore } from "@/stores/ticketStore.ts"
const storeTickets = ticketsStore()

defineProps(['event'])

const onDrop = (event, item) => {
  
  const itemData = JSON.parse(event.dataTransfer.getData('ticket'))

  storeTickets.updateEtatTicket(item, itemData)
  console.log(itemData)
}
</script>

<template>
  <div class="flex flex-col w-72 h-screen min-h-screen relative">
    <div class="flex justify-center items-center text-white font-bold bg-[#201c2c] h-[10%] w-full my-8">{{event.name.toUpperCase()}}</div>
    <div class="bg-[#201c2c] h-[90%] w-full overflow-y-auto sidebar-custom">
      <div class="flex flex-col justify-around h-auto min-h-[50px] bg-red-100 w-64 mx-auto my-2 relative" @drop="onDrop($event, event.name)" @dragenter.prevent @dragover.prevent>
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