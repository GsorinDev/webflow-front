<script setup>
import {defineProps} from 'vue'
import _ from "lodash"
const props = defineProps(['ticket'])

const startDrag = (event, item) => {
  console.log(item)
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('ticket', JSON.stringify(item))
}

const barColor = () => {

  let color = ''

  switch (_.last(props.ticket.events).type) {
    case "being":
      color = 'border-orange-400'
      break;
    case "blocked":
      color = 'border-red-400'
      break;
    case "finish":
      color = 'border-green-400'
      break;
    case "production":
      color = 'border-sky-400'
      break;
  }

  return color
}

const iconClass = () => {

  let icon = ''

  switch (props.ticket.priority) {
    case 'low':
      icon = 'fa-angle-down'
      break;
    case 'medium':
      icon = 'fa-equals'
      break;
    case 'high':
      icon = 'fa-angle-up'
      break;
  }

  return ['fa-solid', icon]
}

const format = (date) => {

// Créez un objet Date en utilisant la date ISO
  const dateObj = new Date(date);

// Obtenez les composants de date (jour, mois, année)
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Les mois en JavaScript sont indexés à partir de 0
  const year = dateObj.getUTCFullYear();

// Formatez la date au format "DD-MM-YYYY"
  const formattedDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  return formattedDate
}
</script>

<template>
  <div class="w-full h-28 rounded my-2 text-white bg-[#28293d] hover:cursor-grab active:cursor-grabbing" draggable="true" @dragstart="startDrag($event, ticket)">
    <div class="flex h-full relative w-full">
      <div class="h-24 border ml-2 my-auto" :class="barColor()"></div>
      <div class="h-full flex flex-col ml-2 w-[90%]">
        <div class="flex justify-between px-2 rounded bg-[#201c2c] mt-2"><span>{{ticket.id}}</span><span>{{format(ticket.created_at)}}</span></div>
        <span class="truncate-custom h-auto mt-2">{{ticket.title}}</span>
        <span class="ml-auto mr-2 absolute bottom-0 right-0"><font-awesome-icon :icon="iconClass()"></font-awesome-icon></span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.truncate-custom {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Adjust this value to the desired number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

</style>