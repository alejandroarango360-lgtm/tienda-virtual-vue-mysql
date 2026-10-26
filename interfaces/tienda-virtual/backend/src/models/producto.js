import pool from '../config/db.js';

export const Producto = {
  async listar() {
    const [filas] = await pool.execute(`
      SELECT p.id, p.nombre, p.descripcion, p.precio, 
      p.stock, p.imagen_url, c.nombre AS categoria 
      FROM productos p 
      LEFT JOIN categorias c ON c.id = p.categoria_id 
      WHERE p.estado = TRUE 
      ORDER BY p.id DESC
    `);
    return filas;
  },
  
  async buscarPorId(id) { 
    const [filas] = await pool.execute(
      'SELECT * FROM productos WHERE id = ? AND estado = TRUE', 
      [id]
    );
    return filas[0] || null;
  },

  async crear(datos) {
    const { categoria_id, nombre, descripcion, precio, stock, imagen_url } = datos;
    const [resultado] = await pool.execute(
      'INSERT INTO productos (categoria_id, nombre, descripcion, precio, stock, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
      [categoria_id || null, nombre, descripcion || null, precio, stock, imagen_url || null]
    );
    return this.buscarPorId(resultado.insertId); 
  },
    async eliminar(id) {
    const [resultado] = await pool.execute(
      'UPDATE productos SET estado = FALSE WHERE id = ?',
      [id]
    );
    return resultado.affectedRows > 0;
  }
};
