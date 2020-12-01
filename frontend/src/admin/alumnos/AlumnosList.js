import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Block, Create } from '@material-ui/icons'
function AlumnosList({ alumnos, onEditAlumno, onDeleteAlumno }) {
    return (
        <TableContainer style={{ marginTop: 30 }}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: 'lightgray' }}>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Apellidos</TableCell>
                        <TableCell align="center">Correo</TableCell>
                        <TableCell align="center">DNI</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        alumnos.map(alumno =>
                            <TableRow key={alumno.alumnoID}>
                                <TableCell align="center">{alumno.nombreAlumno}</TableCell>
                                <TableCell align="center">{alumno.apellidosAlumno}</TableCell>
                                <TableCell align="center">{alumno.correoAlumno}</TableCell>
                                <TableCell align="center">{alumno.dniAlumno}</TableCell>
                                <TableCell align="center">
                                    <Button style={{ marginRight: 10 }} color="default" variant="contained"
                                        onClick={() => onEditAlumno(alumno.alumnoID)}
                                    >Editar <Create /></Button>
                                    <Button color="secondary" variant="contained" onClick={() => onDeleteAlumno(alumno.alumnoID)}>
                                        Borrar <Block />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AlumnosList
