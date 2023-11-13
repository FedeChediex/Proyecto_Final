import express from "express";



import AuthRouter from "./src/controllers/Auth/AuthController.js"
import LaboRouter from "./src/controllers/Reportes/laboratorioController.js";
import PrestamoRouter from "./src/controllers/Prestamos/prestamoController.js";
import CategoriaRouter from "./src/controllers/Prestamos/categoriaController.js";
import ObjetoRouter from "./src/controllers/Prestamos/objetoController.js";
import ComputadoraRouter from "./src/controllers/Reportes/computadoraController.js"
import ReporteRouter from "./src/controllers/Reportes/reporteController.js"
import UserRouter from "./src/controllers/userController.js"

const app = express()
const port = 3000

app.use(express.json())


app.use("/auth", AuthRouter)

app.use("/prestamo", PrestamoRouter)
app.use("/categoria", CategoriaRouter)
app.use("/objeto", ObjetoRouter)

app.use("/reporte", ReporteRouter)
app.use("/labo", LaboRouter)
app.use("/compu",ComputadoraRouter)
app.use("/user", UserRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})