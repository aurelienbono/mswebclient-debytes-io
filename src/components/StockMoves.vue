<template>
  <div class="container mt-5">
    <h2>Stock Moves</h2>

    <!-- Formulaire ajout / édition -->
    <form @submit.prevent="saveStockMove" class="mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Type</label>
          <select v-model="currentStockMove.type" class="form-select" required>
            <option value="">Select type</option>
            <option value="INBOUND">INBOUND</option>
            <option value="OUTBOUND">OUTBOUND</option>
            <option value="TRANSFER">TRANSFER</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label">Quantity</label>
          <input type="number" v-model.number="currentStockMove.qty" class="form-control" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">Product</label>
          <select v-model="currentStockMove.product" class="form-select" required>
            <option value="">Select product</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <label class="form-label">From Location</label>
          <select v-model="currentStockMove.from_location" class="form-select">
            <option value="">Select location</option>
            <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">To Location</label>
          <select v-model="currentStockMove.to_location" class="form-select">
            <option value="">Select location</option>
            <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
          </select>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-success">{{ currentStockMove.id ? 'Update' : 'Add' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">Reset</button>
      </div>
    </form>

    <!-- Liste des mouvements -->
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Type</th>
          <th>Qty</th>
          <th>Product</th>
          <th>From</th>
          <th>To</th>
          <th>Timestamp</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="move in stockMoves" :key="move.id">
          <td>{{ move.type }}</td>
          <td>{{ move.qty }}</td>
          <td>{{ move.product }}</td>
          <td>{{ move.from_location }}</td>
          <td>{{ move.to_location }}</td>
          <td>{{ move.timestamp }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-2" @click="editStockMove(move)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteStockMove(move.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { apiService } from '../services/apiService'
import type { Product } from '../types/Product'
import type { Location } from './LocationPage.vue'

interface StockMove {
  id?: string
  type: string
  qty: number
  product: string
  from_location?: string
  to_location?: string
  timestamp?: string
}

export default defineComponent({
  setup() {
    const products = ref<Product[]>([])
    const locations = ref<Location[]>([])
    const stockMoves = ref<StockMove[]>([])
    const currentStockMove = ref<StockMove>({
      type: '',
      qty: 0,
      product: '',
      from_location: '',
      to_location: ''
    })

    const loadProducts = async () => {
      const result = await apiService.get('inventory/products/')
      if (result.success) products.value = result.data
    }

    const loadLocations = async () => {
      const result = await apiService.get('inventory/locations/')
      if (result.success) locations.value = result.data
    }

    const loadStockMoves = async () => {
      const result = await apiService.get('inventory/stock-moves/')
      if (result.success) stockMoves.value = result.data
    }

    onMounted(() => {
      loadProducts()
      loadLocations()
      loadStockMoves()
    })

    const saveStockMove = async () => {
      if (currentStockMove.value.id) {
        const result = await apiService.put(`inventory/stock-moves/${currentStockMove.value.id}/`, currentStockMove.value)
        if (result.success) {
          alert('Stock Move updated!')
          loadStockMoves()
          resetForm()
        } else alert(JSON.stringify(result.error))
      } else {
        const result = await apiService.post('inventory/stock-moves/', currentStockMove.value)
        if (result.success) {
          alert('Stock Move added!')
          loadStockMoves()
          resetForm()
        } else alert(JSON.stringify(result.error))
      }
    }

    const editStockMove = (move: StockMove) => {
      currentStockMove.value = { ...move }
    }

    const deleteStockMove = async (id: string) => {
      if (confirm('Are you sure you want to delete this stock move?')) {
        const result = await apiService.delete(`inventory/stock-moves/${id}/`)
        if (result.success) {
          alert('Stock Move deleted!')
          loadStockMoves()
        } else alert(JSON.stringify(result.error))
      }
    }

    const resetForm = () => {
      currentStockMove.value = {
        type: '',
        qty: 0,
        product: '',
        from_location: '',
        to_location: ''
      }
    }

    return {
      products,
      locations,
      stockMoves,
      currentStockMove,
      saveStockMove,
      editStockMove,
      deleteStockMove,
      resetForm
    }
  }
})
</script>
