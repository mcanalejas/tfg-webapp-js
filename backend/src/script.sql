-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db_fenlalista
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `alumnoID` int NOT NULL AUTO_INCREMENT,
  `nombreAlumno` varchar(255) NOT NULL,
  `apellidosAlumno` varchar(255) NOT NULL,
  `correoAlumno` varchar(255) NOT NULL,
  `passwordHashedAlumno` varchar(255) NOT NULL,
  `dniAlumno` varchar(255) NOT NULL,
  PRIMARY KEY (`alumnoID`),
  UNIQUE KEY `correoAlumno` (`correoAlumno`),
  UNIQUE KEY `dniAlumno` (`dniAlumno`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,'Pepito','Lopez','test1@test.com','password','A1'),(2,'Jaime','Rodriguez','test2@gmail.com','password','A2'),(3,'Jose','Lopez','test3@gmail.com','password','A3'),(4,'Roberto','Martinez','test4@gmail.com','password','A4'),(5,'Manuel','Lopez','test5@gmail.com','password','A5'),(6,'Javier','Ramirez','test6@gmail.com','password','A6'),(23,'Miguel','Canalejas de la Cruz','miguel@test.com','$2b$10$XpPHOn73B4MrMNyv1m6kves7c9keuk42K8BF477adiMPVz69.oADe','12345678K'),(35,'Pepe','Martinez','pepe@gmail.com','$2b$10$CLAZxjK1XYmNgW3IJ1EVbOAlY.lgq8ZRSQQBGgZWTIgRNd3pkD3SK','test');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno_curso`
--

DROP TABLE IF EXISTS `alumno_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno_curso` (
  `alumno_cursoID` int NOT NULL AUTO_INCREMENT,
  `alumnoID` int NOT NULL,
  `cursoID` int NOT NULL,
  `temporada` varchar(255) NOT NULL,
  PRIMARY KEY (`alumnoID`,`temporada`),
  UNIQUE KEY `alumno_cursoID` (`alumno_cursoID`),
  KEY `alumno_curso_fk1` (`cursoID`),
  CONSTRAINT `alumno_curso_fk0` FOREIGN KEY (`alumnoID`) REFERENCES `alumno` (`alumnoID`) ON DELETE CASCADE,
  CONSTRAINT `alumno_curso_fk1` FOREIGN KEY (`cursoID`) REFERENCES `curso` (`cursoID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno_curso`
--

LOCK TABLES `alumno_curso` WRITE;
/*!40000 ALTER TABLE `alumno_curso` DISABLE KEYS */;
INSERT INTO `alumno_curso` VALUES (1,1,1,'19/20'),(2,2,1,'19/20'),(3,3,1,'19/20'),(4,4,2,'19/20'),(5,5,2,'19/20'),(6,6,2,'19/20'),(11,23,2,'19/20'),(13,35,2,'19/20');
/*!40000 ALTER TABLE `alumno_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura` (
  `asignaturaID` int NOT NULL AUTO_INCREMENT,
  `nombreAsignatura` varchar(255) NOT NULL,
  `horas` int NOT NULL,
  PRIMARY KEY (`asignaturaID`),
  UNIQUE KEY `nombreAsignatura` (`nombreAsignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (1,'PYTHON',300),(2,'FOL',300),(3,'PROGRAMACION',300),(4,'ENTORNOS DE DESARROLLO',300),(5,'BASE DE DATOS',300),(6,'LENGUAJE DE MARCAS',300),(7,'SISTEMAS INFORMATICOS',300),(8,'PROGRAMACION DE SERVICIOS',300),(9,'EMPRESA',300),(10,'DESARROLLO DE INTERFACES',300),(11,'SISTEMAS DE GESTION EMPRESARIAL',300),(12,'ANDROID',300),(13,'ACCESO A DATOS',300),(14,'INGLES',300);
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clase` (
  `claseID` int NOT NULL AUTO_INCREMENT,
  `cursoID` int NOT NULL,
  `profesorID` int NOT NULL,
  `asignaturaID` int NOT NULL,
  `diaSemana` int NOT NULL,
  `horaSemana` int NOT NULL,
  PRIMARY KEY (`cursoID`,`profesorID`,`asignaturaID`,`diaSemana`,`horaSemana`),
  UNIQUE KEY `claseID` (`claseID`),
  KEY `clase_fk1` (`profesorID`),
  KEY `clase_fk2` (`asignaturaID`),
  CONSTRAINT `clase_fk0` FOREIGN KEY (`cursoID`) REFERENCES `curso` (`cursoID`),
  CONSTRAINT `clase_fk1` FOREIGN KEY (`profesorID`) REFERENCES `profesor` (`profesorID`),
  CONSTRAINT `clase_fk2` FOREIGN KEY (`asignaturaID`) REFERENCES `asignatura` (`asignaturaID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clase`
--

LOCK TABLES `clase` WRITE;
/*!40000 ALTER TABLE `clase` DISABLE KEYS */;
INSERT INTO `clase` VALUES (1,2,15,11,1,1),(2,2,15,11,1,2),(3,2,15,11,1,3),(4,2,15,10,1,4),(5,2,2,9,1,5),(6,2,4,14,1,6),(7,2,6,12,2,1),(8,2,6,12,2,2),(9,2,3,13,2,3),(10,2,3,13,2,4),(11,2,3,13,2,5),(12,2,2,9,2,6),(13,2,15,10,3,1),(14,2,15,10,3,2),(15,2,15,10,3,3),(16,2,3,13,3,4),(17,2,3,13,3,5),(18,2,3,13,3,6),(19,2,15,10,4,1),(20,2,15,10,4,2),(21,2,4,14,4,3),(22,2,18,8,4,4),(23,2,18,8,4,5),(24,2,2,9,4,6),(25,2,18,8,5,1),(26,2,18,8,5,2),(27,2,6,12,5,3),(28,2,6,12,5,4),(29,2,15,11,5,5),(30,2,15,11,5,6);
/*!40000 ALTER TABLE `clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `cursoID` int NOT NULL AUTO_INCREMENT,
  `nombreCurso` varchar(255) NOT NULL,
  PRIMARY KEY (`cursoID`),
  UNIQUE KEY `nombreCurso` (`nombreCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'1DAM'),(2,'2DAM');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `falta`
--

DROP TABLE IF EXISTS `falta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `falta` (
  `faltaID` int NOT NULL AUTO_INCREMENT,
  `alumnoID` int NOT NULL,
  `claseID` int NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`alumnoID`,`claseID`,`fecha`),
  UNIQUE KEY `faltaID` (`faltaID`),
  KEY `falta_fk1` (`claseID`),
  CONSTRAINT `falta_fk0` FOREIGN KEY (`alumnoID`) REFERENCES `alumno` (`alumnoID`),
  CONSTRAINT `falta_fk1` FOREIGN KEY (`claseID`) REFERENCES `clase` (`claseID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `falta`
--

LOCK TABLES `falta` WRITE;
/*!40000 ALTER TABLE `falta` DISABLE KEYS */;
INSERT INTO `falta` VALUES (15,23,1,'2020-11-13 15:23:34'),(16,23,30,'2020-11-13 15:44:22'),(17,6,30,'2020-11-13 15:45:07'),(18,23,30,'2020-11-13 15:45:07'),(19,5,30,'2020-11-13 15:45:07'),(20,4,1,'2020-11-13 17:41:35'),(21,23,1,'2020-11-13 17:41:35'),(22,23,2,'2020-11-19 17:18:49'),(23,23,2,'2020-11-19 17:19:13'),(24,23,13,'2020-11-19 17:20:22'),(25,23,19,'2020-11-19 18:04:06'),(26,23,15,'2020-11-19 18:36:31'),(27,23,15,'2020-11-19 18:37:00'),(28,23,19,'2020-11-20 12:55:23'),(29,23,1,'2020-12-01 13:50:33'),(30,35,1,'2020-12-02 12:59:10'),(31,23,22,'2020-12-02 13:07:18'),(32,23,22,'2020-12-10 23:08:52'),(33,23,22,'2020-12-10 23:09:34');
/*!40000 ALTER TABLE `falta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `profesorID` int NOT NULL AUTO_INCREMENT,
  `nombreProfesor` varchar(255) NOT NULL,
  `apellidosProfesor` varchar(255) NOT NULL,
  `correoProfesor` varchar(255) NOT NULL,
  `passwordHashedProfesor` varchar(255) NOT NULL,
  `dniProfesor` varchar(255) NOT NULL,
  `telefonoProfesor` varchar(255) NOT NULL,
  `isAdmin` tinyint DEFAULT '0',
  PRIMARY KEY (`profesorID`),
  UNIQUE KEY `correoProfesor` (`correoProfesor`),
  UNIQUE KEY `dniProfesor` (`dniProfesor`),
  UNIQUE KEY `telefonoProfesor` (`telefonoProfesor`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Hector','Estrela','hector2@gmail.com','password','P1','61',0),(2,'Jose Maria','Martinez','josemaria@gmail.com','password','P2','62',0),(3,'Carlos','Gonzalez','carlos@gmail.com','password','P3','63',0),(4,'Ana','Diaz','ana@gmail.com','password','P4','64',0),(5,'Luis','Izquierdo','luis1@gmail.com','password','P5','65',0),(6,'Laura','Garcia','laura@gmail.com','password','P6','66',0),(7,'Administrador','Admin','migueladmin@gmail.com','admin_password','P7','67',1),(15,'Hector','Estrela','hector@gmail.com','$2b$10$VEiJ1qJfZAwSM5hdbgFDA.l/EwzosUv1YMEIMkWAeKehfPVm91hvu','P8','68',0),(18,'Luis','Izquierdo','luis@gmail.com','$2b$10$ksQC9kyJAtMRAiWpV44TneUAsMav4oC8cRcAWmq1rK.fbeutGWECa','69','69',0);
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-10 23:29:41
