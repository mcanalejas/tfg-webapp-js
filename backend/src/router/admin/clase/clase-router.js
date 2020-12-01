const { getClases, addClase, getClaseById, updateClase, deleteClase } = require('../../../controller/admin/claseController')
const router = require('express').Router();

router.route('/')
    .get(getClases)
    .post(addClase)

router.route('/:claseID')
    .get(getClaseById)
    .put(updateClase)
    .delete(deleteClase)

module.exports = router