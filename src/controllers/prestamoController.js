import { Router } from 'express';
import { PrestamoService } from '../services/prestamoService.js';

const router = Router()
const prestamoService = new PrestamoService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);
    
    const prestamo = await prestamoService.getPrestamo();
  
    return res.status(200).json(prestamo);
  });

  export default router