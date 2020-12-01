// const API_URL = 'http://localhost:3001/api/'
export async function getAlumnoProfile(token) {
    return await fetch("http://localhost:3001/api/alumno/perfil",
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetHorarioAlumnoService(token) {
    return await fetch("http://localhost:3001/api/alumno/horario",
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetFaltasAlumnoService(claseID, token) {
    return await fetch(`http://localhost:3001/api/alumno/faltas/${claseID}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export async function GetAllFaltasAlumnoService(token) {
    return await fetch(`http://localhost:3001/api/alumno/faltas`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
        }
    )
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}