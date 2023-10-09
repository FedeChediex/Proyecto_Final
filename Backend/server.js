import express from "express";
import PrestamoRouter from "./src/controllers/Prestamos/prestamoController.js";
import CategoriaRouter from "./src/controllers/Prestamos/categoriaController.js";
import ObjetoRouter from "./src/controllers/Prestamos/objetoController.js";
import passport from 'passport'
import { jwtStrategy } from './src/common/jwt.strategy.js'
import AuthRouter from "./src/controllers/Auth/AuthController.js"
import LaboRouter from "./src/controllers/Reportes/laboratorioController.js";

const app = express()
const port = 3000

app.use(express.json())
passport.use(jwtStrategy)
app.use(passport.initialize())

app.use("/auth", AuthRouter)

app.use("/prestamo", PrestamoRouter)
app.use("/categoria", CategoriaRouter)
app.use("/objeto", ObjetoRouter)


app.use("/labo", LaboRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})