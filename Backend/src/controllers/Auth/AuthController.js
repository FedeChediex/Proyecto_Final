import { Router } from 'express'
import { getSignedToken } from '../../services/Auth/AuthService.js'
import { UserService } from '../../services/userService.js'


const router = Router()
const userService = new UserService()

router.get('/login', async (req, res) => {
    console.log(`This is a get operation`)
    const user = await userService.GetUserLogin(req.body)
    if(!user)
    {
        return res.status(400).send('Credenciales Incorrectas')
    }
    const token = await getSignedToken(user)
    console.log(token)
    return res.status(200).json(token)
})

export default router