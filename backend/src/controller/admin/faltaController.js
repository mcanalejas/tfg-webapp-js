const mysqlConnection = require('../../database')

function getFaltas(req, res) {
    mysqlConnection.query('SELECT * FROM falta', (error, result) => {
        if (error) return res.json('Hubo un problema al realizar la consulta')
        return res.json(result)
    })
}

function addFaltaOrFaltas(req, res) {
    const faltas = reqBodyToArray(req.body)
    if (!validateFaltas(faltas)) return res.json({ error: 'Error faltan argumentos' })
    mysqlConnection.query('INSERT INTO falta(alumnoID, claseID, fecha) VALUES ?', [faltas], (error, result) => {
        if (error) return res.json(error)
        return res.json('Falta/s añadidas correctamente')
    })
}

function reqBodyToArray(body) {
    let arrayFaltasObject = body
    let arrayFaltas = []
    arrayFaltas = arrayFaltasObject.map((n) => {
        let falta = [n.alumnoID, n.claseID, new Date()]
        return falta
    })

    return arrayFaltas
}

function validateFaltas(faltas) {
    for (falta of faltas) {
        if (falta[0] == undefined) return false
        if (falta[1] == undefined) return false
        return true
    }
}

function deleteFalta(req, res) {
    const { faltaID } = req.params
    mysqlConnection.query('DELETE FROM falta WHERE faltaID = ?', [faltaID], (error, result) => {
        if (error) return res.status(500).json(error)
        return res.json('Falta elminada')
    })
}

module.exports = { getFaltas, addFaltaOrFaltas, deleteFalta }