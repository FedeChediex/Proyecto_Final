import { Router } from 'express'
import { getSignedToken } from '../../services/Auth/AuthService.js'
import { UserService } from '../../services/userService.js'


const router = Router()
const userService = new UserService()



router.post('/login', async (req, res) => {
    console.log(`This is a get Login`)
    const user = await userService.GetUserLogin(req.body)
    if(!user)
    {
        return res.status(400).send('Credenciales Incorrectas')
    }
    const token = await getSignedToken(user)
    console.log(token)
    const respuesta = {token, user}
    return res.status(200).json(respuesta)
})

export default router