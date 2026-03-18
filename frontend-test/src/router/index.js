/**
 * =====================================================================
 * @file            index.js
 * @since           2026-03-18
 * @author          Pachara Paisrisakul
 * ---------------------------------------------------------------------
 * @description
 *  - ไฟล์นี้เป็นส่วนหนึ่งของระบบจัดการเส้นทาง (Routing) ของแอปพลิเคชันที่ใช้ Vue.js และ Vue Router
 *  - กำหนดเส้นทางหลักๆ เช่น หน้า Home, Login และหน้าฝากถอน รวมถึงการตรวจสอบสิทธิ์ก่อนเข้าถึงหน้า
 *  - มีการใช้ Navigation Guard เพื่อตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่ก่อนที่จะอนุญาตให้เข้าถึงหน้าที่ต้องการสิทธิ์
 *
 * =====================================================================
 */

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
  const isAuthenticated = localStorage.getItem('userEmail')

  // ถ้ายังไม่ Login แต่พยายามจะไปหน้าที่ต้องใช้ Auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  // ถ้า Login แล้ว แต่จะกลับไปหน้า Login อีก
  if (to.name === 'login' && isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
