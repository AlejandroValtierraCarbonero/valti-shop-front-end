import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/licencias',
      name: 'licenses',
      component: () => import('@/pages/licenses/LicensePage.vue'),
    },
    {
      path: '/alquileres',
      name: 'rentals',
      component: () => import('@/pages/rentals/RentalPage.vue'),
    },
    {
      path: '/inventario',
      name: 'inventory',
      component: () => import('@/pages/inventory/InventoryPage.vue'),
    },
    {
      path: '/pedidos',
      name: 'orders',
      component: () => import('@/pages/orders/OrderPage.vue'),
    },
    {
      path: '/ventas',
      name: 'sales',
      component: () => import('@/pages/sales/SalesPage.vue'),
    },
    {
      path: '/turnos',
      name: 'shifts',
      component: () => import('@/pages/shifts/ShiftPage.vue'),
    },
  ],
})

export default router
