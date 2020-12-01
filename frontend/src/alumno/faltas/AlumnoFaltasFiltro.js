import { List, ListItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

function AlumnoFaltasFiltro({ faltas, fecha }) {
    // Convertimos la falta a un formato correcto
    if (faltas) faltas.map((falta) => falta.fechaFalta = falta.fechaFalta.split('T')[0])
    const [faltasFiltradas, setFaltasFiltradas] = useState([])

    useEffect(() => {
        setFaltasFiltradas(faltas.filter((falta) => falta.fechaFalta === fecha))
    }, [fecha, faltas])

    return (
        <List>
            {
                faltasFiltradas.length > 0
                    ? faltasFiltradas.map((falta) => {
                        return <FaltaItem key={falta.faltaID} falta={falta} />
                    })
                    : <ListItem><span role="img" aria-label="Ninguna falta">No tienes ninguna falta ese dia ✅</span></ListItem>
            }
        </List>
    )
}

const FaltaItem = ({ falta }) => {
    const fechaBuena = falta.fechaFalta.split('-')[2] + '-' + falta.fechaFalta.split('-')[1] + '-' + falta.fechaFalta.split('-')[0]

    return (
        <ListItem style={{ listStyle: 'none' }}><span role="img" aria-label="Emoji x">❌</span> Tienes una falta de asistencia en {falta.nombreAsignatura} con {falta.nombreProfesor} el dia {fechaBuena} a {falta.horaSemana}º hora.</ListItem>
    )
}

export default AlumnoFaltasFiltro
