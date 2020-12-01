import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'
import { GetAlumnosFromClase, GetInfoFromClase, AddFaltasService } from '../services/ProfesorService'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ProfesorClase() {
    // TODO al enviar las faltas que los checbox se queden en false *PRI: BAJA*
    const { user } = useContext(UserContext)
    const history = useHistory()
    const params = useParams()
    const [clase, setClase] = useState({})
    const [alumnos, setAlumnos] = useState([])
    const [faltas, setFaltas] = useState([])
    const [pasadoLista, setPasadoLista] = useState(false);

    useEffect(() => {
        const getAlumnosFromClase = async () => {
            const res = await GetAlumnosFromClase(params.claseID, user.token)
            setAlumnos(res)
        }
        getAlumnosFromClase()

        const getInfoClase = async () => {
            const res = await GetInfoFromClase(params.claseID, user.token)
            setClase(res[0])
        }
        getInfoClase()
    }, [params.claseID, user.token])

    const addToFaltas = (e) => {
        const { value, checked } = e.target
        if (checked) {
            const nuevaFalta = { alumnoID: value, claseID: params.claseID }
            setFaltas([...faltas, nuevaFalta])
        } else {
            setFaltas(faltas.filter(falta => falta.alumnoID !== value))
        }
    }

    const handleSubmit = async () => {
        if (window.confirm('Se van a enviar las faltas señaladas, ¿estás seguro?')) {
            const res = await AddFaltasService(faltas, user.token)
            toast.success(res.message)
            setFaltas([])
            setPasadoLista(true)
        }
    }

    return (
        <div>
            <Button onClick={() => history.goBack()} endIcon={<ArrowBackIcon />} />
            <Typography component="h1" variant="h4" align="center">{clase.nombreAsignatura} DIA SEMANA: {clase.diaSemana}- HORA: {clase.horaSemana}</Typography>
            <TableContainer style={{ margin: 20, padding: 10 }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#3f51b5' }}>
                        <TableRow>
                            <TableCell align="center" style={{ color: 'white' }}>ID alumno</TableCell>
                            <TableCell align="center" style={{ color: 'white' }}>Nombre alumno</TableCell>
                            <TableCell align="center" style={{ color: 'white' }}>Apellidos alumno</TableCell>
                            <TableCell align="center" style={{ color: 'white' }}>Falta de asistencia</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            alumnos.map((alumno) =>
                                <TableRow key={alumno.alumnoID}>
                                    <TableCell align="center">{alumno.alumnoID}</TableCell>
                                    <TableCell align="center">{alumno.nombreAlumno}</TableCell>
                                    <TableCell align="center">{alumno.apellidosAlumno}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            onChange={addToFaltas}
                                            value={alumno.alumnoID}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleSubmit} color='primary' variant='contained' disabled={faltas.length <= 0}>
                    Enviar faltas
                </Button>
            </div>
        </div>
    )
}

export default ProfesorClase
