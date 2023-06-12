-- Insertar datos en la tabla "Categor�a"
INSERT INTO dbo.Categor�a (Nombre)
VALUES ('Categor�a 1'),
       ('Categor�a 2'),
       ('Categor�a 3');

-- Insertar datos en la tabla "Objeto"
INSERT INTO dbo.Objeto (Nombre, Estado, EnPrestamo, Fk_Categoria)
VALUES ('Objeto 1', 'Disponible', 0, 1),
       ('Objeto 2', 'Disponible', 0, 2),
       ('Objeto 3', 'Prestado', 1, 3),
       ('Objeto 4', 'Disponible', 0, 1),
       ('Objeto 5', 'Disponible', 0, 2),
       ('Objeto 6', 'Prestado', 1, 3),
       ('Objeto 7', 'Disponible', 0, 1),
       ('Objeto 8', 'Disponible', 0, 2),
       ('Objeto 9', 'Prestado', 1, 3),
       ('Objeto 10', 'Disponible', 0, 1);

-- Insertar datos en la tabla "Usuario"
INSERT INTO dbo.Usuario (Rol, Nombre, Apellido)
VALUES (1, 'Usuario 1', 'Apellido 1'),
       (0, 'Usuario 2', 'Apellido 2'),
       (0, 'Usuario 3', 'Apellido 3'),
       (1, 'Usuario 4', 'Apellido 4'),
       (0, 'Usuario 5', 'Apellido 5');

-- Insertar datos en la tabla "ObjetoReporte"
INSERT INTO dbo.ObjetoReporte (Estado, Labo, Fila, Columna, Lado)
VALUES ('Buen estado', 'Laboratorio 1', 1, 2, 'Izquierdo'),
       ('Da�ado', 'Laboratorio 2', 3, 1, 'Derecho'),
       ('Buen estado', 'Laboratorio 1', 2, 3, 'Izquierdo'),
       ('Da�ado', 'Laboratorio 2', 2, 2, 'Derecho'),
       ('Buen estado', 'Laboratorio 1', 1, 1, 'Izquierdo'),
       ('Da�ado', 'Laboratorio 2', 3, 3, 'Derecho'),
       ('Buen estado', 'Laboratorio 1', 2, 2, 'Izquierdo'),
       ('Da�ado', 'Laboratorio 2', 1, 3, 'Derecho'),
       ('Buen estado', 'Laboratorio 1', 1, 3, 'Izquierdo'),
       ('Da�ado', 'Laboratorio 2', 2, 1, 'Derecho');

-- Insertar datos en la tabla "Prestamo"
INSERT INTO dbo.Prestamo (Estado, FK_Objeto, Fk_Usuario, FechaSolicitud, FechaAceptado, FechaEntregado, FechaDevuelto, FK_Admin)
VALUES ('Pendiente', 1, 1, '2023-06-01', NULL, NULL, NULL, 1),
       ('Aceptado', 2, 2, '2023-06-02', '2023-06-02', '2023-06-03', NULL, 2),
       ('Entregado', 3, 3, '2023-06-03', '2023-06-03', '2023-06-04', NULL, 3),
       ('Devuelto', 4, 4, '2023-06-04', '2023-06-04', '2023-06-05', '2023-06-06', 4),
       ('Pendiente', 5, 5, '2023-06-05', NULL, NULL, NULL, 5),
       ('Aceptado', 6, 1, '2023-06-06', '2023-06-06', '2023-06-07', NULL, 1),
       ('Entregado', 7, 2, '2023-06-07', '2023-06-07', '2023-06-08', NULL, 2),
       ('Devuelto', 8, 3, '2023-06-08', '2023-06-08', '2023-06-09', '2023-06-10', 3),
       ('Pendiente', 9, 4, '2023-06-09', NULL, NULL, NULL, 4),
       ('Aceptado', 10, 5, '2023-06-10', '2023-06-10', '2023-06-11', NULL, 5);

-- Insertar datos en la tabla "Reporte"
INSERT INTO dbo.Reporte (Estado, Fk_Usuario, Fk_ObjetoReporte, Descripcion)
VALUES ('Pendiente', 1, 1, 'Se rompi� el objeto A'),
       ('Abierto', 2, 2, 'Se rompi� el objeto B'),
       ('Resuelto', 1, 3, 'Se repar� el objeto C'),
       ('Pendiente', 3, 4, 'Se rompi� el objeto D'),
       ('Abierto', 2, 5, 'Se rompi� el objeto E'),
       ('Resuelto', 1, 1, 'Se repar� el objeto A'),
       ('Pendiente', 2, 3, 'Se rompi� el objeto C'),
       ('Abierto', 3, 2, 'Se rompi� el objeto B'),
       ('Resuelto', 1, 5, 'Se repar� el objeto E'),
       ('Pendiente', 3, 4, 'Se rompi� el objeto D');
