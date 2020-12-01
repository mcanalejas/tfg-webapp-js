import { Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { getAlumnoProfile } from '../services/AlumnoService'

function AlumnoProfile() {
    const { user } = useContext(UserContext)
    const [alumnoData, setAlumnoData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const alumnoProfile = await getAlumnoProfile(user.token)
            setLoading(false)
            console.log(alumnoProfile)
            setAlumnoData(alumnoProfile)
        }
        fetchData()
    }, [user.token])
    return (
        <div>
            <Typography component="h1" variant="h4">Perfil alumno</Typography>
            {
                loading
                    ? <span>Cargando...</span>
                    : <div>
                        <ul>
                            <li>Nombre: {alumnoData.nombreAlumno}</li>
                            <li>Apellidos: {alumnoData.apellidosAlumno}</li>
                            <li>Correo: {alumnoData.correoAlumno}</li>
                            <li>DNI: {alumnoData.dniAlumno}</li>
                            <li>Curso: {alumnoData.nombreCurso}</li>
                            <li>Temporada: {alumnoData.temporada}</li>
                        </ul>
                    </div>
            }
        </div>
    )
}

export default AlumnoProfile
