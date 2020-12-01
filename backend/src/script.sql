DROP DATABASE db_fenlalista;

CREATE DATABASE db_fenlalista;

USE db_fenlalista;

CREATE TABLE `alumno` (
    `alumnoID` INT NOT NULL AUTO_INCREMENT,
    `nombreAlumno` varchar(255) NOT NULL,
    `apellidosAlumno` varchar(255) NOT NULL,
    `correoAlumno` varchar(255) NOT NULL UNIQUE,
    `passwordHashedAlumno` varchar(255) NOT NULL,
    `dniAlumno` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`alumnoID`)
);

CREATE TABLE `curso` (
    `cursoID` INT NOT NULL AUTO_INCREMENT,
    `nombreCurso` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`cursoID`)
);

CREATE TABLE `alumno_curso` (
    `alumno_cursoID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `alumnoID` INT NOT NULL,
    `cursoID` INT NOT NULL,
    `temporada` varchar(255) NOT NULL,
    PRIMARY KEY (`alumnoID`, `temporada`)
);

CREATE TABLE `profesor` (
    `profesorID` INT NOT NULL AUTO_INCREMENT,
    `nombreProfesor` varchar(255) NOT NULL,
    `apellidosProfesor` varchar(255) NOT NULL,
    `correoProfesor` varchar(255) NOT NULL UNIQUE,
    `passwordHashedProfesor` varchar(255) NOT NULL,
    `dniProfesor` varchar(255) NOT NULL UNIQUE,
    `telefonoProfesor` varchar(255) NOT NULL UNIQUE,
    `isAdmin` TINYINT default 0,
    PRIMARY KEY (`profesorID`)
);

CREATE TABLE `asignatura` (
    `asignaturaID` INT NOT NULL AUTO_INCREMENT,
    `nombreAsignatura` varchar(255) NOT NULL UNIQUE,
    `horas` INT(255) NOT NULL,
    PRIMARY KEY (`asignaturaID`)
);

CREATE TABLE `clase` (
    `claseID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `cursoID` INT NOT NULL,
    `profesorID` INT NOT NULL,
    `asignaturaID` INT NOT NULL,
    `diaSemana` INT NOT NULL,
    `horaSemana` INT NOT NULL,
    PRIMARY KEY (
        `cursoID`,
        `profesorID`,
        `asignaturaID`,
        `diaSemana`,
        `horaSemana`
    )
);

CREATE TABLE `falta` (
    `faltaID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `alumnoID` INT NOT NULL,
    `claseID` INT NOT NULL,
    `fecha` DATETIME NOT NULL,
    PRIMARY KEY (`alumnoID`, `claseID`, `fecha`)
);

ALTER TABLE
    `alumno_curso`
ADD
    CONSTRAINT `alumno_curso_fk0` FOREIGN KEY (`alumnoID`) REFERENCES `alumno`(`alumnoID`) ON DELETE CASCADE;

ALTER TABLE
    `alumno_curso`
ADD
    CONSTRAINT `alumno_curso_fk1` FOREIGN KEY (`cursoID`) REFERENCES `curso`(`cursoID`);

ALTER TABLE
    `clase`
ADD
    CONSTRAINT `clase_fk0` FOREIGN KEY (`cursoID`) REFERENCES `curso`(`cursoID`);

ALTER TABLE
    `clase`
ADD
    CONSTRAINT `clase_fk1` FOREIGN KEY (`profesorID`) REFERENCES `profesor`(`profesorID`);

ALTER TABLE
    `clase`
ADD
    CONSTRAINT `clase_fk2` FOREIGN KEY (`asignaturaID`) REFERENCES `asignatura`(`asignaturaID`);

ALTER TABLE
    `falta`
ADD
    CONSTRAINT `falta_fk0` FOREIGN KEY (`alumnoID`) REFERENCES `alumno`(`alumnoID`);

ALTER TABLE
    `falta`
ADD
    CONSTRAINT `falta_fk1` FOREIGN KEY (`claseID`) REFERENCES `clase`(`claseID`);

--end
INSERT INTO
    curso(nombreCurso)
VALUES
    ("1DAM"),
    ("2DAM");

INSERT INTO
    alumno(
        nombreAlumno,
        apellidosAlumno,
        correoAlumno,
        passwordHashedAlumno,
        dniAlumno
    )
VALUES
    (
        "test1",
        "test1",
        "test@gmail.com",
        "password",
        "A1"
    ),
    (
        "test2",
        "test2",
        "test2@gmail.com",
        "password",
        "A2"
    ),
    (
        "test3",
        "test3",
        "test3@gmail.com",
        "password",
        "A3"
    ),
    (
        "test4",
        "test4",
        "test4@gmail.com",
        "password",
        "A4"
    ),
    (
        "test5",
        "test5",
        "test5@gmail.com",
        "password",
        "A5"
    ),
    (
        "test6",
        "test6",
        "test6@gmail.com",
        "password",
        "A6"
    );

INSERT INTO
    alumno_curso(alumnoID, cursoID, temporada)
VALUES
    (1, 1, "19/20"),
    (2, 1, "19/20"),
    (3, 1, "19/20"),
    (4, 2, "19/20"),
    (5, 2, "19/20"),
    (6, 2, "19/20");

INSERT INTO
    asignatura(nombreAsignatura, horas)
VALUES
    ("PYTHON", 300),
    ("FOL", 300),
    ("PROGRAMACION", 300),
    ("ENTORNOS DE DESARROLLO", 300),
    ("BASE DE DATOS", 300),
    ("LENGUAJE DE MARCAS", 300),
    ("SISTEMAS INFORMATICOS", 300),
    ("PROGRAMACION DE SERVICIOS", 300),
    ("EMPRESA", 300),
    ("DESARROLLO DE INTERFACES", 300),
    ("SISTEMAS DE GESTION EMPRESARIAL", 300),
    ("ANDROID", 300),
    ("ACCESO A DATOS", 300),
    ("INGLES", 300);

INSERT INTO
    profesor(
        nombreProfesor,
        apellidosProfesor,
        correoProfesor,
        passwordHashedProfesor,
        dniProfesor,
        telefonoProfesor
    )
VALUES
    (
        "Profesor1",
        "Profesor1",
        "profesor1@gmail.com",
        "password",
        "P1",
        "61"
    ),
    (
        "Profesor2",
        "Profesor2",
        "profesor2@gmail.com",
        "password",
        "P2",
        "62"
    ),
    (
        "Profesor3",
        "Profesor3",
        "profesor3@gmail.com",
        "password",
        "P3",
        "63"
    ),
    (
        "Profesor4",
        "Profesor4",
        "profesor4@gmail.com",
        "password",
        "P4",
        "64"
    ),
    (
        "Profesor5",
        "Profesor5",
        "profesor5@gmail.com",
        "password",
        "P5",
        "65"
    ),
    (
        "Profesor6",
        "Profesor6",
        "profesor6@gmail.com",
        "password",
        "P6",
        "66"
    );

-- INSERT ADMIN DATABASE
INSERT INTO
    profesor(
        nombreProfesor,
        apellidosProfesor,
        correoProfesor,
        passwordHashedProfesor,
        dniProfesor,
        telefonoProfesor,
        isAdmin
    )
VALUES
    (
        "Miguel",
        "Canalejas",
        "migueladmin@gmail.com",
        "kjhasdjhhajskd",
        "P7",
        "67",
        1
    );

-- HORARIO
INSERT INTO
    clase(
        cursoID,
        profesorID,
        asignaturaID,
        diaSemana,
        horaSemana
    )
VALUES
    (2, 1, 11, 1, 1),
    (2, 1, 11, 1, 2),
    (2, 1, 11, 1, 3),
    (2, 1, 10, 1, 4),
    (2, 2, 9, 1, 5),
    (2, 4, 14, 1, 6),
    (2, 6, 12, 2, 1),
    (2, 6, 12, 2, 2),
    (2, 3, 13, 2, 3),
    (2, 3, 13, 2, 4),
    (2, 3, 13, 2, 5),
    (2, 2, 9, 2, 6),
    (2, 1, 10, 3, 1),
    (2, 1, 10, 3, 2),
    (2, 1, 10, 3, 3),
    (2, 3, 13, 3, 4),
    (2, 3, 13, 3, 5),
    (2, 3, 13, 3, 6),
    (2, 1, 10, 4, 1),
    (2, 1, 10, 4, 2),
    (2, 4, 14, 4, 3),
    (2, 5, 8, 4, 4),
    (2, 5, 8, 4, 5),
    (2, 2, 9, 4, 6),
    (2, 5, 8, 5, 1),
    (2, 5, 8, 5, 2),
    (2, 6, 12, 5, 3),
    (2, 6, 12, 5, 4),
    (2, 1, 11, 5, 5),
    (2, 1, 11, 5, 6);

INSERT INTO
    falta (alumnoID, claseID, fecha)
VALUES
    (7, 1, CURRENT_TIMESTAMP);

--CONSULTAS
select
    clase.claseID curso.nombreCurso,
    asignatura.nombreAsignatura,
    profesor.nombreProfesor,
    clase.horaSemana,
    clase.diaSemana
from
    clase
    join curso
    join asignatura
    join profesor on clase.cursoID = curso.cursoID
    and clase.asignaturaID = asignatura.asignaturaID
    and clase.profesorID = profesor.profesorID
where
    profesor.profesorID = 1;
--
select
    asignatura.nombreAsignatura,
    profesor.nombreProfesor,
    clase.horaSemana,
    clase.diaSemana
from
    clase
    join curso
    join asignatura
    join profesor
    join alumno
    join alumno_curso on clase.cursoID = curso.cursoID
    and clase.asignaturaID = asignatura.asignaturaID
    and clase.profesorID = profesor.profesorID
    and clase.cursoID = alumno_curso.cursoID
    and alumno.alumnoID = alumno_curso.alumnoID
where
    alumno.alumnoID = 7

-- /profesor/clase/1 GET ALUMNOS CLASE
SELECT
    alumno.alumnoID,
    alumno.nombreAlumno,
    clase.claseID,
    asignatura.nombreAsignatura,
    profesor.nombreProfesor,
    clase.diaSemana,
    clase.horaSemana
FROM
    clase
    JOIN profesor
    JOIN curso
    JOIN asignatura
    JOIN alumno
    JOIN alumno_curso ON clase.cursoID = curso.cursoID
    and clase.profesorID = profesor.profesorID
    and clase.asignaturaID = asignatura.asignaturaID
    and curso.cursoID = alumno_curso.cursoID
    and alumno.alumnoID = alumno_curso.alumnoID
where
    clase.claseID = 1
order by
    alumno.alumnoID;

-- HORARIO ALUMNO
select
    asignatura.nombreAsignatura AS NombreAsignatura,
    profesor.nombreProfesor AS NombreProfesor,
    clase.horaSemana AS HoraSemana,
    clase.diaSemana AS DiaSemana,
    curso.nombreCurso AS NombreCurso
from
    clase
    join curso
    join asignatura
    join profesor
    join alumno
    join alumno_curso 
    on clase.asignaturaID = asignatura.asignaturaID
    and clase.profesorID = profesor.profesorID
    and clase.cursoID = alumno_curso.cursoID
    and alumno.alumnoID = alumno_curso.alumnoID
    and clase.cursoID = curso.cursoID
WHERE
    alumno.alumnoID = 23;
    

-- ASIGNATURAS PROFESOR
select
    clase.claseID as claseID,
    curso.nombreCurso as nombreCurso,
    asignatura.nombreAsignatura as nombreAsignatura,
    clase.horaSemana as horaSemana,
    clase.diaSemana as diaSemana
from
    clase
    join curso
    join asignatura
    join profesor on clase.cursoID = curso.cursoID
    and clase.asignaturaID = asignatura.asignaturaID
    and clase.profesorID = profesor.profesorID
where
    profesor.profesorID = 3;

-- GET ASIGNATURAS alumno
SELECT
    DISTINCT alumno.nombreAlumno as nombreAlumno,
    alumno.apellidosAlumno as apellidosAlumno,
    alumno.correoAlumno as correoAlumno,
    curso.nombreCurso as nombreCurso,
    asignatura.nombreAsignatura as nombreAsignatura
FROM
    alumno
    JOIN curso
    JOIN alumno_curso
    JOIN clase
    JOIN asignatura ON alumno.alumnoID = alumno_curso.alumnoID
    AND curso.cursoID = alumno_curso.cursoID
    AND curso.cursoID = clase.cursoID
    AND asignatura.asignaturaID = clase.asignaturaID
WHERE
    alumno.alumnoID = 7 
    
-- GET CLASE INFO ALUMNO BY claseID /clase/:claseID
SELECT
    clase.claseID as claseID,
    asignatura.nombreAsignatura as nombreAsignatura,
    profesor.nombreProfesor as nombreProfesor,
    clase.diaSemana as diaSemana,
    clase.horaSemana as horaSemana
FROM
    clase
    JOIN profesor
    JOIN curso
    JOIN asignatura ON clase.cursoID = curso.cursoID
    and clase.profesorID = profesor.profesorID
    and clase.asignaturaID = asignatura.asignaturaI
where
    clase.claseID = ?;

-- GET FALTAS ALUMNO

SELECT
    falta.fecha as fechaFalta,
    falta.faltaID as faltaID,
    alumno.alumnoID as alumnoID,
    asignatura.nombreAsignatura AS nombreAsignatura,
    profesor.nombreProfesor AS nombreProfesor,
    clase.horaSemana AS horaSemana,
    clase.diaSemana AS diaSemana
FROM clase
    JOIN curso
    JOIN asignatura
    JOIN profesor
    JOIN alumno
    JOIN alumno_curso 
    JOIN falta ON clase.asignaturaID = asignatura.asignaturaID
    AND clase.profesorID = profesor.profesorID
    AND clase.cursoID = alumno_curso.cursoID
    AND alumno.alumnoID = alumno_curso.alumnoID
    AND clase.cursoID = curso.cursoID
    AND falta.claseID = clase.claseID
    AND falta.alumnoID = alumno.alumnoID
WHERE
    alumno.alumnoID = 23
ORDER BY falta.fecha;


SELECT 
    alumno.nombreAlumno as nombreAlumno,
    alumno.apellidosAlumno as apellidosAlumno,
    alumno.correoAlumno as correoAlumno,
    alumno.dniAlumno as dniAlumno,
    curso.nombreCurso as nombreCurso,
    alumno_curso.temporada as temporada
    from alumno
    join curso
    join alumno_curso
    on alumno.alumnoID = alumno_curso.alumnoID
    and curso.cursoID = alumno_curso.cursoID
where alumno.alumnoID = 23;

