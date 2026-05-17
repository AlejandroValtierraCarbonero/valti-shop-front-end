<script setup lang="ts">
import { computed, nextTick, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { width } = useDisplay()
const route = useRoute()
const largeScreen = computed(() => width.value >= 280 * 2)

watch(
  () => route.path,
  async () => {
    if (largeScreen.value) {
      await nextTick()
      emit('update:modelValue', true)
    }
  },
)

const navItems = [
  { title: 'Inicio', icon: 'mdi-home', to: '/' },
  { title: 'Licencias / Legalidad', icon: 'mdi-file-document-outline', to: '/licencias' },
  { title: 'Alquiler de bienes y servicios', icon: 'mdi-handshake', to: '/alquiler' },
  { title: 'Inventario', icon: 'mdi-package-variant-closed', to: '/inventario' },
  { title: 'Pedidos', icon: 'mdi-cart-outline', to: '/pedidos' },
  { title: 'Ventas', icon: 'mdi-cash-register', to: '/ventas' },
  { title: 'Turnos de empleados', icon: 'mdi-calendar-clock', to: '/turnos' },
]
</script>

<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    temporary
    width="280"
    app
  >
    <template #prepend>
      <v-list-item
        prepend-icon="mdi-store"
        title="Valti Shop"
        subtitle="Panel de gestión"
      />
      <v-divider />
    </template>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        :exact="item.to === '/'"
        color="primary"
      />
    </v-list>
  </v-navigation-drawer>
</template>
