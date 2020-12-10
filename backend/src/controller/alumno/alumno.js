const mysqlConnection = require('../../database')
const bcrypt = require('bcrypt')

function getAlumnoData(req, res) {
    const alumnoID = req.alumnoID
    const query =
        'SELECT alumno.nombreAlumno as nombreAlumno,' +
        'alumno.apellidosAlumno as apellidosAlumno,' +
        'alumno.correoAlumno as correoAlumno,' +
        'alumno.dniAlumno as dniAlumno,' +
        'curso.nombreCurso as nombreCurso,' +
        'alumno_curso.temporada as temporada ' +
        'from alumno join curso join alumno_curso ' +
        'on alumno.alumnoID = alumno_curso.alumnoID ' +
        'and curso.cursoID = alumno_curso.cursoID ' +
        'where alumno.alumnoID = ?'
    mysqlConnection.query(query, [alumnoID], (error, result) => {
        return res.json(result[0])
    })
}

function getHorarioAlumno(req, res) {
    const alumnoID = req.alumnoID
    const query =
        'select clase.claseID as claseID,asignatura.nombreAsignatura AS nombreAsignatura, profesor.nombreProfesor AS nombreProfesor,profesor.apellidosProfesor AS apellidosProfesor, clase.horaSemana AS horaSemana, clase.diaSemana AS diaSemana from clase join curso join asignatura join profesor join alumno join alumno_curso on clase.cursoID = curso.cursoID and clase.asignaturaID = asignatura.asignaturaID and clase.profesorID = profesor.profesorID and clase.cursoID = alumno_curso.cursoID and alumno.alumnoID = alumno_curso.alumnoID WHERE alumno.alumnoID = ?'
    mysqlConnection.query(query, [alumnoID], (error, result) => {
        return res.json(result)
    })
}

function getFaltasAlumno(req, res) {
    const alumnoID = req.alumnoID
    const query = 'SELECT falta.fecha as fechaFalta,' +
        'falta.faltaID as faltaID,' +
        'alumno.alumnoID as alumnoID,' +
        'asignatura.nombreAsignatura AS nombreAsignatura,' +
        'profesor.nombreProfesor AS nombreProfesor,' +
        'clase.horaSemana AS horaSemana, ' +
        'clase.diaSemana AS diaSemana ' +
        'FROM clase ' +
        'JOIN curso ' +
        'JOIN asignatura ' +
        'JOIN profesor ' +
        'JOIN alumno ' +
        'JOIN alumno_curso ' +
        'JOIN falta ON clase.asignaturaID = asignatura.asignaturaID ' +
        'AND clase.profesorID = profesor.profesorID ' +
        'AND clase.cursoID = alumno_curso.cursoID ' +
        'AND alumno.alumnoID = alumno_curso.alumnoID ' +
        'AND clase.cursoID = curso.cursoID ' +
        'AND falta.claseID = clase.claseID ' +
        'AND falta.alumnoID = alumno.alumnoID ' +
        'WHERE ' +
        'alumno.alumnoID = ?'
    mysqlConnection.query(query, [alumnoID], (error, result) => {
        res.json(result)
    })
}

function getFaltasAlumnoByClaseID(req, res) {
    const alumnoID = req.alumnoID
    const { claseID } = req.params
    mysqlConnection.query('select faltaID as faltaID, alumnoID as alumnoID, claseID as claseID, fecha as fecha from falta where alumnoID = ? and claseID = ?', [alumnoID, claseID], (error, result) => {
        if (error) return res.status(400).json(error)
        return res.json(result)
    })
}

function updateAlumnoData(req, res) {
    const alumnoID = req.alumnoID
    const { nombreAlumno, apellidosAlumno, correoAlumno, dniAlumno } = req.body
    if (!(nombreAlumno && apellidosAlumno && correoAlumno && dniAlumno)) return res.json({ error: 'Faltan argumentos' })
    mysqlConnection.query('UPDATE alumno SET nombreAlumno = ?, apellidosAlumno = ?, correoAlumno = ?, dniAlumno = ? WHERE alumnoID = ?',
        [nombreAlumno, apellidosAlumno, correoAlumno, dniAlumno, alumnoID], (error, result) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    // Sacar el campo repetido
                    let sqlMessage = error.sqlMessage.split("'")
                    let campoRepetido = sqlMessage[3].split('.')
                    return res.status(500).json({ error: 'Campo en uso: ' + campoRepetido[1] })
                }
                return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            }
            return res.json({ message: 'Actualizacion correcta' })
        }
    )
}

function updateAlumnoPassword(req, res) {
    const alumnoID = req.alumnoID
    const { oldPassword, newPassword, confirmedPassword } = req.body
    if (!(oldPassword && newPassword, confirmedPassword)) return res.json({ error: 'Faltan argumentos' })
    if (newPassword != confirmedPassword) return res.json({ error: 'Confirmación de contraseña incorrecta' })
    //Comprobamos la contraseña
    mysqlConnection.query('SELECT passwordHashedAlumno FROM alumno WHERE alumnoID = ?;', [alumnoID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
        if (!result[0]) return res.status(500).json({ error: 'El alumno no existe' }) // X si acaso, siempre que se entre a cambiar la contraseña habra iniciado la sesion un alumno
        if (!bcrypt.compareSync(oldPassword, result[0].passwordHashedAlumno)) return res.status(400).json({ error: 'La contraseña antigua no es correcta' })

        // Actualizamos la contraseña nueva
        const newPasswordHashed = bcrypt.hashSync(confirmedPassword, 10)
        mysqlConnection.query('UPDATE alumno SET passwordHashedAlumno = ? WHERE alumnoID = ?', [newPasswordHashed, alumnoID], (error, result) => {
            if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
            return res.json({ message: 'Contraseña actualizada correctamente' })
        })
    })
}

module.exports = { getAlumnoData, getHorarioAlumno, getFaltasAlumno, getFaltasAlumnoByClaseID, updateAlumnoData, updateAlumnoPassword } 
