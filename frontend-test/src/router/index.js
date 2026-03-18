import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import DepositView from '@/components/DepositWithdrawView.vue'
import TransactionView from '@/components/TransactionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'deposit',
          name: 'deposit',
          component: DepositView,
        },
        {
          path: 'transaction',
          name: 'transaction',
          component: TransactionView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

// ตรวจสอบสิทธิ์ (Navigation Guard)
router.beforeEach((to, from) => {
  // ดึงข้อมูล Email จาก localStorage
  const isAuthenticated = localStorage.getItem('userEmail')

  // ถ้ายังไม่ Login แต่พยายามจะไปหน้าที่ต้องใช้ Auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' } // return แทนการใช้ next()
  }

  // ถ้า Login แล้ว แต่จะกลับไปหน้า Login อีก
  if (to.name === 'login' && isAuthenticated) {
    return { name: 'home' } // return แทนการใช้ next()
  }
})

export default router
