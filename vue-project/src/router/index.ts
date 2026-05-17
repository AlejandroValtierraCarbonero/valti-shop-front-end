import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/pages/inicio/IndexPage.vue'),
    },
    {
      path: '/licencias',
      name: 'licencias',
      component: () => import('@/pages/licencias/IndexPage.vue'),
    },
    {
      path: '/alquiler',
      name: 'alquiler',
      component: () => import('@/pages/alquiler/IndexPage.vue'),
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('@/pages/inventario/IndexPage.vue'),
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('@/pages/pedidos/IndexPage.vue'),
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('@/pages/ventas/IndexPage.vue'),
    },
    {
      path: '/turnos',
      name: 'turnos',
      component: () => import('@/pages/turnos/IndexPage.vue'),
    },
  ],
})

export default router
