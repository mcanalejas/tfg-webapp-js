const { getAlumnos, addAlumno, getAlumnoById, deleteAlumno, updateAlumno, updatePassword } = require('../../../controller/admin/alumnoController')

const router = require('express').Router()

router.route('/')
    .get(getAlumnos)
    .post(addAlumno)

router.route('/:alumnoID')
    .get(getAlumnoById)
    .put(updateAlumno)
    .delete(deleteAlumno)

router.route('/updatepassword/:alumnoID')
    .put(updatePassword)

module.exports = router