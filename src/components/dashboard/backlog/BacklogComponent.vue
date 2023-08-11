<script setup>
import { ticketsStore } from '@/stores/ticketStore.ts'
import TicketComponent from "@/components/dashboard/backlog/TicketComponent.vue";
import _ from "lodash";

const storeTickets = ticketsStore()
storeTickets.getAllTickets()
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-white text-3xl font-bold ml-5 my-8"> BACKLOG </h1>
    <div class="h-auto w-11/12 overflow-y-auto flex flex-col mx-auto">
      <div class="h-full mx-2">
        <ticket-component v-for="ticket in storeTickets.backlog" :key="ticket" :ticket="ticket" v-show="_.last(ticket.events).type === 'backlog'"></ticket-component>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>