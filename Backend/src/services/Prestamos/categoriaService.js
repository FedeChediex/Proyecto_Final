import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'

const Tabla = process.env.DB_TABLA_CATEGORIA;

export class CategoriaService {
    
    
        GetCategoria = async () => {
            
    
            const pool = await sql.connect(config);
            const response = await pool.request()
                .query(`SELECT * from ${Tabla}`);
            
    
            return response.recordset;
        }
    
        GetCategoriaById = async (id) => {
    
            console.log('This is a function on the service', id);
    
            const pool = await sql.connect(config);
            const response = await pool.request()
                .input('id', sql.Int, id)
                .query(`SELECT * from ${Tabla} where id = @id`);
            
    
            return response.recordset[0];
        }
       
        AddCategoria = async (categoria) => {
            var error = "Algun Atributo no fue enviado"
            if (!categoria.Nombre) {
                return error
            }
            const pool = await sql.connect(config)
            const response = await pool.request()
                .input('Nombre', sql.NChar, categoria.Nombre)
                
                .query(`INSERT INTO ${Tabla} (Nombre) values (@Nombre)`);
                return response.recordset;
            }
    }
    
