import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import pool from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use('/api/pedidos', pedidoRoutes);

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ estado: 'ok', baseDatos: 'conectada' });
  } catch (error) {
    console.error('Error de conexión:', error);
    res.status(500).json({ estado: 'error', baseDatos: 'no disponible' });
  }
});

app.use('/api/productos', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});