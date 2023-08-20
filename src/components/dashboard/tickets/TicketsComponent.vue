<template>
  <div class="flex flex-col w-full">
    <h1 class="text-white text-3xl font-bold ml-5 my-8"> DEVELOPPEMENT </h1>
    <div class="w-11/12 overflow-y-auto flex flex-col mx-auto text-white">
      <div class="col-start-4 col-end-8 flex justify-center items-center relative mb-1">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-7"></font-awesome-icon>
        <input type="text" class="bg-transparent border border-white rounded-xl w-full mx-2 pl-14 py-1 outline-0" v-model="storeTickets.filter.q">
      </div>
      <div class="mx-2 flex mb-6 items-center">
        <project-component v-for="project in storeProjects.projects" :key="project" :project="project"></project-component>
        <button @click="storeTickets.filter.project_id = ''" class="bg-[#201c2c] rounded w-8 h-8 hover:bg-red-600 active:bg-red-700"><font-awesome-icon icon="fa-solid fa-close"></font-awesome-icon></button>
      </div>
      <div class="flex justify-between overflow-y-hidden">
        <ColumnComponent v-for="event in storeTickets.tickets" :key="event" :event="event"></ColumnComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import ColumnComponent from "@/components/dashboard/tickets/ColumnComponent.vue";
import {ticketsStore} from "@/stores/ticketStore.ts";
import ProjectComponent from "@/components/dashboard/project/projectComponent.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {projectsStore} from "@/stores/projectStore.ts";
import _ from "lodash";

const storeTickets = ticketsStore()
const storeProjects = projectsStore()

if (_.isEmpty(storeProjects.projects)) {
  storeProjects.getAllProjects()
}

if (_.isEmpty(storeTickets.backlog)) {
  storeTickets.getAllTickets()
}

storeTickets.removeFilter()

</script>

<style>
</style>