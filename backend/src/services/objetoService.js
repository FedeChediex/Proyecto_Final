import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const oTabla = process.env.DB_TABLA_OBJETO;

export class ObjetoService {

    GetObjeto = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${oTabla}`);
        console.log(response)

        return response.recordset;
    }

    GetObjetoById = async (id) => {

        console.log('This is a function on the service', id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${oTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    UpdateObjeto = async (id, objeto) => {
        console.log('This is a function on the service');
        let activo
        if (objeto.Estado != undefined || objeto.Estado != null) {
            objeto.Estado = O.Estado
            if (objeto.Estado == "Disponible") {
                activo = true
            }
            else {
                activo = false
            }
        }
        var O = await this.GetObjetoById(id);
        console.log(O.Nombre)
        console.log(objeto.Nombre)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.NChar, objeto?.Nombre ?? O.Nombre)
            .input('Estado', sql.NChar, objeto.Estado)
            .input('EnPrestamo', sql.Bit, objeto?.EnPrestamo ?? O.EnPrestamo)
            .input('FK_Categoria', sql.Int, objeto?.fk_Categoria ?? O.Fk_Categoria)
            .input('Activo', sql.Bit, activo ?? O.Activo)

            .query(`UPDATE ${oTabla} SET Nombre = @Nombre, Estado = @Estado, EnPrestamo = @EnPrestamo, Fk_Categoria = @Fk_Categoria, Activo = @Activo  WHERE id = @Id`);


        return response.recordset;
    }

    DeleteObjeto = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`UPDATE ${oTabla} SET Activo = 0  WHERE id = @Id`);


        return response.recordset;
    }

    AddObjeto = async (objeto) => {
        var error = "Algun Atributo no fue enviado"
        let activo
        console.log(objeto.Estado + objeto.Nombre + objeto.EnPrestamo + objeto.FK_Categoria)
        if (!objeto.Estado || !objeto.Nombre || objeto.EnPrestamo == null || objeto.EnPrestamo == undefined || !objeto.FK_Categoria) {
            return error
        }
        if (objeto.Estado == "Disponible") {
            activo = true
        }
        else {
            activo = false
        }

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Nombre', sql.NChar, objeto.Nombre)
            .input('Estado', sql.NChar, objeto.Estado)
            .input('EnPrestamo', sql.Bit, objeto.EnPrestamo)
            .input('Fk_Categoria', sql.Int, objeto.FK_Categoria)
            .input('Activo', sql.Bit, activo)

            .query(`INSERT INTO ${oTabla} (Nombre , Estado , EnPrestamo , FK_Categoria, Activo) values (@Nombre, @Estado, @EnPrestamo, @FK_Categoria, @Activo)`);
        return response.recordset;
    }
}
