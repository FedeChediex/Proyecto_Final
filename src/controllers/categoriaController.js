import { Router } from 'express';
import { CategoriaService } from '../services/categoriaService.js';

const router = Router()
const categoriaService = new CategoriaService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const prestamo = await categoriaService.GetCategoria();

    return res.status(200).json(prestamo);
});

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const prestamo = await categoriaService.GetCategoriaById(id)
    return res.status(200).json(prestamo)
})

router.post('', async (req, res) => {
    console.log('Post')
    const objeto = await categoriaService.AddCategoria(req.body)
    return res.status(200).json(objeto)
})

export default router