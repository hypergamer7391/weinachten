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
    {
      path: '/school-info',
      name: 'school-info',
      component: () => import('../views/SchoolInfo.vue'),
    },
    {
      path: '/register-teacher',
      name: 'register-teacher',
      component: () => import('../views/RegisterTeacher.vue'),
    },
    {
      path: '/login-teacher',
      name: 'login-teacher',
      component: () => import('../views/LoginTeacher.vue'),
    },
    {
      path: '/teacher-dashboard',
      name: 'teacher-dashboard',
      component: () => import('../views/teacherDashboard.vue'),
    },
    {
      path: '/teacher-create-class',
      name: 'teacher-create-class',
      component: () => import('../views/createClass.vue'),
    },
     {
      path: '/teacher-manage-class',
      name: 'teacher-manage-class',
      component: () => import('../views/manageClass.vue'),
    },
    {
      path: '/login-student',
      name: 'login-student',
      component: () => import('../views/LoginStudent.vue'),
    },
    
  ],
})

export default router
