import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function CustomTableTimetable({ timetable }) {
    const history = useHistory()

    const CeldaCustom = ({ diaSemana, horaSemana }) => {
        const clase = timetable.find((clase) => clase.diaSemana === diaSemana && clase.horaSemana === horaSemana)
        if (!clase) {
            return (
                <TableCell align="center">Libre</TableCell>
            )
        } else {
            return (
                <TableCell align="center">
                    <Button onClick={() => history.push(`/profesor/clase/${clase.claseID}`)}>
                        {clase.nombreAsignatura}<br></br>{clase.nombreCurso}
                    </Button>
                </TableCell>
            )
        }
    }

    return (
        <TableContainer style={{ padding: 10 }}>
            <Table>
                <TableHead style={{ backgroundColor: 'lightgray' }}>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>LUNES</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>MARTES</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>MIERCOLES</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>JUEVES</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>VIERNES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={1} />
                        <CeldaCustom diaSemana={2} horaSemana={1} />
                        <CeldaCustom diaSemana={3} horaSemana={1} />
                        <CeldaCustom diaSemana={4} horaSemana={1} />
                        <CeldaCustom diaSemana={5} horaSemana={1} />
                    </TableRow>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={2} />
                        <CeldaCustom diaSemana={2} horaSemana={2} />
                        <CeldaCustom diaSemana={3} horaSemana={2} />
                        <CeldaCustom diaSemana={4} horaSemana={2} />
                        <CeldaCustom diaSemana={5} horaSemana={2} />
                    </TableRow>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={3} />
                        <CeldaCustom diaSemana={2} horaSemana={3} />
                        <CeldaCustom diaSemana={3} horaSemana={3} />
                        <CeldaCustom diaSemana={4} horaSemana={3} />
                        <CeldaCustom diaSemana={5} horaSemana={3} />
                    </TableRow>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={4} />
                        <CeldaCustom diaSemana={2} horaSemana={4} />
                        <CeldaCustom diaSemana={3} horaSemana={4} />
                        <CeldaCustom diaSemana={4} horaSemana={4} />
                        <CeldaCustom diaSemana={5} horaSemana={4} />
                    </TableRow>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={5} />
                        <CeldaCustom diaSemana={2} horaSemana={5} />
                        <CeldaCustom diaSemana={3} horaSemana={5} />
                        <CeldaCustom diaSemana={4} horaSemana={5} />
                        <CeldaCustom diaSemana={5} horaSemana={5} />
                    </TableRow>
                    <TableRow>
                        <CeldaCustom diaSemana={1} horaSemana={6} />
                        <CeldaCustom diaSemana={2} horaSemana={6} />
                        <CeldaCustom diaSemana={3} horaSemana={6} />
                        <CeldaCustom diaSemana={4} horaSemana={6} />
                        <CeldaCustom diaSemana={5} horaSemana={6} />
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTableTimetable