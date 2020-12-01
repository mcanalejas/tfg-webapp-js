const mysqlConnection = require('../../database')


function getAsignaturas(req, res) {
    mysqlConnection.query('SELECT * FROM asignatura', (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(results)
    })
}

function addAsignatura(req, res) {
    let { nombreAsignatura, horas } = req.body
    if (!(nombreAsignatura && horas)) return res.status(400).json({ error: 'Faltan argumentos' })
    nombreAsignatura = nombreAsignatura.toUpperCase()
    const newAsignatura = { nombreAsignatura, horas }
    mysqlConnection.query('INSERT INTO asignatura SET ?', [newAsignatura], (error, result) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                // Sacar el campo repetido
                let sqlMessage = error.sqlMessage.split("'")
                let campoRepetido = sqlMessage[3].split('.')
                return res.status(500).json({ error: `El campo ${campoRepetido[1]} ya existe` })
            }
            return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
        }
        return res.json({
            message: 'Asignatura añadido correctamente (' + result.insertId + ')'
        })
    })
}

function getAsignaturaById(req, res) {
    const { asignaturaID } = req.params
    mysqlConnection.query('SELECT * FROM asignatura WHERE asignaturaID = ?', [asignaturaID], (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return res.json(result[0])
    })
}

function deleteAsignatura(req, res) {
    const { asignaturaID } = req.params
    mysqlConnection.query('DELETE FROM asignatura WHERE asignaturaID = ?', [asignaturaID], (error, result) => {
        if (error) return res.json({ error: 'Error al realizar la consulta', error_code: error.errno })
        return (result.affectedRows > 0)
            ? res.json({ message: 'La asignatura ha sido borrado correctamente' })
            : res.json({ message: 'La asignatura no existe' })
    })
}

function updateAsignatura(req, res) {
    const { asignaturaID } = req.params
    let { nombreAsignatura, horas } = req.body
    if (!(nombreAsignatura && horas)) return res.json({ message: 'Faltan argumentos' })
    nombreAsignatura = nombreAsignatura.toUpperCase()
    mysqlConnection.query('UPDATE asignatura SET nombreAsignatura = ?, horas = ? WHERE asignaturaID = ?',
        [nombreAsignatura, horas, asignaturaID], (error, result) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    // Sacar el campo repetido
                    let sqlMessage = error.sqlMessage.split("'")
                    let campoRepetido = sqlMessage[3].split('.')
                    return res.status(500).json({ error: 'Campo en uso', campo_repetido: campoRepetido[1] })
                }
                return res.status(500).json({ error: 'Error al realizar la consulta', error_code: error })
            }
            return (result.affectedRows > 0)
                ? res.json({ message: 'La asignatura ha sido actualizado' })
                : res.json({ message: 'La asignatura no existe' })
        })
}

module.exports = { getAsignaturas, getAsignaturaById, addAsignatura, updateAsignatura, deleteAsignatura }