<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const drawer = ref(false)

const navItems = [
  { label: 'Inicio', icon: 'mdi-home', path: '/' },
  { label: 'Licencias', icon: 'mdi-key-variant', path: '/licencias' },
  { label: 'Alquileres', icon: 'mdi-tools', path: '/alquileres' },
  { label: 'Inventario', icon: 'mdi-package-variant-closed', path: '/inventario' },
  { label: 'Pedidos', icon: 'mdi-clipboard-text', path: '/pedidos' },
  { label: 'Ventas', icon: 'mdi-cash-register', path: '/ventas' },
  { label: 'Turnos', icon: 'mdi-calendar-clock', path: '/turnos' },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <v-app-bar elevation="2">
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
    <v-toolbar-title class="font-weight-bold">Valti Shop</v-toolbar-title>
    <v-spacer />
    <template v-for="item in navItems" :key="item.label">
      <v-btn
        :to="item.path"
        variant="text"
        class="hidden-sm-and-down"
        :color="isActive(item.path) ? 'primary' : undefined"
      >
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.label }}
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.label"
        :to="item.path"
        :color="isActive(item.path) ? 'primary' : undefined"
        @click="drawer = false"
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
