-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-01-2019 a las 00:21:26
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comercilizadora`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

DROP TABLE IF EXISTS `articulo`;
CREATE TABLE IF NOT EXISTS `articulo` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `status` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articulo_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficina`
--

DROP TABLE IF EXISTS `oficina`;
CREATE TABLE IF NOT EXISTS `oficina` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `personal_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `encargado` int(40) DEFAULT NULL,
  `descripcion` text,
  `calle` varchar(255) DEFAULT NULL,
  `noint` varchar(255) DEFAULT NULL,
  `noext` varchar(255) DEFAULT NULL,
  `colonia` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `cp` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_oficina_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE IF NOT EXISTS `personal` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `puesto_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidop` varchar(255) DEFAULT NULL,
  `apellidom` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `calle` varchar(255) DEFAULT NULL,
  `noint` varchar(255) DEFAULT NULL,
  `noext` varchar(255) DEFAULT NULL,
  `colonia` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `cp` varchar(50) DEFAULT NULL,
  `descripcion` text,
  `status` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personal_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id`, `user_id`, `puesto_id`, `nombre`, `apellidop`, `apellidom`, `email`, `calle`, `noint`, `noext`, `colonia`, `estado`, `ciudad`, `cp`, `descripcion`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 'Norma', 'Iñiguez', 'Iñiguez', 'niniguez@easyload.mx', 'Jose Maria Heredia', '2933', '', 'prados providencia', 'Jalisco', 'Guadalajara', '44670', 'varias notas', 'ACTIVO', '2019-01-06 19:20:32', '2019-01-06 19:20:32'),
(2, 1, 0, 'Arturo de jesus', 'Montes', 'Hinojosa', 'amontes@easyload.mx', 'Golondrina', '1503', '', 'Morelos', 'Jalisco', 'Guadalajara', '44910', 'programador de buen corazon', 'ACTIVO', '2019-01-07 15:11:51', '2019-01-07 15:11:51'),
(3, 2, 0, 'hector', 'Villa', 'Tapia', 'hvilla@easyload.mx', 'Jose Maria Heredia ', '2933', '', 'prados providencia', 'Jalisco', 'Guadalajara', '44670', 'etitor', 'ACTIVO', '2019-01-07 23:46:59', '2019-01-07 23:46:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

DROP TABLE IF EXISTS `puesto`;
CREATE TABLE IF NOT EXISTS `puesto` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `nivel` int(40) DEFAULT NULL,
  `descripcion` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_puesto_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `puesto`
--

INSERT INTO `puesto` (`id`, `user_id`, `puesto`, `nivel`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 1, 'VICEPRESIDENTE EJECUTIVO', 1, 'Es el mero perron\npero el mero mero \nsabor ranchero\nes que no se si hace la deferencia según el texto', '2018-12-21 16:03:35', '2018-12-21 16:03:35'),
(3, 1, 'VICEPRESIDENTE', 2, 'El segundo al mando', '2019-01-02 22:58:50', '2019-01-02 22:58:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `role`, `name`, `surname`, `password`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'amontes@easyload.mx', 'ROLE_USER', 'Arturo', 'Montes', 'c415b39ec1a02d6fcc67e8a9511408175e49d5e558d23337545daec637aef607', '2018-12-20 18:23:10', '2018-12-20 18:23:10', NULL),
(2, 'niniguez@easyload.mx', 'ROLE_USER', 'Norma', 'Iñiguez', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2019-01-07 23:45:32', '2019-01-07 23:45:32', NULL),
(3, 'hvilla@easyload.mx', 'ROLE_USER', 'hector', 'Villa', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2019-01-07 23:47:37', '2019-01-07 23:47:37', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `fk_articulo_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD CONSTRAINT `fk_oficina_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `fk_personal_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD CONSTRAINT `fk_puesto_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
