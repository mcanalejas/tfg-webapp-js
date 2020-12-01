const mysqlConnection = require('../../database')


function getCursos(req, res) {
    mysqlConnection.query('SELECT * FROM curso', (error, results, fields) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(results)
    })
}

function addCurso(req, res) {
    let { nombreCurso } = req.body
    if (!nombreCurso) return res.json({ message: 'Faltan argumentos' })
    nombreCurso = nombreCurso.toUpperCase()
    const newCurso = { nombreCurso }
    mysqlConnection.query('INSERT INTO curso SET ?', [newCurso], (error, result) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                // Sacar el campo repetido
                let sqlMessage = error.sqlMessage.split("'")
                let campoRepetido = sqlMessage[3].split('.')
                return res.status(500).json({ error: 'Algun dato insertado ya existe', campo_repetido: campoRepetido[1] })
            }
            return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
        }
        return res.json({
            message: 'Curso añadido correctamente (' + result.insertId + ')'
        })
    })
}

function getCursoById(req, res) {
    const { cursoID } = req.params
    mysqlConnection.query('SELECT * FROM curso WHERE cursoID = ?', [cursoID], (error, result, fields) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(result[0])
    })
}

function deleteCurso(req, res) {
    const { cursoID } = req.params
    mysqlConnection.query('DELETE FROM curso WHERE cursoID = ?', [cursoID], (error, result) => {
        if (error) return res.json({ error: 'Error al eliminar el curso', error_code: error.errno })
        return (result.affectedRows > 0)
            ? res.json({ message: 'El curso ha sido borrado correctamente' })
            : res.json({ message: 'El curso no existe' })
    })
}

function updateCurso(req, res) {
    const { cursoID } = req.params
    const { nombreCurso } = req.body
    if (!nombreCurso) return res.json({ message: 'No has indicado el nombreCurso a actualizar' })
    mysqlConnection.query('UPDATE curso SET nombreCurso = ? WHERE cursoID = ?', [nombreCurso, cursoID], (error, result) => {
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
            ? res.json({ message: 'El curso ha sido actualizado' })
            : res.json({ message: 'El curso no existe' })
    })
}

module.exports = { getCursos, addCurso, getCursoById, deleteCurso, updateCurso }