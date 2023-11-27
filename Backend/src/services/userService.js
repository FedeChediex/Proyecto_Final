import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const pTabla = process.env.DB_TABLA_USER;

export class UserService {

    GetUser = async () => {
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT Rol,Id,Nombre,Apellido,Dni from ${pTabla}`);
        

        return response.recordset;
    }

    GetUserById = async (id) => {

        console.log('This is a function on the service', id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT Rol,Id,Nombre,Apellido,Dni from ${pTabla} where id = @id`);
        

        return response.recordset[0];
    }

    DeleteUser = async (id) => {
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);
        

        return response.recordset;
    }

    AddUser = async (req) => {
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre', sql.VarChar, req.Nombre)
            .input('apellido', sql.VarChar, req.Apellido)
            .input('dni', sql.Int, req.Dni)
            .input('clave', sql.VarChar, req.Clave)
            .input('rol', sql.VarChar, req.Rol)
            .query(`INSERT INTO ${pTabla} (Nombre, Apellido, Dni, Clave, Rol) VALUES (@nombre, @apellido, @dni, @clave, @rol)`);
        

        return response.recordset;
    }

    GetUserLogin = async (req) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('dni', sql.Int, req.usuario)
            .input('clave', sql.VarChar, req.clave)
            .query(`Select Rol,Id,Nombre,Apellido,Dni From ${pTabla} where Dni = @dni AND Clave = @clave `);
        
        
        console.log("Get User Login: ",response.recordset[0])
        
        return response.recordset[0];
    }
}