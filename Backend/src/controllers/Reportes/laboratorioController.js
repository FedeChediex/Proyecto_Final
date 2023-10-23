import { Router } from 'express';
import { LaboratorioService } from '../../services/Reportes/laboratorioService.js';

const router = Router()
const laboratorioService = new LaboratorioService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const labo = await laboratorioService.GetLaboratorios();

    return res.status(200).json(labo);
});

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const labo = await laboratorioService.GetLaboById(id)
    return res.status(200).json(labo)
})

router.post('', async (req, res) => {
    console.log('Post')
    const labo = await laboratorioService.Addlaboratorio(req.body)
    return res.status(200).json(labo)
})

export default router