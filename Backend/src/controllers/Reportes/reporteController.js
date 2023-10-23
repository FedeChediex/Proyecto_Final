import { Router } from 'express';
import { ReporteService } from '../../services/Reportes/reporteService.js';
import { Authenticate } from '../../services/Auth/AuthService.js'

const router = Router()
const reporteService = new ReporteService()

router.get('', Authenticate,async (req, res) => {
    console.log(`This is a get operation`);
    let error = "El estado es erroneo"
    
    const reporte = await reporteService.GetReporte(req.query);

    return res.status(200).json(reporte);
});

router.get('/:id', Authenticate,async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const reporte = await reporteService.GetReporteById(id)
    return res.status(200).json(reporte)
})
router.get('/activos', Authenticate,async (req, res) => {
    
    const reporte = await reporteService.GetReporteActivo()
    return res.status(200).json(reporte)
})



router.post('', async (req, res) => {
    console.log('Post')
    const reporte = await reporteService.AddReporte(req.body)
    return res.status(200).json(reporte)
})

router.delete('/:id', async (req, res) => {
    console.log('Delete')
    const reporte = await reporteService.DeleteReporte(req.params.id)
    return res.status(200).json(reporte)
})

router.put('/:id', async (req, res) => {
    console.log('Put')
    const reporte = reporteService.UpdateReporte(req.params.id, req.body)
    return res.status(200).json(reporte)
})
export default router