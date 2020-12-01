import { Button, Grid, List, ListItem, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { GetClaseInfo } from '../../services/ClaseService';
import { GetFaltasAlumnoService } from '../../services/AlumnoService';

function AlumnoHorarioFalta() {
    const params = useParams()
    const history = useHistory()
    const { user } = useContext(UserContext)
    const [clase, setClase] = useState({})
    const [faltas, setFaltas] = useState([])

    useEffect(() => {
        const getClase = async () => {
            const info = await GetClaseInfo(params.claseID, user.token)
            setClase(info)
        }
        getClase()

        const getFaltas = async () => {
            const faltas = await GetFaltasAlumnoService(params.claseID, user.token);
            faltas.map(falta => {
                var fecha = falta.fecha.split('T')
                var hora = fecha[1].split('.')
                falta.fecha = fecha[0]
                falta.hora = hora[0]
                return falta
            })
            setFaltas(faltas)
        }
        getFaltas()
    }, [params.claseID, user.token])

    return (
        <Grid>
            <Button onClick={() => history.goBack()} endIcon={<ArrowBackIcon />} />
            <Typography component="h1" variant="h4">Faltas en la clase {clase.nombreAsignatura}</Typography>
            <List>
                {
                    faltas.length > 0
                        ? faltas.map((falta) => {
                            return <ListItem key={falta.faltaID}>El dia {falta.fecha} a las {falta.hora} se produjo una falta de asistencia.</ListItem>
                        })
                        : <ListItem>No se ha producido ningúna falta de asistencia en esta clase.</ListItem>
                }
            </List>
        </Grid>
    )
}

export default AlumnoHorarioFalta
