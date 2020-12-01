const { getAlumnosOnCurso, addAlumnoCurso, updateAlumnoCurso } = require('../../../controller/admin/alumno-cursoController')

const router = require('express').Router()

router.route('/')
    .get(getAlumnosOnCurso)
    .post(addAlumnoCurso)

router.route('/:alumno_cursoID')
    .put(updateAlumnoCurso)

module.exports = router