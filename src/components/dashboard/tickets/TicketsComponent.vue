<template>
  <div class="flex justify-around items-center w-full">
    <ColumnComponent v-for="event in storeTickets.tickets" :key="event" :event="event"></ColumnComponent>
  </div>
</template>

<script setup>
import ColumnComponent from "@/components/dashboard/tickets/ColumnComponent.vue";
import {ticketsStore} from "@/stores/ticketStore.ts";

const storeTickets = ticketsStore()

storeTickets.getAllTickets()

</script>

<style>
</style>