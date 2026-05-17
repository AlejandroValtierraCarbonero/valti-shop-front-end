---
name: vuetify-drawer
description: |
  Use when implementing or modifying Vuetify navigation drawers, side menus,
  responsive layouts with v-navigation-drawer, or when the drawer doesn't
  behave as expected on route change. Covers drawer lifecycle quirks,
  auto-close behavior on navigation, and the nextTick re-open trick.
---

# Vuetify Navigation Drawer Patterns

## Auto-close on route change (temporary mode)

En modo `temporary`, Vuetify cierra el `v-navigation-drawer` automáticamente al cambiar de ruta. No se puede prevenir desde fuera.

**Para mantenerlo abierto en pantallas grandes:**

Ubicar la lógica en el _componente del drawer_ (no en App.vue):

```ts
import { computed, nextTick, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const { width } = useDisplay()
const route = useRoute()
const largeScreen = computed(() => width.value >= 560)

watch(() => route.path, async () => {
  if (largeScreen.value) {
    await nextTick()
    emit('update:modelValue', true)
  }
})
```

### Cómo funciona

1. Vuetify cierra el drawer al navegar (emite `update:modelValue(false)`)
2. El watcher detecta el cambio de ruta
3. En pantallas grandes (≥ umbral), reabre el drawer en el siguiente `nextTick()`
4. En pantallas pequeñas, no hace nada → el drawer se cierra con normalidad

## Responsive: dos enfoques

### Enfoque A — Cambia según breakpoint (permanent vs temporary)

```ts
import { useDisplay } from 'vuetify'
const { lgAndUp } = useDisplay()
```

```html
<v-navigation-drawer
  v-model="drawer"
  :permanent="lgAndUp"
  :temporary="!lgAndUp"
>
```

- **Desktop** (≥1280px): drawer `permanent`, siempre visible
- **Móvil/tablet** (<1280px): drawer `temporary`, se abre con botón ☰

### Enfoque B — Siempre temporary con botón visible

```html
<v-navigation-drawer v-model="drawer" temporary>
```

- El botón ☰ siempre visible en la `v-app-bar`
- Drawer siempre como overlay
- Mismo comportamiento en todos los tamaños

## defineEmits y oxlint

Con oxlint usar SIEMPRE la sintaxis callable:

```ts
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
```

NO usar la sintaxis de mapped type (oxlint no la parsea correctamente):

```ts
// ❌ Esto falla en oxlint:
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
```

## Estructura recomendada

- El estado `drawer` se mantiene en `App.vue` con `ref(false)`
- Se pasa como `v-model` al `SideNavigation` component
- El comportamiento condicional (responsive, re-open) va dentro del componente del drawer
- `App.vue` se mantiene limpio: solo declara el estado y lo enlaza
