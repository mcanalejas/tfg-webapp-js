const { getProfesores, addProfesor, getProfesorById, deleteProfesor, updateProfesor, updatePassword } = require('../../../controller/admin/profesorController.js')

const router = require('express').Router()

router.route('/')
    .get(getProfesores)
    .post(addProfesor)

router.route('/:profesorID')
    .get(getProfesorById)
    .put(updateProfesor)
    .delete(deleteProfesor)

router.route('/updatepassword/:profesorID')
    .put(updatePassword)

module.exports = router