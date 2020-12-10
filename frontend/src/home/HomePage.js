import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Grid, Typography } from '@material-ui/core'
import SchoolImage from '../images/school.png'
import LoginAlumno from '../login/LoginAlumno'
import LoginProfesor from '../login/LoginProfesor'
function HomePage() {
    const { user } = useContext(UserContext)
    return (
        <Grid>
            {
                user.isAlumno || user.isProfesor || user.isAdmin
                    ? (
                        <div>
                            <img
                                src={SchoolImage}
                                alt="Sesion iniciada"
                                style={{
                                    marginTop: 10,
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: '40%'
                                }} />
                            <Typography style={{ marginTop: 10 }} align="center">Ya hay una sesión puedes seguir navegando</Typography>
                        </div>
                    )
                    : (
                        <Grid container>
                            <Grid item xs={6}>
                                <LoginAlumno />
                            </Grid>
                            <Grid item xs={6}>
                                <LoginProfesor />
                            </Grid>
                        </Grid >
                    )
            }
        </Grid >
    )
}

export default HomePage
