# Skill: Añadir nueva página

## Cuándo usar
Cuando necesites crear una nueva sección o vista en la aplicación Valti Shop.

## Archivos a modificar (orden)
1. **Crear** `src/pages/<categoria>/<Nombre>.vue`
2. **Modificar** `src/router/index.ts` — añadir ruta
3. **Modificar** `src/components/AppNavBar.vue` — añadir item al menú

## 1. Crear componente de página

- Ubicación: `src/pages/<categoria>/` (si no hay categoría, directamente en `pages/`)
- Usar `<script setup lang="ts">`
- Usar componentes Vuetify para la UI

Template base:

```vue
<script setup lang="ts">
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Título</v-card-title>
          <v-card-text>Contenido</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
```

## 2. Registrar ruta en `router/index.ts`

Añadir en el array `routes` usando lazy loading:

```typescript
{
  path: '/<ruta>',
  name: '<nombre>',
  component: () => import('@/pages/<categoria>/<Nombre>.vue'),
},
```

## 3. Añadir enlace en `AppNavBar.vue`

Añadir item al array `navItems`:

```typescript
{ label: 'Texto menú', icon: 'mdi-nombre-icono', path: '/<ruta>' },
```

Elegir icono en https://pictogrammers.com/library/mdi/

## Convenciones

| Concepto        | Regla                                                  |
| --------------- | ------------------------------------------------------ |
| Ficheros        | kebab-case (ej. `license-manager.vue`)                 |
| Componentes     | PascalCase (ej. `LicenseManager.vue`)                  |
| Rutas (path)    | kebab-case, sin slash final                            |
| Nombres (name)  | camelCase, ej. `licenseManager`                        |
| Labels menú     | Español, capitalizadas                                 |
| Iconos          | Material Design Icons (mdi-*)                          |
| Carga rutas     | Lazy loading con `() => import(...)`                   |

## Iconos MDI usados actualmente

| Sección        | Icono                      | Ruta          |
| -------------- | -------------------------- | ------------- |
| Inicio         | `mdi-home`                 | `/`           |
| Licencias      | `mdi-key-variant`          | `/licencias`  |
| Alquileres     | `mdi-tools`                | `/alquileres` |
| Inventario     | `mdi-package-variant-closed` | `/inventario` |
| Pedidos        | `mdi-clipboard-text`       | `/pedidos`    |
| Ventas         | `mdi-cash-register`        | `/ventas`     |
| Turnos         | `mdi-calendar-clock`       | `/turnos`     |
