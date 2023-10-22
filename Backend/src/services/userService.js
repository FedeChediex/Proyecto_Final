import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const pTabla = process.env.DB_TABLA_USER;

export class UserService {

    GetUser = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${pTabla}`);
        console.log(response)

        return response.recordset;
    }

    GetUserById = async (id) => {

        console.log('This is a function on the service', id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${pTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    DeleteUser = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    AddUser = async (req) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre', sql.VarChar, req.Nombre)
            .input('apellido', sql.VarChar, req.Apellido)
            .input('dni', sql.Int, req.Dni)
            .input('clave', sql.VarChar, req.Clave)
            .input('rol', sql.VarChar, req.Rol)
            .query(`INSERT INTO ${pTabla} (Nombre, Apellido, Dni, Clave, Rol) VALUES (@nombre, @apellido, @dni, @clave, @rol)`);
        console.log(response)

        return response.recordset;
    }

    GetUserLogin = async (req) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('dni', sql.Int, req.usuario)
            .input('clave', sql.VarChar, req.clave)
            .query(`Select * From ${pTabla} where Dni = @dni AND Clave = @clave `);
        return response.recordset[0];
    }
}