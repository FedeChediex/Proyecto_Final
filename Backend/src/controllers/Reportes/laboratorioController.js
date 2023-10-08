import { Router } from 'express';
import { LaboratorioService } from '../../services/Reportes/laboratorioService.js';

const router = Router()
const laboratorioService = new LaboratorioService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const prestamo = await laboratorioService.GetLaboratorios();

    return res.status(200).json(prestamo);
});

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const prestamo = await laboratorioService.GetLaboById(id)
    return res.status(200).json(prestamo)
})

router.post('', async (req, res) => {
    console.log('Post')
    const objeto = await laboratorioService.Addlaboratorio(req.body)
    return res.status(200).json(objeto)
})

export default router