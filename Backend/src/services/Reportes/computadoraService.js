import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'

const tabla = process.env.DB_TABLA_COMPUTADORA;
export class ComputadoraService {
GetComputadoras = async (req) => { 
    
    const funciona = req.funciona
    let where
     funciona ? where = ` WHERE Funciona = ${funciona}` : where = ""
    
    const pool = await sql.connect(config);
    const response = await pool.request()
        .query(`SELECT * from ${tabla + where}`);

    return response.recordset;
}

GetCompuById = async (id) => { 
    const pool = await sql.connect(config);
    const response = await pool.request()
        .query(`SELECT * from ${tabla} WHERE Id = ${id}`);

    return response.recordset[0];
}

UpdateComputadora = async (id, compu) => {
    
    var C = await this.GetCompuById(id);
    const pool = await sql.connect(config);
    const response = await pool.request()
        .input('Id', sql.Int, id)
        .input('Columna', sql.Int, compu?.Columna ?? C.Columna)
        .input('Fila', sql.Int, compu?.Fila ?? C.Fila)
        .input('Lado', sql.Bit, compu?.Lado ?? C.Lado)
        .input('Funciona', sql.Bit, compu?.Funciona ?? C.Funciona)


        .query(`UPDATE ${tabla} SET Columna = @Columna, Fila = @Fila, Lado = @Lado, Funciona = @Funciona  WHERE id = @Id`);


    return response.recordset;
}

AddComputadora = async (computadora) => {
    var error = "Algun Atributo no fue enviado"
    if (!computadora.Columna || !computadora.Fila || !computadora.Lado) {
        return error
    }
    console.log(computadora.Lado)
    const pool = await sql.connect(config)
    const response = await pool.request()
        .input('Columna', sql.Int, computadora.Columna)
        .input('Fila', sql.Int, computadora.Fila)
        .input('Lado', sql.Bit, computadora.Lado)
        
        .query(`INSERT INTO ${tabla} (Columna, Fila, Lado) values (@Columna, @Fila, @Lado)`);
 
        return response.recordset;
    }
}