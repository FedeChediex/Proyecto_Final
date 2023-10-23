import { Router } from 'express';
import { ComputadoraService } from '../../services/Reportes/computadoraService.js';

const router = Router()
const computadoraService = new ComputadoraService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const compu = await computadoraService.GetComputadoras(req.query);

    return res.status(200).json(compu);
});

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const compu = await computadoraService.GetCompuById(id)
    return res.status(200).json(compu)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const compu = await computadoraService.UpdateComputadora(id, req.body)
    return res.status(200).json(compu)
})

router.post('', async (req, res) => {
    console.log('Post')
    const compu = await computadoraService.AddComputadora(req.body)
    return res.status(200).json(compu)
})

export default router