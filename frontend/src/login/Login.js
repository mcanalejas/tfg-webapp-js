import { Grid } from '@material-ui/core'
import React from 'react'
import LoginAlumno from './LoginAlumno'
import LoginProfesor from './LoginProfesor'

function Login() {
    return (
        <Grid container>
            <Grid item xs={6}>
                <LoginAlumno />
            </Grid>
            <Grid item xs={6}>
                <LoginProfesor />
            </Grid>
        </Grid>
    )
}

export default Login
