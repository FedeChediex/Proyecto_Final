import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const pTabla = process.env.DB_TABLA_PRESTAMO;

export class PrestamoService {

    getPrestamo = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        .query(`SELECT * from ${pTabla}`);
        console.log(response)

        return response.recordset;
    }

    getPrestamoById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${pTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    createPrestamo = async (prestamo) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Estado',sql.NChar, prestamo.estado )
            .input('Fk_Objeto',sql.Int, prestamo.fk_Objeto)
            .input('FK_Usuario',sql.Int, prestamo.fk_Usuario)
            .input('FK_Admin' , sql.Int, prestamo.fk_Admin)
            .input('FechaSolicitud', sql.Date, prestamo.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo.FechaEntregado)
            .input('FechaDevuelto', sql.Date, FechaDevuelto)

            
            .query(`INSERT INTO ${pTabla}()`);
        console.log(response)

        return response.recordset;
    }

    updatePrestamoById = async (id, prestamo) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Estado',sql.NChar, prestamo.estado )
            .input('Fk_Objeto',sql.Int, prestamo.fk_Objeto)
            .input('FK_Usuario',sql.Int, prestamo.fk_Usuario)
            .input('FK_Admin' , sql.Int, prestamo.fk_Admin)
            .input('FechaSolicitud', sql.Date, prestamo.FechaSolicitud)
            .input('FechaAceptado', sql.Date, prestamo.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo.FechaEntregado)
            .input('FechaDevuelto', sql.Date, FechaDevuelto)

            .query(`UPDATE ${pTabla} SET Estado = @Estado, Fk_Objeto = @Fk_Objeto, FK_Usuario = @FK_Usuario, FK_Admin = @FK_Admin, FechaSolicitud = @FechaSolicitud, FechaAceptado = @FechaAceptado, FechaEntregado = @FechaEntregado, FechaDevuelto = @FechaDevuelto  WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePrestamoById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}