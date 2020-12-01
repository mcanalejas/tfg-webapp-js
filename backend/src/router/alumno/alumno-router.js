const router = require('express').Router()

const { getAlumnoData, getHorarioAlumno, getFaltasAlumno, updateAlumnoData, updateAlumnoPassword, getFaltasAlumnoByClaseID } = require('../../controller/alumno/alumno');


router.get('/perfil', getAlumnoData)
router.get('/horario', getHorarioAlumno)
router.get('/faltas', getFaltasAlumno)
router.get('/faltas/:claseID', getFaltasAlumnoByClaseID)
router.patch('/editarPerfil', updateAlumnoData)
router.patch('/editarPassword', updateAlumnoPassword)

module.exports = router