<script setup>
import {defineProps} from "vue";
import {ticketsStore} from "@/stores/ticketStore.ts";

const storeTickets = ticketsStore()
defineProps(['project'])
</script>

<template>
  <div class="w-auto h-auto px-2 mr-3 py-1 rounded my-2 text-white cursor-pointer" @click="storeTickets.filter.project_id = project._id" :class="storeTickets.filter.project_id === project._id ? 'bg-sky-600' : 'bg-[#201c2c]'">
    {{project.title}}
  </div>
</template>

<style scoped>

</style>