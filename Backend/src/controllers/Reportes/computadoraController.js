import { Router } from 'express';
import { ComputadoraService } from '../../services/Reportes/computadoraService.js';
import { Authenticate } from '../../services/Auth/AuthService.js'


const router = Router()
const computadoraService = new ComputadoraService()

router.get('', Authenticate,async (req, res) => {
    console.log(`This is a get operation`);

    const compu = await computadoraService.GetComputadoras(req.query);

    return res.status(200).json(compu);
});

router.get('/:id', Authenticate,async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const compu = await computadoraService.GetCompuById(id)
    return res.status(200).json(compu)
})

router.put('/:id', Authenticate,async (req, res) => {
    const id = req.params.id
    const compu = await computadoraService.UpdateComputadora(id, req.body)
    return res.status(200).json(compu)
})

router.post('', Authenticate,async (req, res) => {
    console.log('Post')
    const compu = await computadoraService.AddComputadora(req.body)
    return res.status(200).json(compu)
})

export default router