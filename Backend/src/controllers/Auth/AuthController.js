import { Router } from 'express'
import { AuthService } from '../../services/Auth/AuthService.js'
import { UserService } from '../../services/userService.js'


const router = Router()
const authService = new AuthService()
const userService = new UserService()

router.get('/login', async (req, res) => {
    console.log(`This is a get operation`)
    const exist = await userService.ExistentUser(req.body)
    if(exist === false)
    {
        return res.status(400).send('Credenciales Incorrectas')
    }
    const token = await authService.getSignedToken(req.body)
    console.log(token)
    return res.status(200).json(token)
})

export default router