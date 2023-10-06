import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'

const oTabla = process.env.DB_TABLA_OBJETO;

export class ObjetoService {

    GetObjeto = async (req) => {
        //Busqueda por activo
        console.log('This is a function on the service');
        const cat = req.Categoria
        const enPrestamo = req.EnPrestamo
        const nombre = req.Nombre
        const activo = req.Activo
        var filtros = []
        if (cat) {
            filtros.push(`Fk_Categoria = ${cat}`);
        }
        if (enPrestamo) {
            filtros.push(`EnPrestamo = ${enPrestamo}`);
        }
        if (nombre) {
            filtros.push(`Nombre LIKE '${nombre}%'`);
        }
        if (activo) {
            filtros.push(`Activo = ${activo}`);
        }
        if (filtros.length > 0) {
            const where = ' WHERE ' + filtros.join(' AND ');
            console.log(where)
            
        }
        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${oTabla + where}`);


        return response.recordset;
    }

    GetObjetoById = async (id) => {

        console.log('This is a function on the service', id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${oTabla} where id = @id`);

        return response.recordset[0];
    }

    UpdateObjeto = async (id, objeto) => {
        console.log('This is a function on the service');
        let activo
        if (objeto.Estado) {

            if (objeto.EnPrestamo == 1) {
                activo = true
                estado = "prestado"
            }
            else {
                activo = false
                estado = "Disponible"
            }
        }

        var O = await this.GetObjetoById(id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.NChar, objeto?.Nombre ?? O.Nombre)
            .input('Estado', sql.NChar, estado)
            .input('EnPrestamo', sql.Bit, objeto?.EnPrestamo ?? O.EnPrestamo)


            .query(`UPDATE ${oTabla} SET Nombre = @Nombre, Estado = @Estado, EnPrestamo = @EnPrestamo  WHERE id = @Id`);


        return response.recordset;
    }

    /*DeleteObjeto = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`UPDATE ${oTabla} SET Activo = 0  WHERE id = @Id`);


        return response.recordset;
    }*/

    AddObjeto = async (objeto) => {
        var error = "Algun Atributo no fue enviado"
        if (!objeto.Estado || !objeto.Nombre || !objeto.EnPrestamo || !objeto.FK_Categoria) {
            return error
        }

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Nombre', sql.NChar, objeto.Nombre)
            .input('Estado', sql.NChar, objeto.Estado)
            .input('EnPrestamo', sql.Bit, objeto.EnPrestamo)
            .input('Fk_Categoria', sql.Int, objeto.FK_Categoria)
            .input('Activo', sql.Bit, true)


            .query(`INSERT INTO ${oTabla} (Nombre , Estado , EnPrestamo , FK_Categoria, Activo) values (@Nombre, @Estado, @EnPrestamo, @FK_Categoria, @Activo)`);
        return response.recordset;
    }
}
