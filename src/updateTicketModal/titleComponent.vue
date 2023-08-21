<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ticketsStore} from "@/stores/ticketStore.ts";

const emit = defineEmits(['titleModification'])
const props = defineProps(['ticket'])

const title = ref("" + props.ticket.title)

const storeTickets = ticketsStore()

const update = () => {
  const ticket = {title: title.value.trim(), description: props.ticket.description, priority: props.ticket.priority}
  if (ticket.title !== "") {
    storeTickets.updateTicket(ticket, props.ticket._id)
    emit('titleModification')
  }
}
</script>

<template>
  <span class="text-3xl ml-8 font-bold py-1">{{ticket.id}} / </span>
  <input class="border border-transparent text-white px-2 py-1 w-[70%] rounded-lg bg-[#28293d] text-3xl ml-4 font-bold" type="text" v-model="title">
  <div class="w-10 h-10 ml-4 rounded bg-sky-500 flex justify-center items-center" @click="update()"><font-awesome-icon icon="fa-solid fa-floppy-disk"></font-awesome-icon></div>
  <div class="w-10 h-10 ml-4 rounded bg-red-500 flex justify-center items-center" @click="emit('titleModification')"><font-awesome-icon icon="fa-solid fa-close"></font-awesome-icon></div>
</template>

<style scoped>

</style>