const { loginAdmin, loginProfesor, loginAlumno } = require('../../controller/auth/authController')
const router = require('express').Router()

router.route('/admin')
    .post(loginAdmin)
router.route('/profesor')
    .post(loginProfesor)
router.route('/alumno')
    .post(loginAlumno)


module.exports = router

