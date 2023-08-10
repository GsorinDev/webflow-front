<script setup>
import {defineProps} from 'vue'
defineProps(['ticket'])

const startDrag = (event, item) => {
  console.log(item)
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('ticket', JSON.stringify(item))
}
</script>

<template>
  <div class="w-full h-16 rounded my-2 text-white bg-[#28293d] hover:cursor-grab active:cursor-grabbing" draggable="true" @dragstart="startDrag($event, ticket)">
    {{ticket.title}} {{ ticket._id }}
  </div>
</template>

<style scoped>
</style>