import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import { ObjetoService } from '../services/objetoService.js'



const objetoService = new ObjetoService()
const pTabla = process.env.DB_TABLA_PRESTAMO;

export class PrestamoService {

    GetPrestamo = async (prestamo) => {
        //Tengo que buscar  por DNI, Estado y si esta activo o no
        console.log('This is a function on the service');
        let dni = prestamo.dni
        let estado = prestamo.estado
        let enPrestamo = prestamo.EnPrestamo
        let where
        
        if (dni || estado || enPrestamo) {
            where = ' WHERE ';
            
            
            if (prestamo.dni) {
                var join = " INNER JOIN dbo.Usuario ON dbo.Prestamo.Fk_Usuario = dbo.Usuario.Id"
                where += `Usuario.dni LIKE '${dni}%'`;
                
            }
            
            if (estado) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `Estado LIKE '${estado}%'`;
            }
            
            if (enPrestamo) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `EnPrestamo = ${enPrestamo}`;
            }
        }
        console.log(where)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${pTabla + join + where}`);
        console.log(response)
        var res = response.recordset
        for (const obj of res) {
            delete obj.Id;
          }
        return res;
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


    

    UpdatePrestamo = async (id, prestamo, objeto) => {
        console.log('This is a function on the service');
        var estado = ""
        
        if(prestamo.FechaAceptado == null && P.FechaAceptado == null){
            estado = "Pendiente"
        }
        else if (prestamo.FechaEntregado==null && P.FechaEntregado == null){
            objeto.EnPrestamo = true
            estado = "Aceptado"
        }
        else if (prestamo.FechaDevuelto == null && P.FechaDevuelto == null){
            estado = "Entregado"
        }
        else{
            objeto.EnPrestamo = false
            estado = "Terminado"
        }
        
        
        await objetoService.UpdateObjeto(prestamo.FK_Objeto, objeto)

        var P = await this.GetPrestamoById(id);
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, estado)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado ?? P.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado ?? P.FechaEntregado)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto ?? P.FechaDevuelto)

            .query(`UPDATE ${pTabla} SET Estado = @Estado, FechaAceptado = @FechaAceptado, FechaEntregado = @FechaEntregado, FechaDevuelto = @FechaDevuelto  WHERE id = @Id`);
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
            .input('Estado', sql.NChar, "Pendiente")
            .input('FechaSolicitud', sql.Date, Date.Now())
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