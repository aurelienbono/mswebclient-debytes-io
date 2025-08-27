import { createRouter, createWebHistory } from 'vue-router'
// import Login from '@/components/Login.vue'
// import Register from '@/components/Register.vue'


import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import ProductsPage from "../components/Product.vue"
import DashboardPage from "../components/Dasboard.vue"
import LocationsPage from "../components/Locations.vue"
import StockMovesPage from "../components/StockMoves.vue"

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register }, 
  { path: '/products', component: ProductsPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/locations', component: LocationsPage },
  { path: '/stock-moves', component: StockMovesPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
