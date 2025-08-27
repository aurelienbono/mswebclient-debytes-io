<template>
  <div class="container mt-5">
    <h1>Dashboard</h1>
    <div class="list-group mt-4">
      <router-link to="/products" class="list-group-item list-group-item-action">
        Products
      </router-link>
      <router-link to="/locations" class="list-group-item list-group-item-action">
        Locations
      </router-link>
      <router-link to="/stock-moves" class="list-group-item list-group-item-action">
        Stock Moves
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard'
})
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
