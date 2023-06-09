USE [master]
GO
/****** Object:  Database [SistemaInternoOrt]    Script Date: 29/5/2023 09:50:18 ******/
CREATE DATABASE [SistemaInternoOrt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SistemaInternoOrt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SistemaInternoOrt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SistemaInternoOrt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SistemaInternoOrt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
EXEC sys.sp_db_vardecimal_storage_format N'SistemaInternoOrt', N'ON'
GO
ALTER DATABASE [SistemaInternoOrt] SET QUERY_STORE = OFF
GO
USE [SistemaInternoOrt]
GO
/****** Object:  User [PF]    Script Date: 29/5/2023 09:50:18 ******/
CREATE USER [PF] FOR LOGIN [PF] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 29/5/2023 09:50:18 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [PF]
GO
/****** Object:  Table [dbo].[Categoría]    Script Date: 29/5/2023 09:50:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoría](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categoría] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Objeto]    Script Date: 29/5/2023 09:50:18 ******/
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
 CONSTRAINT [PK_Objeto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ObjetoReporte]    Script Date: 29/5/2023 09:50:18 ******/
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
/****** Object:  Table [dbo].[Prestamo]    Script Date: 29/5/2023 09:50:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestamo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[FK_Objeto] [int] NOT NULL,
	[Fk_Usuario] [int] NOT NULL,
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
/****** Object:  Table [dbo].[Reporte]    Script Date: 29/5/2023 09:50:18 ******/
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
/****** Object:  Table [dbo].[Usuario]    Script Date: 29/5/2023 09:50:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [bit] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Objeto]  WITH CHECK ADD  CONSTRAINT [FK_Objeto_Categoría] FOREIGN KEY([Fk_Categoria])
REFERENCES [dbo].[Categoría] ([Id])
GO
ALTER TABLE [dbo].[Objeto] CHECK CONSTRAINT [FK_Objeto_Categoría]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Objeto] FOREIGN KEY([FK_Objeto])
REFERENCES [dbo].[Objeto] ([Id])
GO
ALTER TABLE [dbo].[Prestamo] CHECK CONSTRAINT [FK_Prestamo_Objeto]
GO
ALTER TABLE [dbo].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_Prestamo_Usuario] FOREIGN KEY([Fk_Usuario])
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
