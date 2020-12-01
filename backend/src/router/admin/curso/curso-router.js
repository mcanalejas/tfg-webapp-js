const { getCursos, addCurso, deleteCurso, updateCurso, getCursoById } = require('../../../controller/admin/cursoController');

const router = require('express').Router();

router.route('/')
    .get(getCursos)
    .post(addCurso)
router.route('/:cursoID')
    .get(getCursoById)
    .put(updateCurso)
    .delete(deleteCurso)

module.exports = router