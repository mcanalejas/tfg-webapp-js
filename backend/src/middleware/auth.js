const jwt = require("jsonwebtoken")

function authAdmin(req, res, next) {
    const token = req.headers['authorization']
    jwt.verify(token, 'jwt', function (err, decoded) {
        if (err) return res.status(403).json({ success: false, error: 'El token no es válido o es nulo' })
        if (!decoded.isAdmin) return res.status(403).json({ success: false, error: 'No tienes permisos' })
        next()
    });
}

function authAlumno(req, res, next) {
    const token = req.headers['authorization']
    if (!token) return res.status(403).json({ success: false, error: 'El token es nulo' })
    jwt.verify(token, 'jwt', function (err, decoded) {
        if (err) return res.status(403).json({ success: false, error: 'El token no es válido' })
        if (!decoded.alumnoID) return res.status(403).json({ success: false, error: 'No tienes permisos' })
        req.alumnoID = decoded.alumnoID
        next()
    });
}

function authProfesor(req, res, next) {
    const token = req.headers['authorization']
    jwt.verify(token, 'jwt', function (err, decoded) {
        if (err) return res.status(403).json({ success: false, error: 'El token no es válido o es nulo' })
        if (!decoded.profesorID) return res.status(403).json({ success: false, error: 'No tienes permisos' })
        req.profesor = {
            profesorID: decoded.profesorID
        }
        next()
    });
}


module.exports = { authAdmin, authAlumno, authProfesor }