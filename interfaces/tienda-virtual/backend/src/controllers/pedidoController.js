import { Pedido } from '../models/pedido.js';

export async function crearPedido(req, res) {
  try {
    const { carrito, total } = req.body;
    
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    // Usamos el usuario_id 1 (el que creamos en SQL)
    const pedidoId = await Pedido.crear(1, total, carrito);
    
    res.status(201).json({ mensaje: 'Compra realizada con éxito', pedidoId });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ mensaje: 'Error al procesar la compra' });
  }
}