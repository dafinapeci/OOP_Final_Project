CREATE DATABASE LeSpotify;

USE LeSpotify;

CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE songs (
    id INT IDENTITY PRIMARY KEY,
    songName VARCHAR(100),
    artistName VARCHAR(100),
    time FLOAT,
    filePath VARCHAR(255)
);
