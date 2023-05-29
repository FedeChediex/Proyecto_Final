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

    CreatePrestamo = async (prestamo) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Estado', sql.NChar, prestamo.estado)
            .input('Fk_Objeto', sql.Int, prestamo.fk_Objeto)
            .input('FK_Usuario', sql.Int, prestamo.fk_Usuario)
            .input('FK_Admin', sql.Int, prestamo.fk_Admin)
            .input('FechaSolicitud', sql.Date, prestamo.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo.FechaEntregado)
            .input('FechaDevuelto', sql.Date, FechaDevuelto)


            .query(`INSERT INTO ${pTabla}()`);
        console.log(response)

        return response.recordset;
    }

    UpdatePrestamo = async (id, prestamo) => {
        console.log('This is a function on the service');
        console.log(prestamo)
        var P = this.GetPrestamoById(id);
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, prestamo?.estado ?? P.estado)
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
        console.log(prestamo.FechaSolicitud)
        console.log(prestamo.fk_Admin)
        console.log(prestamo.fk_Objeto)
        console.log(prestamo.fk_Usuario)
        var error = "Algun Atributo no fue enviado"
        if (!prestamo.estado || !prestamo.FechaSolicitud || !prestamo.fk_Admin || !prestamo.fk_Objeto || !prestamo.fk_Usuario) {
            console.log(error)
            return error
        }
        console.log("Kuku")
        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Estado', sql.NChar, prestamo.estado)
            .input('FechaSolicitud', sql.Date, prestamo.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado?? null)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado?? null)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto?? null)
            .input('Fk_Admin', sql.Int, prestamo.fk_Admin)
            .input('Fk_Objeto', sql.Int, prestamo.fk_Objeto)
            .input('Fk_Usuario', sql.Int, prestamo.fk_Usuario)
            
            .query(`INSERT INTO ${pTabla} (Estado , Fk_Objeto , FK_Usuario , FK_Admin , FechaSolicitud , FechaAceptado , FechaEntregado, FechaDevuelto) values (@Estado, @Fk_Objeto,@FK_Usuario, @FK_Admin,@FechaSolicitud, @FechaAceptado,@FechaEntregado, @FechaDevuelto)`);
            console.log( "KSKASDKSDKA")
    }
}