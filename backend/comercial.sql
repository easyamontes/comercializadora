CREATE DATABASE IF NOT EXISTS comercilizadora;
USE comercilizadora;

CREATE TABLE users(
    id INT(255) auto_increment NOT NULL,
    email VARCHAR(255),
    role VARCHAR(20),
    name VARCHAR(255),
    surname VARCHAR(255),
    password VARCHAR(255),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    remember_token VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE articulo(
    id INT(255) auto_increment NOT NULL,
    user_id INT not null,
    nombre VARCHAR(255),
    marca VARCHAR(255),
    modelo VARCHAR(255),
    codigo VARCHAR(255),
    descripcion text,
    status VARCHAR(30),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_articulo PRIMARY KEY(id),
    CONSTRAINT fk_articulo_users FOREIGN KEY(user_id) REFERENCES users(id)
)ENGINE=InnoDb;

CREATE TABLE puesto(
    id INT(255) auto_increment NOT NULL,
    user_id INT not null,
    puesto VARCHAR(255),
    nivel INT(40),
    descripcion text,
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_articulo PRIMARY KEY(id),
    CONSTRAINT fk_puesto_users FOREIGN KEY(user_id) REFERENCES users(id)
)ENGINE=InnoDb;

CREATE TABLE oficina(
    id INT(255) auto_increment NOT NULL,
    user_id INT not null,
    personal_id INT not null,
    nombre VARCHAR(255),
    encargado INT(40),
    descripcion text,
    calle VARCHAR(255),
    noint VARCHAR(255),
    noext VARCHAR(255),
    colonia VARCHAR(255),
    estado VARCHAR(255),
    ciudad VARCHAR(255),
    cp VARCHAR(50),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_articulo PRIMARY KEY(id),
    CONSTRAINT fk_oficina_users FOREIGN KEY(user_id) REFERENCES users(id)
)ENGINE=InnoDb;

CREATE TABLE personal(
    id INT(255) auto_increment NOT NULL,
    user_id INT not null,
    puesto_id INT not null,
    nombre VARCHAR(255),
    apellidop VARCHAR(255),
    apellidom VARCHAR(255),
    calle VARCHAR(255),
    noint VARCHAR(255),
    noext VARCHAR(255),
    colonia VARCHAR(255),
    estado VARCHAR(255),
    ciudad VARCHAR(255),
    cp VARCHAR(50),
    descripcion text,
    status VARCHAR(30),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_personal PRIMARY KEY(id),
    CONSTRAINT fk_personal_users FOREIGN KEY(user_id) REFERENCES users(id),
)ENGINE=InnoDb;