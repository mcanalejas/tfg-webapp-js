const cursoRouter = require('./curso/curso-router')
const alumnoRouter = require('./alumno/alumno-router')
const profesorRouter = require('./profesor/profesor-router')
const asignaturaRouter = require('./asignatura/asignatura-router')
const alumnoCursoRouter = require('./alumno-curso/alumnocurso-router')
const claseRouter = require('./clase/clase-router')
const faltaRouter = require('./falta/falta-router')

const router = require('express').Router()

router.use('/cursos', cursoRouter)
router.use('/alumnos', alumnoRouter)
router.use('/profesores', profesorRouter)
router.use('/alumnos-cursos', alumnoCursoRouter)
router.use('/asignaturas', asignaturaRouter)
router.use('/clases', claseRouter)
router.use('/faltas', faltaRouter)

module.exports = router