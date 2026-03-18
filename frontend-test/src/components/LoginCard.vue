<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const formValidated = ref(false)
const loginError = ref('')

const MOCK_USER = {
  email: 'test@gmail.com',
  password: 'pass123',
}

// ฟังก์ชันเช็ก Error ของ Email
const getEmailError = () => {
  if (!email.value) return 'กรุณากรอก Email'
  if (!email.value.includes('@')) return 'Email ต้องมีเครื่องหมาย @'
  return ''
}

// ฟังก์ชันเช็ก Error ของ Password
const getPasswordError = () => {
  if (!password.value) return 'กรุณากรอก Password'
  return ''
}

const displayPasswordError = () => {
  if (loginError.value) return loginError.value
  if (formValidated.value && !password.value) return 'กรุณากรอก Password'
  return ''
}

// ฟังก์ชันจัดการเมื่อกดปุ่ม Login
const handleLogin = () => {
  formValidated.value = true
  loginError.value = ''

  if (getEmailError() === '' && getPasswordError() === '') {

    if (email.value === MOCK_USER.email && password.value === MOCK_USER.password) {
      localStorage.setItem('userEmail', email.value)
      router.push('/home')
    } else {
      loginError.value = 'Email หรือ Password ไม่ถูกต้อง'
    }
  }
}

</script>

<template>
  <div style="width: 90vw; max-width: 400px; margin: 0 auto">
    <div class="card-body text-center">
      <form @submit.prevent="handleLogin" novalidate>

        <div class="mb-3 text-start">
          <label class="form-label mb-1">Email *</label>
          <input
            v-model="email"
            type="email"
            :class="['form-control', formValidated && getEmailError() ? 'is-invalid' : '']"
            placeholder="Email"
          />
          <div v-if="formValidated && getEmailError()" class="text-danger small">
            {{ getEmailError() }}
          </div>
        </div>

        <div class="mb-3 text-start">
          <label class="form-label mb-1">Password *</label>
          <input
            v-model="password"
            type="password"
            :class="['form-control', (formValidated && getPasswordError()) || loginError ? 'is-invalid' : '']"
            placeholder="Password"
            @input="loginError = ''"
          />
          <div v-if="displayPasswordError()" class="text-danger small">
            {{ displayPasswordError() }}
          </div>
        </div>

        <button type="submit" class="btn btn-dark w-100 fw-bold mt-2">Login</button>
      </form>
    </div>
  </div>
</template>
