export async function AddAlumnoService(data, token) {
    return await fetch('http://localhost:3001/api/admin/alumnos', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetAlumnos(token) {
    return await fetch('http://localhost:3001/api/admin/alumnos', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetCursos(token) {
    return await fetch('http://localhost:3001/api/admin/cursos', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function AddAlumnoCurso(data, token) {
    const alumnoOnCurso = {
        alumnoID: data.alumnoID,
        cursoID: data.cursoID,
        temporada: data.temporada,
    }
    return await fetch('http://localhost:3001/api/admin/alumnos-cursos', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumnoOnCurso)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function UpdateAlumnoService(alumnoID, alumno, token) {
    return await fetch(`http://localhost:3001/api/admin/alumnos/${alumnoID}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function DeleteAlumnoService(alumnoID, token) {
    return await fetch(`http://localhost:3001/api/admin/alumnos/${alumnoID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetAlumnoByIdService(alumnoID, token) {
    return await fetch(`http://localhost:3001/api/admin/alumnos/${alumnoID}`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetProfesoresService(token) {
    return await fetch('http://localhost:3001/api/admin/profesores', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetProfesorByIdService(profesorID, token) {
    return await fetch(`http://localhost:3001/api/admin/profesores/${profesorID}`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function AddProfesorService(data, token) {
    return await fetch('http://localhost:3001/api/admin/profesores', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function DeleteProfesorService(profesorID, token) {
    return await fetch(`http://localhost:3001/api/admin/profesores/${profesorID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function UpdateProfesorService(profesorID, profesor, token) {
    return await fetch(`http://localhost:3001/api/admin/profesores/${profesorID}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesor)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function AddAsignaturaService(asignatura, token) {
    return await fetch('http://localhost:3001/api/admin/asignaturas', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignatura)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetAsignaturasService(token) {
    return await fetch('http://localhost:3001/api/admin/asignaturas', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetAsignaturaService(asignaturaID, token) {
    return await fetch(`http://localhost:3001/api/admin/asignaturas/${asignaturaID}`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}


export async function UpdateAsignaturaService(asignaturaID, asignatura, token) {
    return await fetch(`http://localhost:3001/api/admin/asignaturas/${asignaturaID}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignatura)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function DeleteAsignaturaService(asignaturaID, token) {
    return await fetch(`http://localhost:3001/api/admin/asignaturas/${asignaturaID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}