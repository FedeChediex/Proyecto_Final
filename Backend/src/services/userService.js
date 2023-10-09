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

    ExistentUser = async (req) => {
        let existe = false

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('dni', sql.Int, req.usuario)
            .input('clave', sql.VarChar, req.clave)
            .query(`Select * From ${pTabla} where Dni = @dni AND clave = @clave `);
        console.log(response)
        response.recordset == " []"  ? existe = false : existe = true
        return existe
    }
}