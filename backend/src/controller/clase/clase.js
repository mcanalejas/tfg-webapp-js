const mysqlConnection = require('../../database')

function getClaseInfo(req, res) {
    const { claseID } = req.params
    const query =
        'SELECT ' +
        'clase.claseID as claseID,' +
        'asignatura.nombreAsignatura as nombreAsignatura,' +
        'profesor.nombreProfesor as nombreProfesor,' +
        'clase.diaSemana as diaSemana,' +
        'clase.horaSemana as horaSemana ' +
        'FROM ' +
        'clase ' +
        'JOIN profesor ' +
        'JOIN curso ' +
        'JOIN asignatura ' +
        'ON clase.cursoID = curso.cursoID ' +
        'and clase.profesorID = profesor.profesorID ' +
        'and clase.asignaturaID = asignatura.asignaturaID ' +
        'where clase.claseID = ?'

    mysqlConnection.query(query, [claseID], (error, result) => {
        return res.json(result[0])
    })
}

module.exports = { getClaseInfo }