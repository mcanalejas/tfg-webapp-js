const mysqlConnection = require('../../database')
const bcrypt = require('bcrypt')


function getAlumnos(req, res) {
    mysqlConnection.query('SELECT alumnoID, nombreAlumno, apellidosAlumno, correoAlumno, dniAlumno FROM alumno', (error, results) => {
        if (error) return res.status(400).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(results)
    })
}

function addAlumno(req, res) {
    const { nombreAlumno, apellidosAlumno, correoAlumno, passwordAlumno, dniAlumno } = req.body
    if (!(nombreAlumno && apellidosAlumno && correoAlumno && passwordAlumno && dniAlumno)) return res.json({ error: 'Faltan argumentos' })
    const salt = bcrypt.genSaltSync(10);
    const passwordHashedAlumno = bcrypt.hashSync(passwordAlumno, salt)
    const newAlumno = { nombreAlumno, apellidosAlumno, correoAlumno, passwordHashedAlumno, dniAlumno }
    mysqlConnection.query('INSERT INTO alumno SET ?', [newAlumno], (error, result) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                // Sacar el campo repetido
                let sqlMessage = error.sqlMessage.split("'")
                let campoRepetido = sqlMessage[3].split('.')
                return res.status(400).json({ error: `El campo '${campoRepetido[1]}' insertado ya existe` })
            }
            return res.status(400).json({ error: 'Error al realizar la consulta', error_code: error })
        }
        return res.status(200).json({ message: 'Alumno añadido correctamente' })
    })
}

function getAlumnoById(req, res) {
    const { alumnoID } = req.params
    mysqlConnection.query('SELECT alumnoID,nombreAlumno,apellidosAlumno,correoAlumno,dniAlumno FROM alumno WHERE alumnoID = ?', [alumnoID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(result[0])
    })
}

function deleteAlumno(req, res) {
    const { alumnoID } = req.params
    mysqlConnection.query('DELETE FROM alumno WHERE alumnoID = ?', [alumnoID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return (result.affectedRows > 0)
            ? res.json({ message: 'El alumno ha sido borrado correctamente' })
            : res.status(400).json({ message: 'El alumno no existe' })
    })
}

function updateAlumno(req, res) {
    const { alumnoID } = req.params
    const { nombreAlumno, apellidosAlumno, correoAlumno, dniAlumno } = req.body
    if (!(nombreAlumno && apellidosAlumno && correoAlumno && dniAlumno)) return res.json({ error: 'Faltan argumentos' })
    mysqlConnection.query('UPDATE alumno SET nombreAlumno = ?, apellidosAlumno = ?, correoAlumno = ?, dniAlumno = ? WHERE alumnoID = ?',
        [nombreAlumno, apellidosAlumno, correoAlumno, dniAlumno, alumnoID], (error, result) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    // Sacar el campo repetido
                    let sqlMessage = error.sqlMessage.split("'")
                    let campoRepetido = sqlMessage[3].split('.')
                    return res.status(400).json({ error: `El campo '${campoRepetido[1]}' insertado ya existe` })
                }
                return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            }
            return (result.affectedRows > 0)
                ? res.json({ message: 'Alumno actualizado correctamente' })
                : res.json({ message: 'El alumno no existe' })
        }
    )
}

function updatePassword(req, res) {
    const { alumnoID } = req.params
    const { oldPassword, newPassword, confirmedPassword } = req.body
    if (!(oldPassword && newPassword, confirmedPassword)) return res.json({ error: 'Faltan argumentos' })
    if (newPassword != confirmedPassword) return res.json({ error: 'Confirmación de contraseña incorrecta' })
    //Comprobamos la contraseña
    mysqlConnection.query('SELECT passwordHashedAlumno FROM alumno WHERE alumnoID = ?;', [alumnoID], (error, result) => {
        if (error) return res.status(400).json({ error: 'Error al realizar la consulta', error_code: error })
        if (!result[0]) return res.status(400).json({ error: 'El alumno no existe' }) // X si acaso, siempre que se entre a cambiar la contraseña habra iniciado la sesion un alumno
        if (!bcrypt.compareSync(oldPassword, result[0].passwordHashedAlumno)) return res.status(400).json({ error: 'La contraseña antigua no es correcta' })

        // Actualizamos la contraseña nueva
        const newPasswordHashed = bcrypt.hashSync(confirmedPassword, 10)
        mysqlConnection.query('UPDATE alumno SET passwordHashedAlumno = ? WHERE alumnoID = ?', [newPasswordHashed, alumnoID], (error, result) => {
            if (error) return res.status(400).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            return res.json({ message: 'Contraseña actualizada correctamente' })
        })
    })
}

module.exports = { getAlumnos, addAlumno, getAlumnoById, deleteAlumno, updateAlumno, updatePassword }