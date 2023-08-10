<script setup>
import {defineProps} from 'vue'
defineProps(['event', 'ticket'])
import _ from 'lodash'
</script>

<template>
  <div class="w-full h-16 rounded my-2 text-white bg-[#28293d]" v-if="_.last(ticket.events).type === event.name" draggable="true">
    {{ticket.title}}
  </div>
</template>

<style scoped>

</style>