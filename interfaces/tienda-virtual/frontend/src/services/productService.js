import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const listarProductos = async () => {
  const respuesta = await api.get('/productos');
  return respuesta.data;
};
export const crearProducto = async (producto) => {
  const respuesta = await api.post('/productos', producto);
  return respuesta.data;
};
export const eliminarProducto = async (id) => {
  const respuesta = await api.delete(`/productos/${id}`);
  return respuesta.data;
};
export const crearPedido = async (pedido) => {
  const respuesta = await api.post('/pedidos', pedido);
  return respuesta.data;
};