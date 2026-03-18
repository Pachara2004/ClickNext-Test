<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()

// State สำหรับ Modal แก้ไข
const showEditModal = ref(false)
const editingItem = ref(null)
const editAmount = ref(0)
const editError = ref('')

// State สำหรับ Modal ลบ
const showDeleteModal = ref(false)
const deletingItem = ref(null)

// ฟังก์ชันเปิด Modal แก้ไข
const openEdit = (item) => {
  editingItem.value = item
  editAmount.value = item.amount
  editError.value = ''
  showEditModal.value = true
}

// ฟังก์ชันบันทึกการแก้ไข
const saveEdit = () => {
  if (editAmount.value <= 0 || editAmount.value > 100000) {
    editError.value = 'กรุณากรอก 1 - 100,000'
    return
  }
  store.updateTransaction(editingItem.value.id, editAmount.value)
  showEditModal.value = false
}

// ฟังก์ชันเปิด Modal ลบ
const openDelete = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

// ฟังก์ชันยืนยันการลบ
const confirmDelete = () => {
  store.deleteTransaction(deletingItem.value.id)
  showDeleteModal.value = false
}
</script>

<template>
  <div class="p-3 w-100">
    <p class="mb-2 fw-normal">ประวัติรายการฝากถอน</p>

    <div class="table-responsive">
      <table class="table table-bordered align-middle text-center mb-2" style="border-color: #000">
        <thead>
          <tr class="align-middle">
            <th class="fw-normal py-2" style="width: 30%">Datetime</th>
            <th class="fw-normal py-2">Amount</th>
            <th class="fw-normal py-2">Status</th>
            <th class="fw-normal py-2 d-none d-md-table-cell">Email</th>
            <th class="fw-normal py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.transactions" :key="item.id">
            <td class="py-2">{{ item.datetime }}</td>
            <td class="py-2">{{ item.amount.toLocaleString() }}</td>
            <td class="py-2">
              <span :class="item.status === 'ฝาก' ? 'text-success' : 'text-danger'">
                {{ item.status }}
              </span>
            </td>
            <td class="py-2 d-none d-md-table-cell">{{ item.email }}</td>
            <td class="py-2">
              <div class="d-flex justify-content-center">
                <button
                  @click="item.status === 'ฝาก' ? openEdit(item) : openDelete(item)"
                  class="btn btn-dark btn-sm rounded-pill px-0 py-0 fw-bold"
                  style="
                    font-size: 0.85rem;
                    background-color: #343a40;
                    border: none;
                    min-width: 85px;
                    height: 28px;
                  "
                >
                  {{ item.status === 'ฝาก' ? 'Edit' : 'Delete' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-2 small text-dark fw-normal">
        แสดง {{ store.transactions.length > 0 ? 1 : 0 }} ถึง {{ store.transactions.length }} จาก
        {{ store.transactions.length }} รายการ
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-10"
      style="z-index: 3000"
    >
      <div class="bg-white p-4 rounded-1 shadow-sm border text-start" style="width: 380px; max-width: 90vw;">
        <h5 class="fw-bold mb-3" style="font-size: 1.1rem">
          แก้ไขจำนวนเงิน{{ editingItem.status }}
        </h5>
        <div class="small text-dark mb-3">
          ของวันที่ {{ editingItem.datetime }} <br />
          จากอีเมล {{ editingItem.email }}
        </div>
        <label class="form-label small">จำนวนเงิน *</label>
        <input v-model.number="editAmount" type="number" class="form-control mb-1" />
        <div v-if="editError" class="text-danger small mb-3">{{ editError }}</div>
        <div class="d-flex align-items-center gap-4 mt-4">
          <button @click="saveEdit" class="btn btn-dark px-4 py-2" style="background-color: #4d4d4d; border: none; border-radius: 8px">
            ยืนยัน
          </button>
          <button @click="showEditModal = false" class="btn btn-link text-decoration-none text-secondary p-0">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-10"
      style="z-index: 3000"
    >
      <div class="bg-white p-4 rounded-1 shadow-sm border text-start" style="width: 380px; max-width: 90vw;">
        <h5 class="fw-bold mb-3" style="font-size: 1.1rem">ยืนยันการลบ</h5>
        <div class="small text-dark mb-4">
          จำนวนเงิน{{ deletingItem.status }} {{ deletingItem.amount.toLocaleString() }} บาท <br />
          ของวันที่ {{ deletingItem.datetime }} <br />
          จากอีเมล {{ deletingItem.email }}
        </div>
        <div class="d-flex align-items-center gap-4">
          <button @click="confirmDelete" class="btn btn-dark px-4 py-2" style="background-color: #4d4d4d; border: none; border-radius: 8px">
            ยืนยัน
          </button>
          <button @click="showDeleteModal = false" class="btn btn-link text-decoration-none text-secondary p-0">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
