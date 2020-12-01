import React from 'react'
import Image403 from '../images/403_image.png'
import { Grid, Typography } from '@material-ui/core'

function Page403() {
    return (
        <Grid>
            <Typography component="h1" variant="h4" align="center">
                ¡No tienes permisos para acceder a este sitio!
            </Typography>
            <img
                src={Image403}
                alt="Imagen página sin permisos"
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '40%'
                }} />
        </Grid>
    )
}

export default Page403
