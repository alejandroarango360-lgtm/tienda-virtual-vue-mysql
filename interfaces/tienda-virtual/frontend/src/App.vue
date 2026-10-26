<script setup>
import { ref } from 'vue';
import ProductosView from './views/ProductosView.vue';
import CrearProductoView from './views/CrearProductoView.vue';

// Variable para saber qué vista mostrar
const vistaActual = ref('catalogo');
</script>

<template>
  <div>
    <!-- Barra de navegación simple -->
    <nav class="navbar navbar-dark bg-dark mb-4">
      <div class="container">
        <span class="navbar-brand mb-0 h1">Panel de Control</span>
        <div>
          <button 
            @click="vistaActual = 'catalogo'" 
            class="btn btn-outline-light me-2" 
            :class="{ active: vistaActual === 'catalogo' }">
            Ver Tienda
          </button>
          <button 
            @click="vistaActual = 'admin'" 
            class="btn btn-outline-light"
            :class="{ active: vistaActual === 'admin' }">
            Agregar Producto (Admin)
          </button>
        </div>
      </div>
    </nav>

    <!-- Aquí se muestran las vistas según el botón -->
    <ProductosView v-if="vistaActual === 'catalogo'" />
    <CrearProductoView v-if="vistaActual === 'admin'" />
  </div>
</template>