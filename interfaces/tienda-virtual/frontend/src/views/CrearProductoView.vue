<script setup>
import { ref } from 'vue';
import { crearProducto } from '../services/productService';

const nombre = ref('');
const descripcion = ref('');
const precio = ref('');
const stock = ref('');
const categoria_id = ref('1'); // Por defecto Tecnología
const mensaje = ref('');
const error = ref('');

const guardarProducto = async () => {
  mensaje.value = '';
  error.value = '';
  
  try {
    // Enviamos los datos al backend
    await crearProducto({
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: Number(precio.value),
      stock: Number(stock.value),
      categoria_id: Number(categoria_id.value)
    });

    mensaje.value = '¡Producto guardado exitosamente en MySQL!';
    // Limpiar formulario
    nombre.value = '';
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
  } catch (e) {
    error.value = 'Error al guardar. Revisa que el backend esté encendido y los datos sean correctos.';
    console.error(e);
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Crear Nuevo Producto</h3>
          </div>
          <div class="card-body">
            
            <div v-if="mensaje" class="alert alert-success">{{ mensaje }}</div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <form @submit.prevent="guardarProducto">
              <div class="mb-3">
                <label class="form-label">Nombre del producto</label>
                <input type="text" class="form-control" v-model="nombre" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea class="form-control" v-model="descripcion" rows="2"></textarea>
              </div>

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label">Precio (COP)</label>
                  <input type="number" class="form-control" v-model="precio" required min="0">
                </div>
                <div class="col">
                  <label class="form-label">Stock (Cantidad)</label>
                  <input type="number" class="form-control" v-model="stock" required min="0">
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label">Categoría</label>
                <select class="form-select" v-model="categoria_id">
                  <option value="1">Tecnología</option>
                  <option value="2">Hogar</option>
                  <option value="3">Accesorios</option>
                </select>
              </div>

              <button type="submit" class="btn btn-success w-100">
                Guardar Producto en Base de Datos
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>