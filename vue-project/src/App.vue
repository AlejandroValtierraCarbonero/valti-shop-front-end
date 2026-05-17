<script setup lang="ts">
import { ref } from 'vue'
import SideNavigation from '@/components/SideNavigation.vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" class="border-b" app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Valti Shop</v-app-bar-title>
    </v-app-bar>

    <SideNavigation v-model="drawer" />

    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
