export async function GetClaseInfo(claseID, token) {
    return await fetch(`http://localhost:3001/api/clase/${claseID}`,
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