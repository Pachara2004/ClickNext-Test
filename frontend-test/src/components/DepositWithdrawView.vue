  /**
  * =====================================================================
  * @file            DepositWithdrawView.vue
  * @since           2026-03-18
  * @author          Pachara Paisrisakul
  * ---------------------------------------------------------------------
  * @description
  *  - แสดงฟอร์มสำหรับผู้ใช้กรอกจำนวนเงินเพื่อทำรายการฝากหรือถอน
  *  - มีการตรวจสอบความถูกต้องของข้อมูล เช่น จำนวนเงินต้องเป็นตัว
  *    เลขระหว่าง 1 - 100,000 และไม่สามารถถอนเงินเกินยอดคงเหลือได้
  *  - เมื่อผู้ใช้กดปุ่มฝากหรือถอนจะแสดง Modal ยืนยันการทำรายการ และเมื่อยืนยันแล้วจะเรียกฟังก์ชันใน store เพื่อบันทึกประวัติการทำรายการและอัปเดตยอดคงเหลือ
  *
  * =====================================================================
  */

<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/depositWithdraw'

const store = useTransactionStore()
const amount = ref(null)
const transactionType = ref('')
const showConfirmModal = ref(false)
const errorMessage = ref('')

const validateAndConfirm = (type) => {
  errorMessage.value = ''

  // ตรวจสอบเงื่อนไขตัวเลข 0-100,000
  if (!amount.value || amount.value <= 0 || amount.value > 100000) {
    errorMessage.value = 'กรุณากรอกจำนวนเงินระหว่าง 1 - 100,000 บาท'
    return
  }
  if (type === 'ถอน' && amount.value > store.balance) {
    errorMessage.value = 'ยอดเงินในบัญชีไม่เพียงพอ'
    return
  }
  transactionType.value = type
  showConfirmModal.value = true
}

const handleConfirm = () => {
  const email = localStorage.getItem('userEmail')
  store.addTransaction(transactionType.value, amount.value, email)
  amount.value = null
  showConfirmModal.value = false
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center w-100" style="min-height: 75vh">
    <div class="text-center w-100">
      <h5 class="mb-4 fw-normal text-dark">
        จำนวนเงินคงเหลือ {{ store.balance.toLocaleString() }} บาท
      </h5>

      <div class="mx-auto px-3" style="max-width: 350px">
        <div class="text-start mb-2">
          <label class="form-label small fw-bold text-secondary">จำนวนเงิน *</label>
          <input
            v-model.number="amount"
            type="number"
            class="form-control form-control-lg border-secondary-subtle"
            placeholder="กรอกจำนวนเงิน"
          />
          <div v-if="errorMessage" class="text-danger small mt-1">{{ errorMessage }}</div>
        </div>

        <div class="d-flex gap-2 mt-4">
          <button
            @click="validateAndConfirm('ฝาก')"
            class="btn btn-success w-100 py-2 fw-bold shadow-sm"
          >
            ฝาก
          </button>
          <button
            @click="validateAndConfirm('ถอน')"
            class="btn btn-danger w-100 py-2 fw-bold shadow-sm"
          >
            ถอน
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showConfirmModal"
      class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style="z-index: 2000"
    >
      <div
        class="bg-white p-4 rounded-1 shadow border text-start mx-3"
        style="max-width: 340px; width: 100%"
      >
        <h5 class="fw-bold mb-3" style="font-size: 1.1rem">ยืนยันการฝาก-ถอน</h5>
        <p class="mb-4 text-dark">จำนวนเงิน &nbsp; {{ amount.toLocaleString() }} บาท</p>

        <div class="d-flex align-items-center gap-4">
          <button
            @click="handleConfirm"
            class="btn btn-dark px-4 py-2 rounded-2 fw-bold"
            style="background-color: #4d4d4d"
          >
            ยืนยัน
          </button>
          <button
            @click="showConfirmModal = false"
            class="btn btn-link text-decoration-none text-secondary p-0 fw-normal"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
