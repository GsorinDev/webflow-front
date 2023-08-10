<template>
  <h1>Favorite Foods</h1>
  <draggable v-model="meals" tag="div">
    <template #item="{ element: meal }">
      <div>{{ meal }}</div>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
const meals = ref([
  {
    name: "ticket 1"
  },
  {
    name: "ticket 2"
  },
]);
</script>

<style>
</style>