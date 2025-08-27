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
  try {
    const payload = {
      email: email.value,
      password: password.value
    }

    const result = await apiService.post('customer/auth/login/', payload)

    if (result.data && result.data.Tokens && result.data.Tokens.access) {
      const token = result.data.Tokens.access   
      localStorage.setItem('access_token', token)  
      apiService.setToken(token) 


      alert('Connexion réussie !')
      alert(token)
      router.push('/dashboard')
    } else {
      alert('Erreur : token non reçu')
      console.error(result)
    }
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la connexion')
  }
}

    return { email, password, handleLogin }
  }
})
</script>
