const mysqlConnection = require('../../database')
const bcrypt = require('bcrypt')
const config = require('../../config')
const jwt = require('jsonwebtoken')


function loginAdmin(req, res) {
    const { correoProfesor, passwordProfesor } = req.body
    if (!(correoProfesor, passwordProfesor)) return res.status(400).json({ error: 'Faltan argumentos' })
    if (passwordProfesor != config.ADMIN_PASSWORD) { return res.status(400).json({ error: 'La contraseña o la contraseña son invalidos' }) }
    mysqlConnection.query('SELECT profesorID FROM profesor WHERE correoProfesor = ? AND isAdmin = 1', [correoProfesor], (error, result) => {
        if (error) return res.json(error)
        if (result[0] == undefined) { return res.status(400).json({ error: 'No tienes permisos...' }) }
        const token = jwt.sign({
            profesorID: result[0].profesorID,
            isAdmin: true
        }, 'jwt')
        return res.status(200).json({ token })
    })
}

function loginProfesor(req, res) {
    const { correoProfesor, passwordProfesor } = req.body
    if (!(correoProfesor, passwordProfesor)) return res.status(400).json({ error: 'Faltan argumentos' })
    mysqlConnection.query('SELECT profesorID,passwordHashedProfesor FROM profesor WHERE correoProfesor = ?', [correoProfesor], (error, result) => {
        if (error) return res.json(error)
        if (result[0] == undefined) { return res.status(400).json({ error: 'La contraseña o la contraseña son invalidos' }) }
        if (!bcrypt.compareSync(passwordProfesor, result[0].passwordHashedProfesor)) { // La contraseña no es correcta
            return res.status(400).json({ error: 'La contraseña o el correo son invalidos' })
        } else {
            const token = jwt.sign({
                profesorID: result[0].profesorID,
            }, 'jwt')
            return res.status(200).json({ token })
        }
    })
}

function loginAlumno(req, res) {
    const { correoAlumno, passwordAlumno } = req.body
    if (!(correoAlumno, passwordAlumno)) return res.status(400).json({ error: 'Faltan argumentos' })
    mysqlConnection.query('SELECT alumnoID,passwordHashedAlumno FROM alumno WHERE correoAlumno = ?', [correoAlumno], (error, result) => {
        if (error) return res.json(error)
        if (result[0] == undefined) return res.status(400).json({ error: 'La contraseña o el correo son invalidos' })  // El correo no existe
        if (!bcrypt.compareSync(passwordAlumno, result[0].passwordHashedAlumno)) { // La contraseña no es correcta
            return res.status(400).json({ error: 'La contraseña o el correo son invalidos' })
        }
        // Generamos el token
        const token = jwt.sign({ alumnoID: result[0].alumnoID }, 'jwt')
        return res.status(200).json({ token })
    })
}

module.exports = { loginAdmin, loginProfesor, loginAlumno }