import { Router } from 'express';
import { crearPedido } from '../controllers/pedidoController.js';

const router = Router();
router.post('/', crearPedido);

export default router;