<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { apiService } from '../services/apiService'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = async () => {
      const payload = {
        email: email.value,
        password: password.value
      }

      const result = await apiService.post('customer/auth/login/', payload)

      if (result.success) {
        alert('Connexion réussie !')
        if (result.data?.access) {
          localStorage.setItem('token', result.data.access)
        }
        router.push('/dashboard')
      } else {
        console.error(result.error)
        alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    return { email, password, handleLogin }
  }
})
</script>
