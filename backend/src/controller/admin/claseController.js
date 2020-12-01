const mysqlConnection = require('../../database')

function getClases(req, res) {
    mysqlConnection.query('SELECT * FROM clase', (error, result) => {
        if (error) return res.json({ error: 'Hubo un error al realizar la consulta' })
        return res.json(result)
    })
}

function getClaseById(req, res) {
    const { claseID } = req.params
    mysqlConnection.query('SELECT * FROM clase WHERE claseID = ?', [claseID], (error, result) => {
        if (error) return res.json({ error: 'Hubo un error al realizar la consulta' })
        return res.json(result[0])
    })
}

function addClase(req, res) {
    const { cursoID, profesorID, asignaturaID, diaSemana, horaSemana } = req.body
    if (!(cursoID, profesorID, asignaturaID, diaSemana, horaSemana)) return res.json({ error: 'Faltan argumentos' })
    const newCurso = { cursoID, profesorID, asignaturaID, diaSemana, horaSemana }
    mysqlConnection.query('INSERT INTO clase SET ?', [newCurso], (error, result) => {
        if (error) return res.json({ error: 'Hubo un error al realizar la consulta' })
        console.log('New clase created: ' + result.insertId)
        return res.json('Clase insertada correctamente')
    })
}

function deleteClase(req, res) {
    const { claseID } = req.params
    mysqlConnection.query('DELTE FROM clase WHERE id = ?', [claseID], (error, result) => {
        if (error) return res.json({ error: 'Hubo un error al realizar la consulta' })
        return res.json('Borrado correcto.')
    })
}

function updateClase(req, res) {
    const { claseID } = req.params
    const { cursoID, profesorID, asignaturaID, diaSemana, horaSemana } = req.body
    if (!(cursoID, profesorID, asignaturaID, diaSemana, horaSemana)) return res.json({ error: 'Faltan argumentos' })
    const newCurso = { cursoID, profesorID, asignaturaID, diaSemana, horaSemana }
    mysqlConnection.query('UPDATE clase SET ? where claseID = ?', [newCurso, claseID], (error, result) => {
        if (!error) return res.json({ error: 'Faltan argumentos' })
        return res.json('Clase actualizada correctamente')
    })
}

module.exports = { getClases, getClaseById, addClase, deleteClase, updateClase }