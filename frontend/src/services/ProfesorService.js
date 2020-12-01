export async function GetProfesorDataService(token) {
    return await fetch("http://localhost:3001/api/profesor/perfil",
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

export async function GetProfesorHorario(token) {
    return await fetch("http://localhost:3001/api/profesor/horario",
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

export async function GetAlumnosFromClase(claseID, token) {
    return await fetch(`http://localhost:3001/api/profesor/clase/${claseID}`,
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

export async function GetInfoFromClase(claseID, token) {
    return await fetch(`http://localhost:3001/api/profesor/claseinfo/${claseID}`,
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

export async function AddFaltasService(faltas, token) {
    return await fetch('http://localhost:3001/api/profesor/faltas', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(faltas)
    }).then(response => response.json())
        .then(result => result)
        .catch(error => error)
}