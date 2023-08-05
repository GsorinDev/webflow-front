<template>
  <div class="h-screen">
    <NavbarComponent/>
    <router-view></router-view>
  </div>

</template>

<script setup>
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
</script>

<style>
</style>
