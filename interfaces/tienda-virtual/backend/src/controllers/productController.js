import { Producto } from '../models/producto.js'; // Si tu archivo tiene mayúscula, cambia 'producto.js' por 'Producto.js'

export async function listarProductos(req, res) {
  try {
    const productos = await Producto.listar();
    res.json(productos);
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).json({ mensaje: 'Error al consultar los productos' });
  }
}

export async function obtenerProducto(req, res) {
  try {
    const producto = await Producto.buscarPorId(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al consultar producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

export async function crearProducto(req, res) {
  try {
    const { nombre, precio, stock } = req.body;
    
    if (
      typeof nombre !== 'string' || 
      !nombre.trim() || 
      !Number.isFinite(precio) || 
      precio < 0 || 
      !Number.isInteger(stock) || 
      stock < 0
    ) {
      return res.status(400).json({ mensaje: 'Nombre, precio o stock inválidos' });
    }

    const producto = await Producto.crear({
      ...req.body,
      nombre: nombre.trim()
    });
    
    res.status(201).json({ mensaje: 'Producto creado correctamente', producto });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'No se pudo guardar el producto' });
  }
  
}
export async function eliminarProducto(req, res) {
  try {
    const eliminado = await Producto.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado (estado cambiado a inactivo)' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}