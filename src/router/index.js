import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/python/:id',
      name: 'python',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Hauptmenu.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Hauptmenu.vue'),
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/Impressum.vue'),
    },
  ],
})

export default router
