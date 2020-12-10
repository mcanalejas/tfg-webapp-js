import { Button, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { UpdateAlumnoProfileService, getAlumnoProfile } from '../../services/AlumnoService'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'

function AlumnoUpdate() {
    const [alumnoUpdate, setAlumnoUpdate] = useState({ nombreAlumno: '', apellidosAlumno: '', correoAlumno: '', dniAlumno: '' })
    const { user } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        async function getAlumnoData() {
            const alumnoProfile = await getAlumnoProfile(user.token)
            setAlumnoUpdate(alumnoProfile)
        }
        getAlumnoData()
    }, [user.token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await UpdateAlumnoProfileService(alumnoUpdate, user.token);
        if (res.error) {
            toast.error(res.error)
        } else if (res.message) {
            toast.success('Perfil actualizado!')
        }
    }

    return (
        <div>
            <Button onClick={() => history.goBack()} endIcon={<ArrowBackIcon />} />
            <Typography component="h1" variant="h4">Editar perfil</Typography>
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="nombreAlumno">Nombre</InputLabel>
                        <Input
                            name="nombreAlumno"
                            aria-describedby="nombreAlumno"
                            type="text"
                            required
                            inputProps={{ maxLength: 255 }}
                            value={alumnoUpdate.nombreAlumno}
                            onChange={(e) => setAlumnoUpdate({ ...alumnoUpdate, nombreAlumno: e.target.value })}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="apellidosAlumno">Apellidos</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="apellidosAlumno"
                            aria-describedby="apellidosAlumno"
                            type="text"
                            required
                            inputProps={{ maxLength: 255 }}
                            value={alumnoUpdate.apellidosAlumno}
                            onChange={(e) => setAlumnoUpdate({ ...alumnoUpdate, apellidosAlumno: e.target.value })}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="correoAlumno">Correo</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="correoAlumno"
                            aria-describedby="correoAlumno"
                            type="email"
                            required
                            inputProps={{ maxLength: 255 }}
                            value={alumnoUpdate.correoAlumno}
                            onChange={(e) => setAlumnoUpdate({ ...alumnoUpdate, correoAlumno: e.target.value })}
                        />
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl>
                        <InputLabel htmlFor="dniAlumno">DNI</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="dniAlumno"
                            aria-describedby="dniAlumno"
                            type="text"
                            required
                            inputProps={{ maxLength: 255 }}
                            value={alumnoUpdate.dniAlumno}
                            onChange={(e) => setAlumnoUpdate({ ...alumnoUpdate, dniAlumno: e.target.value })}
                        />
                    </FormControl>
                </Grid>
                <Button
                    style={{ display: 'inline-block', marginTop: 10 }}
                    type="submit"
                    color='primary'
                    variant='contained'>
                    Actualizar
                </Button>
            </form>
        </div>
    )
}

export default AlumnoUpdate
