import { Router } from 'express';
import { PrestamoService } from '../../services/Prestamos/prestamoService.js';
import { Authenticate } from '../../services/Auth/AuthService.js'

const router = Router()
const prestamoService = new PrestamoService()

router.get('', Authenticate,async (req, res) => {
    console.log(`This is a get operation`);
    let error = "El estado es erroneo"
    
    const prestamo = await prestamoService.GetPrestamo(req.query);

    return res.status(200).json(prestamo);
});

router.get('/:id', Authenticate,async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const prestamo = await prestamoService.GetPrestamoById(id)
    return res.status(200).json(prestamo)
})
router.get('/activos', Authenticate,async (req, res) => {
    
    const prestamo = await prestamoService.GetPrestamoActivo()
    return res.status(200).json(prestamo)
})



router.post('', async (req, res) => {
    console.log('Post')
    const prestamo = await prestamoService.AddPrestamo(req.body)
    return res.status(200).json(prestamo)
})

router.delete('/:id', async (req, res) => {
    console.log('Delete')
    const prestamo = await prestamoService.DeletePrestamo(req.params.id)
    return res.status(200).json(prestamo)
})

router.put('/:id', async (req, res) => {
    console.log('Put')
    const prestamo = prestamoService.UpdatePrestamo(req.params.id, req.body)
    return res.status(200).json(prestamo)
})
export default router
