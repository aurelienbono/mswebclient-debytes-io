import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // <-- importer le router

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
  .use(router)  // <-- utiliser le router
  .mount('#app')
