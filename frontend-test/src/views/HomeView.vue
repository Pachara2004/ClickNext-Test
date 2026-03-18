  /**
  * =====================================================================
  * @file            HomeView.vue
  * @since           2026-03-18
  * @author          Pachara Paisrisakul
  * ---------------------------------------------------------------------
  * @description
  *  - เป็นหน้าหลักหลังจากผู้ใช้เข้าสู่ระบบสำเร็จ
  *  - มีการจัดการเมนูด้านข้างสำหรับนำทางไปยังหน้าต่างต่างๆ เช่น Deposit/Withdraw และ Transaction
  *  - มีปุ่ม Logout สำหรับออกจากระบบ
  *
  * =====================================================================
  */

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'

const router = useRouter()
const isMenuOpen = ref(false) // สถานะเปิด-ปิดเมนูบน Mobile

const handleLogout = () => {
  localStorage.removeItem('userEmail')
  router.push('/login')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  // ถ้าเข้ามาที่หน้า /home เฉยๆ ให้เด้งไปหน้า deposit
  if (router.currentRoute.value.path === '/home') {
    router.push('/home/deposit')
  }
  // ดักจับการเปลี่ยนขนาดหน้าจอแบบบรรทัดเดียวจบ
  window.onresize = () => {
    if (window.innerWidth >= 768) isMenuOpen.value = false
  }
})
</script>

<template>
  <div class="min-vh-100 bg-light">
    <nav class="navbar bg-white border border-dark p-2">
      <div class="container-fluid px-2 px-md-4">
        <div class="d-flex align-items-center">
          <button @click="toggleMenu" class="btn d-md-none border-0 me-2">
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="navbar-brand fw-bold text-dark">Clicknext</span>
        </div>
        <button @click="handleLogout" class="btn btn-dark btn-sm px-3 py-1 fw-bold">Logout</button>
      </div>
    </nav>

    <div class="container-fluid p-0">
      <div class="d-flex">
        <SidebarMenu :isOpen="isMenuOpen" @close="isMenuOpen = false" />
        <main class="flex-grow-1">
          <div class="bg-white" style="min-height: calc(100vh - 60px)">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
