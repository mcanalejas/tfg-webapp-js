import { Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { GetProfesorDataService } from '../services/ProfesorService'

function ProfesorProfile() {
    const [profesor, setProfesor] = useState({
        nombreProfesor: '', apellidosProfesor: '', correoProfesor: '', dniProfesor: '', telefonoProfesor: ''
    })
    const { user } = useContext(UserContext)

    useEffect(() => {
        const getProfesorData = async () => {
            const res = await GetProfesorDataService(user.token)
            setProfesor(res)
        }
        getProfesorData()
    }, [user.token])

    return (
        <div>
            <Typography component="h1" variant="h4">Perfil profesor</Typography>
            <Typography component="p">Nombre: {profesor.nombreProfesor}</Typography>
            <Typography component="p">Apellidos: {profesor.apellidosProfesor}</Typography>
            <Typography component="p">Correo: {profesor.correoProfesor}</Typography>
            <Typography component="p">DNI: {profesor.dniProfesor}</Typography>
            <Typography component="p">Telefono: {profesor.telefonoProfesor}</Typography>
        </div>
    )
}

export default ProfesorProfile
