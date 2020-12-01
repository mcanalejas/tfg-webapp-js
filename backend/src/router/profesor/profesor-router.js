const { getHorarioProfesor, getAlumnosFromClase, addFaltaOrFaltas, getProfesorData, updateProfesorData, updateProfesorPassword, getInfoFromClase } = require('../../controller/profesor/profesor')

const router = require('express').Router()


router.get('/perfil', getProfesorData)
router.get('/horario', getHorarioProfesor)
router.get('/clase/:claseID', getAlumnosFromClase)
router.get('/claseinfo/:claseID', getInfoFromClase)
router.post('/faltas', addFaltaOrFaltas)
router.patch('/editarPerfil', updateProfesorData)
router.patch('/editarPassword', updateProfesorPassword)



module.exports = router