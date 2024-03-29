import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'
import { ObjetoService } from './objetoService.js'
import { UserService } from '../userService.js'



const objetoService = new ObjetoService()
const userService = new UserService()
const pTabla = process.env.DB_TABLA_PRESTAMO;
const join = " INNER JOIN dbo.Usuario ON dbo.Prestamo.Fk_Usuario = dbo.Usuario.Id "

export class PrestamoService {

    GetPrestamo = async (prestamo) => {


        let dni = prestamo.dni
        let estado = prestamo.estado
        let objeto = prestamo.FK_Objeto

        let where = " "
        
        if (dni || estado || objeto) {
            where = ' WHERE ';


            if (prestamo.dni) {
                
                where += `Usuario.dni LIKE '${dni}%'`;

            }

            if (estado) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `Estado LIKE '${estado}%'`;
            }

            if (objeto) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `FK_Objeto = ${objeto}`;
            }



        }
        console.log("Where :" + where)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${pTabla + join + where}`);

        var res = response.recordset
        for (const obj of res) {

            let id = obj.Id[0]
            obj.Id = id
            
            delete obj.Clave
            delete obj.Rol
            
           
        }
        return res;
    }

    GetPrestamoById = async (id) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${pTabla + join } where dbo.Prestamo.Id = @id`);

            var res = response.recordset[0]
            
                let idPrestamo = res.Id[0]
                res.Id = idPrestamo
                delete res.Clave
                delete res.Rol
            
            return res;
        
        
    }




    UpdatePrestamo = async (id, prestamo) => {

        var estado = ""
        var P = await this.GetPrestamoById(id);

        var objeto = await objetoService.GetObjetoById(P.FK_Objeto)
        console.log(prestamo.FechaEntregado)
        console.log(P.FechaEntregado)

        if (prestamo.FechaAceptado == null && P.FechaAceptado == null) {


            estado = "Pendiente"
        }
        else if (prestamo.FechaEntregado == null && P.FechaEntregado == null) {

            objeto.EnPrestamo = true
            estado = "Aceptado"
        }
        else if (prestamo.FechaDevuelto == null && P.FechaDevuelto == null) {

            objeto.EnPrestamo = true
            estado = "Entregado"
        }
        else {
            
            objeto.EnPrestamo = false
            estado = "Terminado"
        }
        //falta ver si el objeto esta roto

        await objetoService.UpdateObjeto(P.FK_Objeto, objeto)
        console.log(estado)

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, estado)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado ?? P.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado ?? P.FechaEntregado)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto ?? P.FechaDevuelto)

            .query(`UPDATE ${pTabla} SET Estado = @Estado, FechaAceptado = @FechaAceptado, FechaEntregado = @FechaEntregado, FechaDevuelto = @FechaDevuelto  WHERE id = @Id`);
        var q = await this.GetPrestamoById(id);
        console.log(q)
        return response.recordset;
    }

    DeletePrestamo = async (id) => {


        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);


        return response.recordset;
    }

    AddPrestamo = async (prestamo) => {
        const error = "Algun Atributo no fue enviado correctamente"
        const error01 = "El objeto no esta activo o se encuentra en un prestamo"
        let obj = await objetoService.GetObjetoById(prestamo.FK_Objeto)
        console.log(obj)
        if (!prestamo.FK_Objeto) {
            return error
        }
        if (obj.Activo == false || obj.EnPrestamo == true) {
            console.log(obj.Id)
            return error01
        }

        const timeElapsed = Date.now();
        const fecha = new Date(timeElapsed);
        fecha.toISOString()
        var objeto = { EnPrestamo: true }
        await objetoService.UpdateObjeto(prestamo.FK_Objeto, objeto)

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Estado', sql.NChar, "Pendiente")
            .input('FechaSolicitud', sql.Date, fecha)
            .input('FechaAceptado', sql.Date, null)
            .input('FechaEntregado', sql.Date, null)
            .input('FechaDevuelto', sql.Date, null)
            .input('Fk_Admin', sql.Int, prestamo.FK_Admin)
            .input('Fk_Objeto', sql.Int, prestamo.FK_Objeto)
            .input('Fk_Usuario', sql.Int, prestamo.FK_Usuario)

            .query(`INSERT INTO ${pTabla} (Estado , Fk_Objeto , FK_Usuario , FK_Admin , FechaSolicitud , FechaAceptado , FechaEntregado, FechaDevuelto) values (@Estado, @Fk_Objeto,@FK_Usuario, @FK_Admin,@FechaSolicitud, @FechaAceptado,@FechaEntregado, @FechaDevuelto)`);
        
            
            return response.recordset;
    }
}