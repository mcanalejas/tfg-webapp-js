const mysqlConnection = require('../../database')
const bcrypt = require('bcrypt')


function getProfesores(req, res) {
    mysqlConnection.query('SELECT * FROM profesor', (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(results)
    })
}

function addProfesor(req, res) {
    const { nombreProfesor, apellidosProfesor, correoProfesor, passwordProfesor, dniProfesor, telefonoProfesor } = req.body
    if (!(nombreProfesor && apellidosProfesor && correoProfesor && passwordProfesor && dniProfesor && telefonoProfesor))
        return res.json({ error: 'Faltan argumentos' })
    const salt = bcrypt.genSaltSync(10);
    const passwordHashedProfesor = bcrypt.hashSync(passwordProfesor, salt)
    const newProfesor = { nombreProfesor, apellidosProfesor, correoProfesor, passwordHashedProfesor, dniProfesor, telefonoProfesor }
    mysqlConnection.query('INSERT INTO profesor SET ?', [newProfesor], (error, result) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                // Sacar el campo repetido
                let sqlMessage = error.sqlMessage.split("'")
                let campoRepetido = sqlMessage[3].split('.')
                return res.status(400).json({ error: `El campo ${campoRepetido[1]} ya existe` })
            }
            return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
        }
        return res.json({ message: 'Profesor añadido correctamente' })
    })
}

function getProfesorById(req, res) {
    const { profesorID } = req.params
    mysqlConnection.query('SELECT * FROM profesor WHERE profesorID = ?', [profesorID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(result[0])
    })
}

function deleteProfesor(req, res) {
    const { profesorID } = req.params
    mysqlConnection.query('DELETE FROM profesor WHERE profesorID = ?', [profesorID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return (result.affectedRows > 0)
            ? res.json({ message: 'El profesor ha sido borrado correctamente' })
            : res.status(400).json({ message: 'El Profesor no existe' })
    })
}

function updateProfesor(req, res) {
    const { profesorID } = req.params
    const { nombreProfesor, apellidosProfesor, correoProfesor, telefonoProfesor, dniProfesor } = req.body
    if (!(nombreProfesor && apellidosProfesor && correoProfesor && telefonoProfesor)) return res.json({ error: 'Faltan argumentos' })
    mysqlConnection.query('UPDATE profesor SET nombreProfesor = ?, apellidosProfesor = ?, correoProfesor = ?, telefonoProfesor = ?, dniProfesor = ? WHERE profesorID = ?',
        [nombreProfesor, apellidosProfesor, correoProfesor, telefonoProfesor, dniProfesor, profesorID], (error, result) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    // Sacar el campo repetido
                    let sqlMessage = error.sqlMessage.split("'")
                    let campoRepetido = sqlMessage[3].split('.')
                    return res.status(500).json({ error: 'Campo en uso', campo_repetido: campoRepetido[1] })
                } else
                    return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            }
            return (result.affectedRows > 0)
                ? res.json({ message: 'Profesor actualizado correctamente' })
                : res.json({ message: 'El profesor no existe' })
        }
    )
}

function updatePassword(req, res) {
    const { profesorID } = req.params
    const { oldPassword, newPassword, confirmedPassword } = req.body
    if (!(oldPassword && newPassword, confirmedPassword)) return res.json({ error: 'Faltan argumentos' })
    if (newPassword != confirmedPassword) return res.json({ error: 'Confirmación de contraseña incorrecta' })
    //Comprobamos la contraseña
    mysqlConnection.query('SELECT passwordHashedProfesor FROM profesor WHERE profesorID = ?;', [profesorID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
        if (!result[0]) return res.status(500).json({ error: 'El profesor no existe' }) // X si acaso, siempre que se entre a cambiar la contraseña habra iniciado la sesion un profesor
        if (!bcrypt.compareSync(oldPassword, result[0].passwordHashedProfesor)) return res.status(400).json({ error: 'La contraseña antigua no es correcta' })

        // Actualizamos la contraseña nueva
        const newPasswordHashed = bcrypt.hashSync(confirmedPassword, 10)
        mysqlConnection.query('UPDATE profesor SET passwordHashedProfesor = ? WHERE profesorID = ?', [newPasswordHashed, profesorID], (error, result) => {
            if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            return res.json({ message: 'Contraseña actualizada correctamente' })
        })
    })
}

module.exports = { getProfesores, addProfesor, getProfesorById, deleteProfesor, updateProfesor, updatePassword }