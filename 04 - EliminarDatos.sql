-- Eliminar todos los datos de la tabla "Reporte" y reiniciar el Id
DELETE FROM dbo.Reporte;
DBCC CHECKIDENT('dbo.Reporte', RESEED, 0);

-- Eliminar todos los datos de la tabla "Prestamo" y reiniciar el Id
DELETE FROM dbo.Prestamo;
DBCC CHECKIDENT('dbo.Prestamo', RESEED, 0);

-- Eliminar todos los datos de la tabla "ObjetoReporte" y reiniciar el Id
DELETE FROM dbo.ObjetoReporte;
DBCC CHECKIDENT('dbo.ObjetoReporte', RESEED, 0);

-- Eliminar todos los datos de la tabla "Objeto" y reiniciar el Id
DELETE FROM dbo.Objeto;
DBCC CHECKIDENT('dbo.Objeto', RESEED, 0);

-- Eliminar todos los datos de la tabla "Categoria" y reiniciar el Id
DELETE FROM dbo.Categoria;
DBCC CHECKIDENT('dbo.Categoria', RESEED, 0);

-- Eliminar todos los datos de la tabla "Usuario" y reiniciar el Id
DELETE FROM dbo.Usuario;
DBCC CHECKIDENT('dbo.Usuario', RESEED, 0);