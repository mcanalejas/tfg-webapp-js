import React, { useContext, useState } from 'react'
import { Typography, Button, InputLabel, Input, FormControl } from '@material-ui/core'
import { GetAlumnoByIdService } from '../../services/AdminService'
import UserContext from '../../context/UserContext'
import { useEffect } from 'react'

function AlumnosForm({ currentAlumnoID, onAddOrEdit }) {
    const initialValues = { nombreAlumno: '', apellidosAlumno: '', correoAlumno: '', passwordAlumno: '', dniAlumno: '' }
    const { user } = useContext(UserContext)
    const [alumno, setAlumno] = useState(initialValues)

    useEffect(() => {
        if (currentAlumnoID !== 0) {
            const getAlumnoById = async () => {
                const res = await GetAlumnoByIdService(currentAlumnoID, user.token)
                setAlumno(
                    {
                        nombreAlumno: res.nombreAlumno,
                        apellidosAlumno: res.apellidosAlumno,
                        correoAlumno: res.correoAlumno,
                        passwordAlumno: '',
                        dniAlumno: res.dniAlumno
                    }
                )
            }
            getAlumnoById()
        } else {
            setAlumno({
                nombreAlumno: '',
                apellidosAlumno: '',
                correoAlumno: '',
                passwordAlumno: '',
                dniAlumno: ''
            }
            )
        }
    }, [currentAlumnoID, user.token])


    const handleSubmit = async (e) => {
        e.preventDefault()
        onAddOrEdit(alumno)
    }

    const handleInputChange = e => {
        // name: extrae el name del input y value: el valor que contiene el input
        const { name, value } = e.target
        setAlumno({ ...alumno, [name]: value })
    }


    return (
        <div>
            <Typography component='h1' variant="h4">Formulario de alumnos</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="Nombre del alumno">Nombre del alumno</InputLabel>
                    <Input name="nombreAlumno" aria-describedby="Nombre del alumno" type="text"
                        onChange={handleInputChange}
                        value={alumno.nombreAlumno} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="Apellido del alumno">Apellido del alumno</InputLabel>
                    <Input name="apellidosAlumno" aria-describedby="Apellido del alumno" type="text" onChange={handleInputChange}
                        value={alumno.apellidosAlumno} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="Correo del alumno">Correo del alumno</InputLabel>
                    <Input name="correoAlumno" aria-describedby="Correo del alumno" type="email" onChange={handleInputChange}
                        value={alumno.correoAlumno} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="Contraseña del alumno">Contraseña del alumno</InputLabel>
                    <Input name="passwordAlumno" aria-describedby="Contraseña del alumno" type="password" onChange={handleInputChange}
                        value={alumno.passwordAlumno} disabled={currentAlumnoID !== 0} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="DNI del alumno">DNI del alumno</InputLabel>
                    <Input name="dniAlumno" aria-describedby="DNI del alumno" type="text" onChange={handleInputChange}
                        value={alumno.dniAlumno} />
                </FormControl>
                <Button type="submit" color='primary' variant='contained'>{currentAlumnoID === 0 ? 'Añadir' : 'Actualizar'}</Button>
            </form>
        </div>
    )
}

export default AlumnosForm
