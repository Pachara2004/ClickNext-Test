import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

// ตรวจสอบสิทธิ์ (Navigation Guard)
router.beforeEach((to, from, next) => {
  // ดึงข้อมูล Email จาก localStorage มาเช็กสถานะ Login
  const isAuthenticated = localStorage.getItem('userEmail')

  // ถ้ายังไม่ Login ให้ไปหน้า Login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  }
  // ถ้า Login แล้ว ห้ามไปหน้า Login
  else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router
