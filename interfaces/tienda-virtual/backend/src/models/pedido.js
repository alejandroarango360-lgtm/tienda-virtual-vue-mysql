import pool from '../config/db.js';

export const Pedido = {
  async crear(usuario_id, total, carrito) {
    const conexion = await pool.getConnection(); // Usamos una transacción
    try {
      await conexion.beginTransaction();

      // 1. Guardar el pedido principal
      const [pedidoResult] = await conexion.execute(
        'INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)',
        [usuario_id, total]
      );
      const pedidoId = pedidoResult.insertId;

      // 2. Guardar los detalles (qué productos compró)
      for (const item of carrito) {
        await conexion.execute(
          'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
          [pedidoId, item.id, item.cantidad, item.precio, item.cantidad * item.precio]
        );
        
        // 3. Restar el stock (Inventario)
        await conexion.execute(
          'UPDATE productos SET stock = stock - ? WHERE id = ?',
          [item.cantidad, item.id]
        );
      }

      await conexion.commit();
      return pedidoId;
    } catch (error) {
      await conexion.rollback();
      throw error;
    } finally {
      conexion.release();
    }
  }
};