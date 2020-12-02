import { Button, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core'
import React from 'react'

function AlumnoUpdate() {
    return (
        <div>
            <Typography component="h1" variant="h4">Editar perfil</Typography>
            <form>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Correo alumno">Nuevo correo</InputLabel>
                        <Input
                            name="newCorreoAlumno"
                            aria-describedby="Nuevo alumno"
                            type="text"
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Contraseña antigua">Contraseña antigua</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="oldPasswordAlumno"
                            aria-describedby="Contraseña antigua"
                            type="password"
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="Contraseña nueva">Contraseña nueva</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="newPasswordAlumno"
                            aria-describedby="Contraseña nueva"
                            type="password"
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="Confirmar contraseña nueva">Confirmar contraseña nueva</InputLabel>
                        <Input style={{ marginRight: 50 }}
                            name="confirmNewPasswordAlumno"
                            aria-describedby="Confirmar contraseña nueva"
                            type="password"
                            required
                            inputProps={{ maxLength: 255 }}
                        />
                    </FormControl>
                </Grid>
                <Button
                    style={{ display: 'inline-block', marginTop: 10 }}
                    type="submit"
                    color='primary'
                    disabled='true'
                    variant='contained'>
                    Actualizar
                </Button>
            </form>
        </div>
    )
}

export default AlumnoUpdate
