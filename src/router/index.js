import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  {
    path: '/raetsel1',
    name: 'raetsel1',
    component: () => import('../views/raum1.vue')
  },
  {
    path: '/raetsel2',
    name: 'raetsel2',
    component: () => import('../views/raum2.vue')
  },
  {
    path: '/raetsel3',
    name: 'raetsel3',
    component: () => import('../views/raum3.vue')
  },
  {
    path: '/raetsel4',
    name: 'raetsel4',
    component: () => import('../views/raum4.vue')
  },
  {
    path: '/raetsel5',
    name: 'raetsel5',
    component: () => import('../views/raum5.vue')
  },
  {
    path: '/ende',
    name: 'ende',
    component: () => import('../views/ende.vue')
  }
],
})

// 🔹 Globaler Guard: automatische Weiterleitung basierend auf localStorage
router.beforeEach((to, from, next) => {
  const savedRoom = localStorage.getItem('raum')

  // Wenn ein Raum gespeichert ist und wir gerade auf Start sind
  console.log('Navigiere zu:', to.path, 'Gespeicherter Raum:', savedRoom)
  if (savedRoom && to.path !== '/raetsel' + savedRoom) {
    return next('/raetsel' + savedRoom) // direkt dorthin
  }

  next()
})

export default router


