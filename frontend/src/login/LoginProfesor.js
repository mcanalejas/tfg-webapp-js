import { Avatar, Button, Checkbox, FormControl, FormControlLabel, Grid, Input, InputLabel, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'
import imgteacherlogin from '../images/imgteacherlogin.png'
import { LoginProfesorService, LoginAdminService } from '../services/AuthService'

function LoginProfesor() {
    const history = useHistory()
    const { loginProfesor, loginAdmin } = useContext(UserContext)
    const [userProfesor, setUserProfesor] = useState({
        correoProfesor: '',
        passwordProfesor: '',
        isAdmin: false
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (userProfesor.isAdmin) {
            const res = await LoginAdminService(userProfesor)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success('Inicio de sesión correcto!')
                loginAdmin(res.token)
                history.push('/profesor/perfil')
            }
        } else {
            const res = await LoginProfesorService(userProfesor)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success('Inicio de sesión correcto!')
                loginProfesor(res.token)
                history.push('/profesor/perfil')
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserProfesor({ ...userProfesor, [name]: value })
    }

    const handleIsAdmin = (e) => {
        const { name, checked } = e.target
        setUserProfesor({ ...userProfesor, [name]: checked })
    }

    return (
        <Grid>
            <Typography component="h1" variant="h4">LOGIN PROFESOR</Typography>
            <Avatar src={imgteacherlogin} alt="Imagen login profesor" style={{ height: 120, width: 120 }} />
            <form onSubmit={onSubmit}>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Correo profesor">Correo profesor</InputLabel>
                        <Input
                            name="correoProfesor"
                            aria-describedby="Correo profesor"
                            type="text"
                            onChange={handleInputChange}
                            value={userProfesor.correoProfesor}
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Contraseña profesor">Contraseña profesor</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="passwordProfesor"
                            aria-describedby="Contraseña profesor"
                            type="password"
                            onChange={handleInputChange}
                            value={userProfesor.passwordProfesor}
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={userProfesor.isAdmin}
                                onChange={handleIsAdmin}
                                name="isAdmin"
                                color="primary"
                            />
                        }
                        label="¿Eres el administrador?"
                    />
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

export default LoginProfesor
