  /**
  * =====================================================================
  * @file            LoginView.vue
  * @since           2026-03-18
  * @author          Pachara Paisrisakul
  * ---------------------------------------------------------------------
  * @description
  *  - แสดงฟอร์มสำหรับผู้ใช้กรอก Email และ Password เพื่อเข้าสู่ระบบ
  *  - มีการตรวจสอบความถูกต้องของข้อมูลและแสดงข้อความ Error ที่เหมาะสม
  *  - เมื่อเข้าสู่ระบบสำเร็จจะเก็บข้อมูล Email ไว้ใน localStorage และนำทางไปหน้า Home
  *
  * =====================================================================
  */

<script setup>
import LoginCard from '@/components/LoginCard.vue';

</script>

<template>
  <div class="d-flex vh-100 justify-content-center align-items-center ">
    <LoginCard />
  </div>
</template>
