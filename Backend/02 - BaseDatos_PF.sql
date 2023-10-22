USE [master]
GO
/****** Object:  Database [SistemaInternoOrt]    Script Date: 22/10/2023 20:54:06 ******/
CREATE DATABASE [SistemaInternoOrt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SistemaInternoOrt', FILENAME = N'C:\Fede\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SistemaInternoOrt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SistemaInternoOrt_log', FILENAME = N'C:\Fede\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SistemaInternoOrt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SistemaInternoOrt] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SistemaInternoOrt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ARITHABORT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SistemaInternoOrt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SistemaInternoOrt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SistemaInternoOrt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SistemaInternoOrt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET RECOVERY FULL 
GO
ALTER DATABASE [SistemaInternoOrt] SET  MULTI_USER 
GO
ALTER DATABASE [SistemaInternoOrt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SistemaInternoOrt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SistemaInternoOrt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SistemaInternoOrt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SistemaInternoOrt] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SistemaInternoOrt] SET QUERY_STORE = OFF
GO
USE [SistemaInternoOrt]
GO
/****** Object:  User [PF]    Script Date: 22/10/2023 20:54:07 ******/
CREATE USER [PF] FOR LOGIN [PF] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [PF]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Objeto]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Objeto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[EnPrestamo] [bit] NOT NULL,
	[Fk_Categoria] [int] NOT NULL,
	[Activo] [bit] NULL,
 CONSTRAINT [PK_Objeto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ObjetoReporte]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ObjetoReporte](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[Labo] [varchar](50) NOT NULL,
	[Fila] [int] NOT NULL,
	[Columna] [int] NOT NULL,
	[Lado] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ObjetoReporte] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prestamo]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestamo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[FK_Objeto] [int] NOT NULL,
	[FK_Usuario] [int] NOT NULL,
	[FechaSolicitud] [date] NOT NULL,
	[FechaAceptado] [date] NULL,
	[FechaEntregado] [date] NULL,
	[FechaDevuelto] [date] NULL,
	[FK_Admin] [int] NOT NULL,
 CONSTRAINT [PK_Prestamo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reporte]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reporte](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[Fk_Usuario] [int] NOT NULL,
	[Fk_ObjetoReporte] [int] NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Reporte] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 22/10/2023 20:54:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [bit] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Dni] [int] NOT NULL,
	[Clave] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (1, N'Categoria 1')
INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (2, N'Categoria 2')
INSERT [dbo].[Categoria] ([Id], [Nombre]) VALUES (3, N'Categoria 3')
SET IDENTITY_INSERT [dbo].[Categoria] OFF
GO
SET IDENTITY_INSERT [dbo].[Objeto] ON 

INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (1, N'Objeto 1', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (2, N'Objeto 2', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (3, N'Objeto 3', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (4, N'Objeto 4', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (5, N'Objeto 5', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (6, N'Objeto 6', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (7, N'Objeto 7', N'Disponible', 0, 1, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (8, N'Objeto 8', N'Disponible', 0, 2, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (9, N'Objeto 9', N'Prestado', 1, 3, NULL)
INSERT [dbo].[Objeto] ([Id], [Nombre], [Estado], [EnPrestamo], [Fk_Categoria], [Activo]) VALUES (10, N'Objeto 10', N'Disponible', 0, 1, NULL)
SET IDENTITY_INSERT [dbo].[Objeto] OFF
GO
SET IDENTITY_INSERT [dbo].[ObjetoReporte] ON 

INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (1, N'Buen estado', N'Laboratorio 1', 1, 2, N'Izquierdo')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (2, N'Daiado', N'Laboratorio 2', 3, 1, N'Derecho')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (3, N'Buen estado', N'Laboratorio 1', 2, 3, N'Izquierdo')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (4, N'Dañado', N'Laboratorio 2', 2, 2, N'Derecho')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (5, N'Buen estado', N'Laboratorio 1', 1, 1, N'Izquierdo')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (6, N'Dañado', N'Laboratorio 2', 3, 3, N'Derecho')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (7, N'Buen estado', N'Laboratorio 1', 2, 2, N'Izquierdo')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (8, N'Dañado', N'Laboratorio 2', 1, 3, N'Derecho')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (9, N'Buen estado', N'Laboratorio 1', 1, 3, N'Izquierdo')
INSERT [dbo].[ObjetoReporte] ([Id], [Estado], [Labo], [Fila], [Columna], [Lado]) VALUES (10, N'Dañado', N'Laboratorio 2', 2, 1, N'Derecho')
SET IDENTITY_INSERT [dbo].[ObjetoReporte] OFF
GO
SET IDENTITY_INSERT [dbo].[Prestamo] ON 

INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (1, N'Pendiente', 1, 1, CAST(N'2023-06-01' AS Date), NULL, NULL, NULL, 1)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (2, N'Aceptado', 2, 2, CAST(N'2023-06-02' AS Date), CAST(N'2023-06-02' AS Date), CAST(N'2023-06-03' AS Date), NULL, 2)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (3, N'Entregado', 3, 3, CAST(N'2023-06-03' AS Date), CAST(N'2023-06-03' AS Date), CAST(N'2023-06-04' AS Date), NULL, 3)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (4, N'Devuelto', 4, 4, CAST(N'2023-06-04' AS Date), CAST(N'2023-06-04' AS Date), CAST(N'2023-06-05' AS Date), CAST(N'2023-06-06' AS Date), 4)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (5, N'Pendiente', 5, 5, CAST(N'2023-06-05' AS Date), NULL, NULL, NULL, 5)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (6, N'Aceptado', 6, 1, CAST(N'2023-06-06' AS Date), CAST(N'2023-06-06' AS Date), CAST(N'2023-06-07' AS Date), NULL, 1)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (7, N'Entregado', 7, 2, CAST(N'2023-06-07' AS Date), CAST(N'2023-06-07' AS Date), CAST(N'2023-06-08' AS Date), NULL, 2)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (8, N'Devuelto', 8, 3, CAST(N'2023-06-08' AS Date), CAST(N'2023-06-08' AS Date), CAST(N'2023-06-09' AS Date), CAST(N'2023-06-10' AS Date), 3)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (9, N'Pendiente', 9, 4, CAST(N'2023-06-09' AS Date), NULL, NULL, NULL, 4)
INSERT [dbo].[Prestamo] ([Id], [Estado], [FK_Objeto], [FK_Usuario], [FechaSolicitud], [FechaAceptado], [FechaEntregado], [FechaDevuelto], [FK_Admin]) VALUES (10, N'Aceptado', 10, 5, CAST(N'2023-06-10' AS Date), CAST(N'2023-06-10' AS Date), CAST(N'2023-06-11' AS Date), NULL, 5)
SET IDENTITY_INSERT [dbo].[Prestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[Reporte] ON 

INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (1, N'Pendiente', 1, 1, N'Se rompio el objeto A')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (2, N'Abierto', 2, 2, N'Se rompio el objeto B')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (3, N'Resuelto', 1, 3, N'Se reparo el objeto C')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (4, N'Pendiente', 3, 4, N'Se rompio el objeto D')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (5, N'Abierto', 2, 5, N'Se rompio el objeto E')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (6, N'Resuelto', 1, 1, N'Se reparo el objeto A')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (7, N'Pendiente', 2, 3, N'Se rompio el objeto C')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (8, N'Abierto', 3, 2, N'Se rompio el objeto B')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (9, N'Resuelto', 1, 5, N'Se reparo el objeto E')
INSERT [dbo].[Reporte] ([Id], [Estado], [Fk_Usuario], [Fk_ObjetoReporte], [Descripcion]) VALUES (10, N'Pendiente', 3, 4, N'Se rompio el objeto D')
SET IDENTITY_INSERT [dbo].[Reporte] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (1, 1, N'Usuario 1', N'Apellido 1', 4654654, N'hola')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (2, 0, N'Usuario 2', N'Apellido 2', 5465465, N'1234')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (3, 0, N'Usuario 3', N'Apellido 3', 476875, N'5678')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (4, 1, N'Usuario 4', N'Apellido 4', 4643435, N'fede')
INSERT [dbo].[Usuario] ([Id], [Rol], [Nombre], [Apellido], [Dni], [Clave]) VALUES (5, 0, N'Usuario 5', N'Apellido 5', 6787686, N'fede')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Objeto]  WITH CHECK ADD  CONSTRAINT [FK_Objeto_Categoria] FOREIGN KEY([Fk_Categoria])
REFERENCES [dbo].[Categoria] ([Id])
GO
ALTER TABLE [dbo].[Objeto] CHECK CONSTRAINT [FK_Objeto_Categoria]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Objeto] FOREIGN KEY([FK_Objeto])
REFERENCES [dbo].[Objeto] ([Id])
GO
ALTER TABLE [dbo].[Prestamo] CHECK CONSTRAINT [FK_Prestamo_Objeto]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Usuario] FOREIGN KEY([FK_Usuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Prestamo] CHECK CONSTRAINT [FK_Prestamo_Usuario]
GO
ALTER TABLE [dbo].[Reporte]  WITH CHECK ADD  CONSTRAINT [FK_Reporte_ObjetoReporte] FOREIGN KEY([Fk_ObjetoReporte])
REFERENCES [dbo].[ObjetoReporte] ([Id])
GO
ALTER TABLE [dbo].[Reporte] CHECK CONSTRAINT [FK_Reporte_ObjetoReporte]
GO
ALTER TABLE [dbo].[Reporte]  WITH CHECK ADD  CONSTRAINT [FK_Reporte_Usuario] FOREIGN KEY([Fk_Usuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Reporte] CHECK CONSTRAINT [FK_Reporte_Usuario]
GO
USE [master]
GO
ALTER DATABASE [SistemaInternoOrt] SET  READ_WRITE 
GO
