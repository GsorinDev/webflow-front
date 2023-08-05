<script setup>
import {defineProps} from 'vue'
import TicketComponent from "@/components/dashboard/tickets/TicketComponent.vue";
defineProps(['event'])
</script>

<template>
  <div class="flex flex-col w-72 h-screen relative">
    <div class="flex justify-center items-center text-white font-bold bg-[#201c2c] h-[10%] w-full my-8">{{event.name.toUpperCase()}}</div>
    <div class="bg-[#201c2c] h-[90%] w-full overflow-y-auto sidebar-custom">
      <div class="flex flex-col justify-around h-auto w-64 mx-auto my-2 relative">
        <ticket-component v-for="ticket in 28" :key="ticket"></ticket-component>
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