// const API_URL = 'http://localhost:3001/api/'
export async function LoginAlumnoService(userAlumno) {
    return await fetch("http://localhost:3001/api/login/alumno",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userAlumno)
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function LoginProfesorService(data) {
    return await fetch("http://localhost:3001/api/login/profesor",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function LoginAdminService(admin) {
    return await fetch("http://localhost:3001/api/login/admin",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(admin)
        }
    ).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}
