---
name: vuetify-vitest
description: |
  Use when configuring Vitest for Vuetify 4, fixing test failures related
  to Vuetify (CSS imports, ResizeObserver, missing components), or debugging
  ssr.noExternal configuration in vite.config.ts.
---

# Vitest + Vuetify 4 Setup

## Configuración necesaria

### 1. `vite.config.ts` — ssr.noExternal

Vuetify 4 importa archivos `.css` directamente en su código JS. Vitest necesita que Vite procese Vuetify como si fuera código fuente:

```ts
export default defineConfig({
  // ...
  ssr: {
    noExternal: ['vuetify'],
  },
})
```

### 2. `vitest.config.ts` — CSS y setupFiles

```ts
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      css: true,
      setupFiles: ['./src/__tests__/setup.ts'],
      // ...
    },
  }),
)
```

- `css: true` — Procesa archivos CSS durante los tests
- `setupFiles` — Ejecuta el polyfill antes de los tests

### 3. `src/__tests__/setup.ts` — ResizeObserver polyfill

Vuetify 4 usa `ResizeObserver` internamente para su sistema de layout, pero jsdom no lo implementa. Inyectar un mock:

```ts
import { vi } from 'vitest'

class ResizeObserverMock {
  observe = vi.fn<() => void>()
  unobserve = vi.fn<() => void>()
  disconnect = vi.fn<() => void>()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
```

### 4. Test básico para App.vue

```ts
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const vuetify = createVuetify({ components, directives })
const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('App', () => {
  it('mounts renders properly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify, router],
        stubs: { SideNavigation: true },
      },
    })
    expect(wrapper.text()).toContain('Valti Shop')
  })
})
```

## Orden de debugging (prioridad)

Cuando un paquete de node_modules falla en Vitest, probar en este orden:

| Paso | Solución | Dónde |
|---|---|---|
| 1 | `ssr.noExternal: ['vuetify']` | `vite.config.ts` |
| 2 | `css: true` | `vitest.config.ts` |
| 3 | Polyfill de API del DOM que falte | `src/__tests__/setup.ts` |
| 4 | Stubs de componentes Vuetify en el test | Opciones de `mount()` |

`ssr.noExternal` es la solución más fiable y debería ser el **primer intento**, no el último.

## Errores comunes y su solución

| Error | Causa | Solución |
|---|---|---|
| `Unknown file extension ".css"` | CSS imports en node_modules no procesados | `ssr.noExternal: ['vuetify']` |
| `ResizeObserver is not defined` | jsdom no implementa ResizeObserver | Polyfill en `setupFiles` |
| `Failed to resolve component: v-app-bar` | Vuetify no registrado en el test | Pasar `vuetify` como plugin al mount |
| `Could not find Vuetify display injection` | `useDisplay()` usado sin contexto Vuetify | Envolver en `v-app` o pasar vuetify plugin |
