

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { apiService } from './services/apiService'  

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const token = localStorage.getItem('access_token')
if (token) {
  apiService.setToken(token)
}

createApp(App)
  .use(router)
  .mount('#app')
