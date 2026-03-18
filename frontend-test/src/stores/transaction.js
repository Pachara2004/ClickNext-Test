/**
 * =====================================================================
 * @file            transaction.js
 * @since           2026-03-18
 * @author          Pachara Paisrisakul
 * ---------------------------------------------------------------------
 * @description
 *  - ไฟล์นี้เป็นส่วนหนึ่งของระบบจัดการธุรกรรมการเงิน (Deposit/Withdraw) ที่ใช้ Vue.js และ Pinia ในการจัดการสถานะ
 *  - มีฟังก์ชันหลักๆ เช่น การเพิ่มรายการธุรกรรม การลบรายการ และการคำนวณยอดเงินคงเหลือใหม่
 *  - ข้อมูลจะถูกบันทึกลง localStorage เพื่อให้คงอยู่แม้รีเฟรชหน้า
 *
 * =====================================================================
 */

import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => {
    // เช็คว่ามีข้อมูลเก่าใน localStorage ไหม
    const savedData = localStorage.getItem('bank_data')

    // ถ้ามีให้ใช้ข้อมูลเก่า ถ้าไม่มีให้ใช้ค่าเริ่มต้น
    if (savedData) {
      return JSON.parse(savedData)
    }

    return {
      balance: 0,
      transactions: [],
    }
  },
  actions: {
    // ฟังก์ชันช่วยบันทึกข้อมูลลง localStorage
    saveToLocalStorage() {
      localStorage.setItem(
        'bank_data',
        JSON.stringify({
          balance: this.balance,
          transactions: this.transactions,
        }),
      )
    },

    // ฟังก์ชันเพิ่มรายการธุรกรรม (ฝาก/ถอน)
    addTransaction(type, amount, email) {
      const newTransaction = {
        id: Date.now(),
        datetime: new Date().toLocaleString('th-TH'),
        amount: amount,
        status: type,
        email: email,
      }
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
        this.recalculateBalance()
      }
    },

    // ฟังก์ชันคำนวณยอดเงินคงเหลือใหม่
    recalculateBalance() {
      let initial = 0
      this.transactions.forEach((t) => {
        if (t.status === 'ฝาก') initial += t.amount
        else initial -= t.amount
      })
      this.balance = initial

      // ทุกครั้งที่คำนวณเงินเสร็จ ให้บันทึกข้อมูลลงเครื่องทันที
      this.saveToLocalStorage()
    },
  },
})
