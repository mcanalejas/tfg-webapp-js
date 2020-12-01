const { getFaltas, addFaltaOrFaltas, deleteFalta } = require('../../../controller/admin/faltaController')

const router = require('express').Router()

router.route('/')
    .get(getFaltas)
    .post(addFaltaOrFaltas)

router.route('/:faltaID')
    .get()
    .put()
    .delete(deleteFalta)

module.exports = router