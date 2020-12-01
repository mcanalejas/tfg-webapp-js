const router = require('express').Router();
const { authAdmin, authAlumno, authProfesor } = require('../middleware/auth');

const loginRouter = require('./login/login-router');
const adminRouter = require('./admin/admin-router')
const alumnoRouter = require('./alumno/alumno-router')
const profesorRouter = require('./profesor/profesor-router')
const claseRouter = require('./clase/clase-router')

//Rutas autentificación
router.use('/login', loginRouter)

// Rutas administrador
router.use('/admin', authAdmin, adminRouter)

//Rutas para alumnos logueados
router.use('/alumno', authAlumno, alumnoRouter)
router.use('/clase', authAlumno, claseRouter)

//Rutas para profesores logueados
router.use('/profesor', authProfesor, profesorRouter)

module.exports = router;