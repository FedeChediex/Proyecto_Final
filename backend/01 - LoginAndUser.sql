USE [master]
GO
CREATE LOGIN [PF] WITH PASSWORD=N'quseyomostro', DEFAULT_DATABASE=[SistemaInternoOrt], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [SistemaInternoOrt]
GO
CREATE USER [PF] FOR LOGIN [PF]
GO
USE [SistemaInternoOrt]
GO
ALTER ROLE [db_owner] ADD MEMBER [PF]
GO