import { Avatar, Button, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'
import { LoginAlumnoService } from '../services/AuthService'
import imgstudentlogin from '../images/imgstudentlogin.png'

function LoginAlumno() {
    const history = useHistory()
    const { loginAlumno, logout } = useContext(UserContext)
    const [userAlumno, setUserAlumno] = useState({
        correoAlumno: '',
        passwordAlumno: ''
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await LoginAlumnoService(userAlumno)
        if (res.error) {
            toast.error(res.error)
            logout()
        } else if (res.token) {
            loginAlumno(res.token)
            toast.success('Inicio de sesión correcto!')
            history.push('/alumno/perfil')
        } else {
            toast.error('Error con el servidor')
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserAlumno({ ...userAlumno, [name]: value })
    }

    return (
        <Grid>
            <Typography component="h1" variant="h4">LOGIN ALUMNO</Typography>
            <Avatar src={imgstudentlogin} alt="Imagen login alumno" style={{ height: 120, width: 120 }} />
            <form onSubmit={onSubmit}>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Correo alumno">Correo alumno</InputLabel>
                        <Input
                            name="correoAlumno"
                            aria-describedby="Correo alumno"
                            type="text"
                            onChange={handleInputChange}
                            value={userAlumno.correoAlumno}
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Contraseña alumno">Contraseña alumno</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="passwordAlumno"
                            aria-describedby="Contraseña alumno"
                            type="password"
                            onChange={handleInputChange}
                            value={userAlumno.passwordAlumno}
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Button
                    style={{ display: 'inline-block', marginTop: 10 }}
                    type="submit"
                    color='primary'
                    variant='contained'>
                    Iniciar sesion
                </Button>
            </form>
        </Grid >
    )
}

export default LoginAlumno
