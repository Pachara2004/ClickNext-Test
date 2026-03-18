  /**
  * =====================================================================
  * @file            SidebarMenu.vue
  * @since           2026-03-18
  * @author          Pachara Paisrisakul
  * ---------------------------------------------------------------------
  * @description
  *  - แสดงเมนูด้านข้างสำหรับนำทางระหว่างหน้าต่างต่างๆ
  *  - รองรับการแสดงผลทั้งบน Desktop และ Mobile
  *  - มีการจัดการสถานะเปิด-ปิดเมนูบน Mobile
  *
  * =====================================================================
  */

<script setup>
defineProps(['isOpen'])
defineEmits(['close'])

// ข้อมูลเมนู
const menus = [
  {
    name: 'Deposit / Withdraw',
    path: '/home/deposit',
  },
  {
    name: 'Transaction',
    path: '/home/transaction',
  },
]
</script>

<template>
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-25"
    style="z-index: 2000"
  ></div>

  <nav
    :class="[
      'border-end bg-light d-flex flex-column',
      isOpen ? 'd-block position-fixed top-0 start-0 w-75 h-100 shadow-lg' : 'd-none d-md-block',
    ]"
    style="z-index: 2001; width: 220px; height: 100vh"
  >
    <div class="py-3 text-center border-bottom d-md-none bg-white">
      <span class="navbar-brand fw-bold text-dark">Clicknext</span>
    </div>

    <div class="p-3">
      <div class="list-group list-group-flush gap-3 mt-4">
        <router-link
          v-for="menu in menus"
          :key="menu.path"
          :to="menu.path"
          @click="$emit('close')"
          class="list-group-item list-group-item-action border-0 rounded-3 py-3 px-2 text-center text-dark fw-normal shadow-none"
          active-class="bg-dark bg-opacity-75 text-white fw-bold border-0 shadow"
          style="min-width: 180px;"
        >
          <span style="white-space: pre-line;">{{ menu.name }}</span>
        </router-link>
      </div>
    </div>

    <div class="mt-auto mb-5 text-center d-md-none">
      <button
        @click="$emit('close')"
        class="btn btn-link text-dark text-decoration-none fw-normal border-0"
      >
        Close
      </button>
    </div>
  </nav>
</template>
