<script setup>
import {defineProps, defineEmits} from 'vue'
import {ticketsStore} from "@/stores/ticketStore.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const emit = defineEmits(['priorityModification'])
const props = defineProps(['ticket'])

const storeTickets = ticketsStore()

const ticket = {title: props.ticket.title, description: props.ticket.description, priority: props.ticket.priority}

const update = () => {
  if (ticket.title !== "") {
    storeTickets.updateTicket(ticket, props.ticket._id)
    emit('priorityModification')
  }
}
</script>

<template>
  <select name="choosePriority" class="border border-transparent text-sm text-white px-1 w-24 rounded-lg bg-[#28293d] outline-0" v-model="ticket.priority">
    <option v-for="priorityItem in storeTickets.priority" :key="priorityItem" :selected="priorityItem === ticket.priority" :value="priorityItem">{{priorityItem}}</option>
  </select>
  <div class="w-8 h-8 ml-4 rounded bg-sky-500 flex justify-center items-center" @click="update()"><font-awesome-icon icon="fa-solid fa-floppy-disk"></font-awesome-icon></div>
  <div class="w-8 h-8 ml-4 rounded bg-red-500 flex justify-center items-center" @click="emit('priorityModification')"><font-awesome-icon icon="fa-solid fa-close"></font-awesome-icon></div>
</template>

<style scoped>

</style>