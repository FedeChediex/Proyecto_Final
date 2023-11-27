import jwt from "jsonwebtoken"
import "dotenv/config"

export const getSignedToken = async (req) => {
    console.log("Firmando y Creando Token")
        const token = jwt.sign(
            {
                rol: req.Rol,
                userId: req.Id,
            },
            process.env.AUTH_HS256_KEY,
            { algorithm: "HS256" }
        )

        return token
    }


export const Authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token)
        return res.status(401).send("Token requerido")
    jwt.verify(token, process.env.AUTH_HS256_KEY, (err, tokenData) => {
        
        if (err) return res.status(403).send("Token invalido")
        req.userId = tokenData.userId;
        req.rol = tokenData.rol;
        next()
    })


}

export const Authorize = (req,res,next) => {
    let response
    req.rol ? next() : response = res.status(403).send("Permisos Invalidos")
    return response
}