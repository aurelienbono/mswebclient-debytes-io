<template>
  <div class="container mt-5">
    <h2>Locations</h2>

    <!-- Formulaire ajout / édition -->
    <form @submit.prevent="saveLocation" class="mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input v-model="currentLocation.name" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Code</label>
          <input v-model="currentLocation.code" class="form-control" required />
        </div>
      </div>
      <div class="mt-3">
        <button type="submit" class="btn btn-success">{{ currentLocation.id ? 'Update' : 'Add' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">Reset</button>
      </div>
    </form>

    <!-- Liste des locations -->
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="location in locations" :key="location.id">
          <td>{{ location.name }}</td>
          <td>{{ location.code }}</td>
          <td>{{ location.created_at }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-2" @click="editLocation(location)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteLocation(location.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { apiService } from '../services/apiService'

interface Location {
  id?: string
  name: string
  code: string
  created_at?: string
}

export default defineComponent({
  setup() {
    const locations = ref<Location[]>([])
    const currentLocation = ref<Location>({ name: '', code: '' })

    const loadLocations = async () => {
      const result = await apiService.get('inventory/locations/')
      if (result.success) locations.value = result.data
      else alert(`Erreur: ${JSON.stringify(result.error)}`)
    }

    onMounted(loadLocations)

    const saveLocation = async () => {
      if (currentLocation.value.id) {
        const result = await apiService.put(`inventory/locations/${currentLocation.value.id}/`, currentLocation.value)
        if (result.success) {
          alert('Location updated!')
          loadLocations()
          resetForm()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      } else {
        const result = await apiService.post('inventory/locations/', currentLocation.value)
        if (result.success) {
          alert('Location added!')
          loadLocations()
          resetForm()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    const editLocation = (location: Location) => {
      currentLocation.value = { ...location }
    }

    const deleteLocation = async (id: string) => {
      if (confirm('Are you sure you want to delete this location?')) {
        const result = await apiService.delete(`inventory/locations/${id}/`)
        if (result.success) {
          alert('Location deleted!')
          loadLocations()
        } else alert(`Erreur: ${JSON.stringify(result.error)}`)
      }
    }

    const resetForm = () => {
      currentLocation.value = { name: '', code: '' }
    }

    return { locations, currentLocation, saveLocation, editLocation, deleteLocation, resetForm }
  }
})
</script>
