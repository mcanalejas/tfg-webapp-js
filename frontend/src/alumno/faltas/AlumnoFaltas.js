import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Grid, TextField, Typography } from '@material-ui/core'
import { GetAllFaltasAlumnoService } from '../../services/AlumnoService'
import AlumnoFaltasFiltro from './AlumnoFaltasFiltro'


function AlumnoFaltas() {
    const { user } = useContext(UserContext)
    const [faltas, setFaltas] = useState([])
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        const getFaltas = async () => {
            const res = await GetAllFaltasAlumnoService(user.token)
            setFaltas(res)
        }
        getFaltas()
    }, [user.token])

    return (
        <Grid>
            <Typography component="h1" variant="h4">LISTADO DE TUS FALTAS</Typography>
            <Typography component="p">Tienes un total de {faltas.length} faltas.</Typography>
            <TextField style={{ marginTop: 10, marginBottom: 10 }}
                id="date"
                label="Dia de la falta"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setFecha(e.target.value)}
                disabled={faltas.length <= 0}
            />
            {
                faltas.length > 0
                    ? fecha !== ''
                        ? <AlumnoFaltasFiltro faltas={faltas} fecha={fecha} />
                        : <Typography component="p">Selecciona una fecha porfavor</Typography>
                    : <Typography component="h2" variant="h5">ENHORABUENA NO TIENES NINGUNA FALTA!</Typography>
            }
        </Grid>
    )
}

export default AlumnoFaltas
