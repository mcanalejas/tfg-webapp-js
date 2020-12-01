const mysqlConnection = require('../../database')

function getAlumnosOnCurso(req, res) {
    mysqlConnection.query(
        'SELECT * ' +
        'FROM alumno JOIN curso JOIN alumno_curso ON alumno.alumnoID = alumno_curso.alumnoID and curso.cursoID = alumno_curso.cursoID',
        (error, result) => {
            if (error) return res.json({ error: 'Se produjo un error al realizar la consulta' })
            return res.json(result)
        }
    )
}

function addAlumnoCurso(req, res) {
    console.log(req.body)
    const { alumnoID, cursoID, temporada } = req.body
    if (!(alumnoID, cursoID, temporada)) return res.json({ error: 'Faltan argumentos' })
    const newAlumnoOnCurso = { alumnoID, cursoID, temporada }
    mysqlConnection.query('INSERT INTO alumno_curso SET ?', [newAlumnoOnCurso], (error, result) => {
        console.log(error)
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El alumno ya está en un curso' })
            }
            return res.status(400).json({ error: 'Error al realizar la consulta' })
        }
        return res.json({ message: 'Alumno añadido correctamente en el curso' })
    })
}

function updateAlumnoCurso(req, res) {
    const { alumno_cursoID } = req.params
    const { alumnoID, cursoID, temporada } = req.body
    if (!(alumnoID, cursoID, temporada)) return res.json({ error: 'Faltan argumentos' })
    const newAlumnoOnCurso = { alumnoID, cursoID, temporada }

    mysqlConnection.query('UPDATE alumno_curso SET ? WHERE alumno_cursoID = ?', [newAlumnoOnCurso, alumno_cursoID], (error, result) => {
        if (error) return res.status(400).json({ error: 'Error al realizar la consulta', error_code: error.code })
        console.log('-New alumno on curso updated')
        return res.json({ message: 'Actualizacion correcta' })
    })
}

module.exports = { getAlumnosOnCurso, addAlumnoCurso, updateAlumnoCurso }