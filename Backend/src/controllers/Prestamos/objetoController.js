import { Router } from 'express'
import { ObjetoService } from '../../services/Prestamos/objetoService.js'


const router = Router()
const objetoService = new ObjetoService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`)
    
    const objeto = await objetoService.GetObjeto(req.query)

    return res.status(200).json(objeto)
})

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const objeto = await objetoService.GetObjetoById(id)
    return res.status(200).json(objeto)
})

router.post('', async (req, res) => {
    console.log('Post')
    const objeto = await objetoService.AddObjeto(req.body)
    return res.status(200).json(objeto)
})

router.delete('/:id', async (req, res) => {
    console.log('Delete')
    const objeto = await objetoService.DeleteObjeto(req.params.id)
    return res.status(200).json(objeto)
})

router.put('/:id', async (req, res) => {
    console.log('Put')
    const objeto = objetoService.UpdateObjeto(req.params.id, req.body)
    return res.status(200).json(objeto)
})

export default router