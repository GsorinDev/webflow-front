<script setup>
import {defineProps} from 'vue'
defineProps(['ticket'])
</script>

<template>
  <div class="bg-[#201c2c] h-10 mb-2 rounded text-white">{{ticket.title}}</div>
</template>

<style scoped>

</style>