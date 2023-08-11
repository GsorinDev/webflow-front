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
</script>

<template>
  <div class="w-full h-28 rounded my-2 text-white bg-[#28293d] hover:cursor-grab active:cursor-grabbing" draggable="true" @dragstart="startDrag($event, ticket)">
    <div class="flex h-full">
      <div class="h-24 border ml-2 my-auto" :class="barColor()"></div>
      <div class="h-24 flex flex-col ml-2 w-full">
        <span class="w-28 px-2 rounded bg-[#201c2c] mt-2">{{ticket.id}}</span>
        <span>{{ticket.title}}</span>
        <span class="ml-auto mr-2"><font-awesome-icon :icon="iconClass()"></font-awesome-icon></span>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>