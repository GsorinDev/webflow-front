<script setup>
import {defineProps} from "vue";

defineProps(['project'])
</script>

<template>
  <div class="w-auto h-auto px-2 mr-3 py-1 rounded my-2 text-white bg-[#201c2c]">
    {{project.title}}
  </div>
</template>

<style scoped>

</style>