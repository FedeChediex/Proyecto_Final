import jwt from "jsonwebtoken"
import "dotenv/config"
import { UserService } from "../userService.js"

const userService = new UserService()
export class AuthService {

    verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token)
            return res.status(401).send("Token requerido")
        jwt.verify(token, process.env.AUTH_HS256_KEY, (err, user) => {
            if (err) return res.status(403).send("Token invalido")
            req.user = user
            next()
        })

    }

    getSignedToken = async (req) => {
        

        const user = await userService.GetUserById(req.body)

        const token = jwt.sign(
            {
                userId: id,
                rol: user.Rol,
            },
            process.env.AUTH_HS256_KEY,
            { algorithm: "HS256" }
        )

        return token
    }
}