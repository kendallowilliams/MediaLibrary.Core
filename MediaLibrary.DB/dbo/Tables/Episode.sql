﻿CREATE TABLE [dbo].[Episode]
(
	[Id] INT IDENTITY(1,1) NOT NULL , 
    [Title] NVARCHAR(256) NOT NULL, 
    [SeriesId] INT NOT NULL, 
    [Season] INT NULL, 
	[Path] VARCHAR(256) NOT NULL,
	[PlayCount] INT  DEFAULT (0) NOT NULL,
    [Progress]    INT DEFAULT (0) NOT NULL,
    [LastPlayedDate] DATETIME2      NULL,
    [CreateDate] DATETIME2      DEFAULT (getdate()) NOT NULL,
    [ModifyDate] DATETIME2      DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Episode] PRIMARY KEY ([Id]),
    FOREIGN KEY ([SeriesId]) REFERENCES [dbo].[Series] ([Id]) ON DELETE CASCADE,
)
