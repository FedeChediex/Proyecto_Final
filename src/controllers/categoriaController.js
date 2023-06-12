import { Router } from 'express';
import { CategoriaService } from '../services/categoriaService.js';

const router = Router()
const categoriaService = new CategoriaService()
export default router