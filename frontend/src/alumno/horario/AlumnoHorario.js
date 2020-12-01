import React, { useContext, useState, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import UserContext from '../../context/UserContext'
import AlumnoHorarioTabla from './AlumnoHorarioTabla'
import { GetHorarioAlumnoService } from '../../services/AlumnoService'

function AlumnoHorario() {
    const [cargando, setCargando] = useState(true)
    const { user } = useContext(UserContext)
    const [horario, setHorario] = useState([])

    useEffect(() => {
        const getHorario = async () => {
            const res = await GetHorarioAlumnoService(user.token)
            setCargando(false)
            setHorario(res)
        }
        getHorario()
    }, [user.token])

    return (
        <Grid>
            {
                cargando
                    ? <CircularProgress />
                    : <AlumnoHorarioTabla horario={horario} />
            }
        </Grid>
    )
}

export default AlumnoHorario
