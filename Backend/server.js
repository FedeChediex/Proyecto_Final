import express from "express";
import PrestamoRouter from "./src/controllers/Prestamos/prestamoController.js";
import CategoriaRouter from "./src/controllers/Prestamos/categoriaController.js";
import ObjetoRouter from "./src/controllers/Prestamos/objetoController.js";
import LaboRouter from "./src/controllers/Reportes/laboratorioController.js";

const app = express()
const port = 3000

app.use(express.json())

app.use("/prestamo", PrestamoRouter)
app.use("/categoria", CategoriaRouter)
app.use("/objeto", ObjetoRouter)
app.use("/labo", LaboRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})