const { getAsignaturas, getAsignaturaById, addAsignatura, updateAsignatura, deleteAsignatura } = require('../../../controller/admin/asignaturaController')
const router = require('express').Router()

router.route('/')
    .get(getAsignaturas)
    .post(addAsignatura)
router.route('/:asignaturaID')
    .get(getAsignaturaById)
    .put(updateAsignatura)
    .delete(deleteAsignatura)

module.exports = router