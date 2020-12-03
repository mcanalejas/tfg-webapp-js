const mysqlConnection = require('../../database')

function getProfesorData(req, res) {
    const profesorID = req.profesor.profesorID
    mysqlConnection.query('SELECT nombreProfesor, apellidosProfesor, correoProfesor, dniProfesor, telefonoProfesor FROM profesor WHERE profesorID = ?', [profesorID], (error, result) => {
        return res.json(result[0])
    })
}

function updateProfesorData(req, res) {
    const { profesorID } = req.profesor.profesorID
    const { nombreProfesor, apellidosProfesor, correoProfesor, dniProfesor, telefonoProfesor } = req.body
    if (!(nombreProfesor && apellidosProfesor && correoProfesor && dniProfesor && telefonoProfesor)) return res.json({ error: 'Faltan argumentos' })
    mysqlConnection.query('UPDATE profesor SET nombreProfesor = ?, apellidosProfesor = ?, correoProfesor = ?, dniProfesor = ?, telefonoProfesor = ? WHERE profesorID = ?',
        [nombreProfesor, apellidosProfesor, correoProfesor, dniProfesor, telefonoProfesor, profesorID], (error, result) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    // Sacar el campo repetido
                    let sqlMessage = error.sqlMessage.split("'")
                    let campoRepetido = sqlMessage[3].split('.')
                    return res.status(500).json({ error: 'Campo en uso', campo_repetido: campoRepetido[1] })
                }
                return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            }
            return (result.affectedRows > 0)
                ? res.json({ message: 'Profesor actualizado correctamente' })
                : res.json({ message: 'El profesor no existe' })
        }
    )
}

function updateProfesorPassword(req, res) {
    const { profesorID } = req.profesor.profesorID
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

function getHorarioProfesor(req, res) {
    const profesorID = req.profesor.profesorID
    const query =
        'select clase.claseID as claseID,curso.nombreCurso as nombreCurso,asignatura.nombreAsignatura as nombreAsignatura,clase.horaSemana as horaSemana,clase.diaSemana as diaSemana ' +
        'from clase ' +
        'join curso ' +
        'join asignatura ' +
        'join profesor ' +
        'on clase.cursoID = curso.cursoID ' +
        'and clase.asignaturaID = asignatura.asignaturaID ' +
        'and clase.profesorID = profesor.profesorID ' +
        'where ' +
        'profesor.profesorID = ?'

    mysqlConnection.query(query, [profesorID], (error, result) => {
        if (error) return res.json(error)
        return res.json(result)
    })
}

function getInfoFromClase(req, res) {
    const { claseID } = req.params
    const query = "SELECT clase.claseID as claseID,asignatura.nombreAsignatura as nombreAsignatura,clase.diaSemana as diaSemana,clase.horaSemana as horaSemana FROM asignatura JOIN clase ON clase.asignaturaID = asignatura.asignaturaID WHERE clase.claseID= ?"
    mysqlConnection.query(query, [claseID], (error, result) => {
        if (error) return res.json(error)
        return res.json(result)
    })
}

function getAlumnosFromClase(req, res) {
    const { claseID } = req.params
    const query =
        'SELECT alumno.alumnoID as alumnoID,alumno.nombreAlumno as nombreAlumno, alumno.apellidosAlumno as apellidosAlumno,' +
        'clase.claseID as claseID,asignatura.nombreAsignatura as nombreAsignatura,' +
        'clase.diaSemana as diaSemana,clase.horaSemana as horaSemana ' +
        'FROM clase ' +
        'JOIN profesor ' +
        'JOIN curso ' +
        'JOIN asignatura ' +
        'JOIN alumno ' +
        'JOIN alumno_curso  ' +
        'ON clase.cursoID = curso.cursoID ' +
        'and clase.profesorID = profesor.profesorID ' +
        'and clase.asignaturaID = asignatura.asignaturaID ' +
        'and curso.cursoID = alumno_curso.cursoID ' +
        'and alumno.alumnoID = alumno_curso.alumnoID ' +
        'where clase.claseID = ? ' +
        'order by alumno.apellidosAlumno'
    mysqlConnection.query(query, [claseID], (error, result) => {
        if (error) return res.json(error)
        return res.json(result)
    })
}

function addFaltaOrFaltas(req, res) {
    const faltas = reqBodyToArray(req.body)
    if (!validateFaltas(faltas)) return res.json({ error: 'Error faltan argumentos' })
    mysqlConnection.query('INSERT INTO falta(alumnoID, claseID, fecha) VALUES ?', [faltas], (error, result) => {
        if (error) return res.json(error)
        return res.json({ message: 'Falta/s añadidas correctamente' })
    })
}

function reqBodyToArray(body) {
    // Mediante este metodo convertimos todas las faltas que nos vienen en un array de strings.
    let arrayFaltasObject = body
    let arrayFaltas = []
    arrayFaltas = arrayFaltasObject.map((n) => {
        let falta = [n.alumnoID, n.claseID, new Date()]
        return falta
    })
    return arrayFaltas
}

function validateFaltas(faltas) {
    let bool = true
    for (falta of faltas) {
        if (falta[0] == undefined) bool = false
        if (falta[1] == undefined) bool = false
    }
    return bool
}

module.exports = { getProfesorData, getHorarioProfesor, getAlumnosFromClase, addFaltaOrFaltas, updateProfesorData, updateProfesorPassword, getInfoFromClase }