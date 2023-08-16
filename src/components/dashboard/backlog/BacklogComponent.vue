<script setup>
import { ticketsStore } from '@/stores/ticketStore.ts'
import { projectsStore } from '@/stores/projectStore.ts'
import TicketComponent from "@/components/dashboard/backlog/TicketComponent.vue";
import _ from "lodash";
import ProjectComponent from "@/components/dashboard/project/projectComponent.vue";

const storeProjects = projectsStore()
storeProjects.getAllProjects()

const storeTickets = ticketsStore()
storeTickets.getAllTickets()
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-white text-3xl font-bold ml-5 my-8"> BACKLOG </h1>
    <div class="h-auto w-11/12 overflow-y-auto flex flex-col mx-auto text-white">
      <div class="col-start-4 col-end-8 flex justify-center items-center relative mb-1">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-7"></font-awesome-icon>
        <input type="text" class="bg-transparent border border-white rounded-xl w-full mx-2 pl-14 py-1 outline-0" v-model="storeTickets.filter.q">
      </div>
      <div class="mx-2 flex mb-6">
        <project-component v-for="project in storeProjects.projects" :key="project" :project="project"></project-component>
      </div>
      <button class="w-36 bg-sky-600 py-1 rounded ml-auto mr-2 mb-4 text-white">Créer un ticket</button>
      <div class="h-full mx-2">
        <ticket-component v-for="ticket in storeTickets.filteredBacklogTickets()" :key="ticket" :ticket="ticket" v-show="_.last(ticket.events).type === 'backlog'"></ticket-component>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>