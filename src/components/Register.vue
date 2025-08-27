<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="username" class="form-label">Name of User</label>
        <input type="text" v-model="username" class="form-control" id="username" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-success">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { apiService } from '../services/apiService'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleRegister = async () => {
      const payload = {
        email: email.value,
        password: password.value,
        full_name: username.value
      }

      // Utilisation du POST générique
      const result = await apiService.post('customer/auth/register/', payload)

      if (result.success) {
        alert('Inscription réussie !')
        router.push('/login') // redirection vers login
      } else {
        console.error(result.error)
        alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    return { username, email, password, handleRegister }
  }
})
</script>
