import { Router } from 'express';
import { listarProductos, obtenerProducto, crearProducto, eliminarProducto } from '../controllers/productController.js';
const router = Router();

router.get('/', listarProductos);
router.get('/:id', obtenerProducto);
router.post('/', crearProducto);
router.delete('/:id', eliminarProducto);    

export default router;  