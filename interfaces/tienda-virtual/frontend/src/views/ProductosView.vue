<script setup>
import { ref, onMounted, computed } from 'vue';
import { listarProductos, eliminarProducto, crearPedido } from '../services/productService';

const productos = ref([]);
const cargando = ref(true);
const error = ref('');

// --- LÓGICA DEL CARRITO ---
const carrito = ref([]);

const agregarAlCarrito = (producto) => {
  carrito.value.push(producto);
};

const totalCarrito = computed(() => {
  return carrito.value.reduce((suma, prod) => suma + Number(prod.precio), 0);
});

// --- LÓGICA DE PRODUCTOS ---
const cargarProductos = async () => {
  try {
    cargando.value = true;
    productos.value = await listarProductos();
  } catch (e) {
    error.value = 'No fue posible cargar los productos. Revisa si el backend está encendido.';
    console.error(e);
  } finally {
    cargando.value = false;
  }
};

const borrarProducto = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto de la tienda?')) {
    try {
      await eliminarProducto(id);
      await cargarProductos();
    } catch (e) {
      alert('Error al eliminar el producto');
      console.error(e);
    }
  }
};

// --- LÓGICA DE PAGO ---
const pagar = async () => {
  if (carrito.value.length === 0) return alert('El carrito está vacío');
  
  // Agrupamos cantidades por si el usuario agregó el mismo producto varias veces
  const productosAgrupados = {};
  carrito.value.forEach(prod => {
    if (productosAgrupados[prod.id]) {
      productosAgrupados[prod.id].cantidad += 1;
    } else {
      productosAgrupados[prod.id] = { ...prod, cantidad: 1 };
    }
  });

  try {
    const respuesta = await crearPedido({
      carrito: Object.values(productosAgrupados),
      total: totalCarrito.value
    });
    
    alert(`¡Gracias por tu compra! ${respuesta.mensaje}`);
    carrito.value = []; // Vaciamos el carrito
    await cargarProductos(); // Recargamos la lista para ver el stock actualizado
  } catch (error) {
    alert('Error al procesar el pago');
    console.error(error);
  }
};

onMounted(() => {
  cargarProductos();
});
</script>

<template>
  <main class="container py-5">
    
    <!-- BARRA DEL CARRITO Y PAGO -->
    <div class="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded shadow-sm border">
      <h1 class="m-0 fs-3">Mi Tienda Virtual</h1>
      
      <div class="d-flex align-items-center gap-3">
        <div class="fs-5 text-end">
          <div>🛒 Productos: <strong>{{ carrito.length }}</strong></div>
          <div class="text-success fw-bold">
            Total: {{ totalCarrito.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
          </div>
        </div>
        <button @click="pagar" class="btn btn-success fw-bold px-4 py-2" :disabled="carrito.length === 0">
          Finalizar Compra 💳
        </button>
      </div>
    </div>
    
    <p v-if="cargando" class="text-center">Cargando productos...</p>
    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>
    
    <div v-else class="row g-4">
      <div v-for="producto in productos" :key="producto.id" class="col-12 col-sm-6 col-lg-4">
        <article class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h2 class="h5">{{ producto.nombre }}</h2>
            <p class="text-muted flex-grow-1">{{ producto.descripcion }}</p>
            <p class="fw-bold text-success fs-5 mb-2">
              {{ Number(producto.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
            </p>
            <p class="small mb-3">Existencias: {{ producto.stock }}</p>
            
            <!-- BOTONES DE ACCIÓN -->
            <div class="d-flex gap-2 mt-auto">
              <button @click="agregarAlCarrito(producto)" class="btn btn-primary w-100">
                Agregar al carrito
              </button>
              <button @click="borrarProducto(producto.id)" class="btn btn-danger" title="Eliminar producto">
                🗑️
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>