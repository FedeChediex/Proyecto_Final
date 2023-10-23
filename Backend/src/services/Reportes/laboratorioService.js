import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'

const tabla = process.env.DB_TABLA_LABORATORIO;
export class LaboratorioService {
GetLaboratorios = async () => { 
    
    const pool = await sql.connect(config);
    const response = await pool.request()
        .query(`SELECT * from ${tabla}`);

    return response.recordset;
}

GetLaboById = async (id) => { 
    const pool = await sql.connect(config);
    const response = await pool.request()
        .query(`SELECT * from ${tabla} WHERE Id = ${id}`);

    return response.recordset[0];
}

Addlaboratorio = async (laboratorio) => {
    var error = "Algun Atributo no fue enviado"
    if (!laboratorio.Nombre) {
        return error
    }
    const pool = await sql.connect(config)
    const response = await pool.request()
        .input('Nombre', sql.NChar, laboratorio.Nombre)
        
        .query(`INSERT INTO ${tabla} (Nombre) values (@Nombre)`);
        return response.recordset;
    }
}