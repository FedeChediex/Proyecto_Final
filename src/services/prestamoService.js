import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const pTabla = process.env.DB_TABLA_PRESTAMO;

export class PrestamoService {

    GetPrestamo = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${pTabla}`);
        console.log(response)

        return response.recordset;
    }

    GetPrestamoById = async (id) => {

        console.log('This is a function on the service', id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${pTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    UpdatePrestamo = async (id, prestamo) => {
        console.log('This is a function on the service');
       
        var P = await this.GetPrestamoById(id);
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, prestamo?.Estado ?? P.estado)
            .input('FechaSolicitud', sql.Date, prestamo?.FechaSolicitud ?? P.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado ?? P.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado ?? P.FechaEntregado)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto ?? P.FechaDevuelto)

            .query(`UPDATE ${pTabla} SET Estado = @Estado, FechaSolicitud = @FechaSolicitud, FechaAceptado = @FechaAceptado, FechaEntregado = @FechaEntregado, FechaDevuelto = @FechaDevuelto  WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    DeletePrestamo = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    AddPrestamo = async (prestamo) => {
        const error = "Algun Atributo no fue enviado correctamente"
        const error01 = "Algun id no pertenece a un usuario"
        /*if(await this.GetUserById(prestamo.Fk_Admin).Rol != true || await this.GetUserById(prestamo.Fk_Usuario).Rol != false){
            return error01
        }   */
        if (!prestamo.Estado || !prestamo.FechaSolicitud || !prestamo.FK_Objeto) {
            return error
        }
        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Estado', sql.NChar, prestamo.Estado)
            .input('FechaSolicitud', sql.Date, prestamo.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado?? null)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado?? null)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto?? null)
            .input('Fk_Admin', sql.Int, prestamo.FK_Admin)
            .input('Fk_Objeto', sql.Int, prestamo.FK_Objeto)
            .input('Fk_Usuario', sql.Int, prestamo.FK_Usuario)
            
            .query(`INSERT INTO ${pTabla} (Estado , Fk_Objeto , FK_Usuario , FK_Admin , FechaSolicitud , FechaAceptado , FechaEntregado, FechaDevuelto) values (@Estado, @Fk_Objeto,@FK_Usuario, @FK_Admin,@FechaSolicitud, @FechaAceptado,@FechaEntregado, @FechaDevuelto)`);
            return response.recordset;
    }
}