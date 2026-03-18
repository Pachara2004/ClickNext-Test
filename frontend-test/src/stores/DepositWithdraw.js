import { defineStore } from 'pinia'
export const useTransactionStore = defineStore('transaction', {
  state: () => {
    // ตรวจสอบว่ามีข้อมูลเก่าในเครื่องไหม
    const savedData = localStorage.getItem('bank_data')

    // ถ้ามีให้ใช้ข้อมูลเก่า ถ้าไม่มีให้ใช้ค่าเริ่มต้น (เงิน 0 และประวัติว่าง)
    if (savedData) {
      return JSON.parse(savedData)
    }

    return {
      balance: 0, // เริ่มต้นยอดเงินเป็น 0 บาท
      transactions: [],
    }
  },

  actions: {
    // ฟังก์ชันช่วยบันทึกข้อมูลลงเครื่องอัตโนมัติ
    saveToLocalStorage() {
      localStorage.setItem(
        'bank_data',
        JSON.stringify({
          balance: this.balance,
          transactions: this.transactions,
        }),
      )
    },

    // ฟังก์ชันสำหรับเพิ่มรายการ ฝาก/ถอน
    addTransaction(type, amount, email) {
      const newTransaction = {
        id: Date.now(),
        datetime: new Date().toLocaleString('th-TH'),
        amount: amount,
        status: type,
        email: email,
      }

      // เพิ่มข้อมูลไว้บนสุดของรายการ
      this.transactions.unshift(newTransaction)
      this.recalculateBalance()
    },

    // ฟังก์ชันลบรายการธุรกรรม
    deleteTransaction(id) {
      this.transactions = this.transactions.filter((t) => t.id !== id)
      this.recalculateBalance()
    },

    // ฟังก์ชันแก้ไขรายการธุรกรรม
    updateTransaction(id, newAmount) {
      const index = this.transactions.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.transactions[index].amount = newAmount

        // คำนวณเงินใหม่และบันทึก
        this.recalculateBalance()
      }
    },

    // ฟังก์ชันคำนวณยอดเงินคงเหลือใหม่จากรายการธุรกรรมทั้งหมด (เพื่อความแม่นยำ)
    recalculateBalance() {
      let currentBalance = 0

      // วนลูปคำนวณจากประวัติ เรียงจากเก่าไปใหม่เพื่อความถูกต้อง
      const history = [...this.transactions].reverse()
      history.forEach((t) => {
        if (t.status === 'ฝาก') {
          currentBalance += t.amount
        } else {
          currentBalance -= t.amount
        }
      })

      // อัปเดตยอดเงินคงเหลือใน Store
      this.balance = currentBalance

      // บันทึกสถานะล่าสุดลง localStorage ทันที
      this.saveToLocalStorage()
    },
  },
})
