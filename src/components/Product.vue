<template>
  <div class="container mt-5">
    <h2>Products</h2>

    <!-- Formulaire ajout / édition en deux colonnes -->
    <form @submit.prevent="saveProduct">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input v-model="currentProduct.name" class="form-control" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Favorite</label>
          <input v-model="currentProduct.favorite" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Internal Reference</label>
          <input v-model="currentProduct.internalReference" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Responsible</label>
          <input v-model="currentProduct.responsible" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Barcode</label>
          <input v-model="currentProduct.barcode" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Sales Price</label>
          <input type="number" v-model.number="currentProduct.salesPrice" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Cost</label>
          <input type="number" v-model.number="currentProduct.cost" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Product Category</label>
          <input v-model="currentProduct.productCategory" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Product Type</label>
          <input v-model="currentProduct.productType" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Quantity On Hand</label>
          <input type="number" v-model.number="currentProduct.quantityOnHand" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Forecasted Quantity</label>
          <input type="number" v-model.number="currentProduct.forecastedQuantity" class="form-control" />
        </div>

        <div class="col-12">
          <label class="form-label">Activity Exception Decoration</label>
          <input v-model="currentProduct.ActivityExceptionDecoration" class="form-control" />
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-success">{{ currentProduct.id ? 'Update' : 'Add' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">Reset</button>
      </div>
    </form>

    <hr />

    <!-- Liste des produits -->
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Favorite</th>
          <th>Internal Ref</th>
          <th>Responsible</th>
          <th>Barcode</th>
          <th>Sales Price</th>
          <th>Cost</th>
          <th>Category</th>
          <th>Type</th>
          <th>Qty On Hand</th>
          <th>Forecasted Qty</th>
          <th>Activity Exception</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.favorite }}</td>
          <td>{{ product.internalReference }}</td>
          <td>{{ product.responsible }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.salesPrice }}</td>
          <td>{{ product.cost }}</td>
          <td>{{ product.productCategory }}</td>
          <td>{{ product.productType }}</td>
          <td>{{ product.quantityOnHand }}</td>
          <td>{{ product.forecastedQuantity }}</td>
          <td>{{ product.ActivityExceptionDecoration }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-2" @click="editProduct(product)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id!)">Delete</button>
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

export default defineComponent({
  setup() {
    const products = ref<Product[]>([])
    const currentProduct = ref<Product>({
      name: '',
      favorite: '',
      internalReference: '',
      responsible: '',
      barcode: '',
      salesPrice: 0,
      cost: 0,
      productCategory: '',
      productType: '',
      quantityOnHand: 0,
      forecastedQuantity: 0,
      ActivityExceptionDecoration: ''
    })

    // Charger les produits
    const loadProducts = async () => {
      const result = await apiService.get('inventory/products/')
      if(result.success) products.value = result.data
      else alert(`Erreur: ${JSON.stringify(result.error)}`)
    }

    onMounted(loadProducts)

    // Ajouter / mettre à jour
    const saveProduct = async () => {
      if(currentProduct.value.id) {
        const result = await apiService.put(`inventory/products/${currentProduct.value.id}/`, currentProduct.value)
        if(result.success) {
          alert('Product updated!')
          loadProducts()
          resetForm()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      } else {
        const result = await apiService.post('inventory/products/', currentProduct.value)
        if(result.success) {
          alert('Product added!')
          loadProducts()
          resetForm()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    const editProduct = (product: Product) => {
      currentProduct.value = { ...product }
    }

    const deleteProduct = async (id: number) => {
      if(confirm('Are you sure you want to delete this product?')) {
        const result = await apiService.delete(`inventory/products/${id}/`)
        if(result.success) {
          alert('Product deleted!')
          loadProducts()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    const resetForm = () => {
      currentProduct.value = {
        name: '',
        favorite: '',
        internalReference: '',
        responsible: '',
        barcode: '',
        salesPrice: 0,
        cost: 0,
        productCategory: '',
        productType: '',
        quantityOnHand: 0,
        forecastedQuantity: 0,
        ActivityExceptionDecoration: ''
      }
    }

    return { products, currentProduct, loadProducts, saveProduct, editProduct, deleteProduct, resetForm }
  }
})
</script>
