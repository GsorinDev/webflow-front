<template>
  <div class="flex justify-around items-center w-full">
    <ColumnComponent v-for="event in typeEvent" :key="event" :event="event"></ColumnComponent>
  </div>
</template>

<script setup>
import ColumnComponent from "@/components/dashboard/tickets/ColumnComponent.vue";
import {ref} from "vue";

const typeEvent = ref([{name: 'being'},{name: 'blocked'},{name: 'finish'},{name: 'production'}])
</script>

<style>
</style>