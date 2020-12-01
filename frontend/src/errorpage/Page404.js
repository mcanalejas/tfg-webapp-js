import React from 'react'
import Image404 from '../images/404_image.png'
import { Grid, Typography } from '@material-ui/core'

function Page404() {
    return (
        <Grid>
            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '5%' }}>
                ¡La página introducida no existe!
            </Typography>
            <img
                src={Image404}
                alt="Imagen página no encontrada"
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '40%'
                }} />
        </Grid>
    )
}

export default Page404
