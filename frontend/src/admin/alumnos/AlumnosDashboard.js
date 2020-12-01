import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import UserContext from '../../context/UserContext'
import { AddAlumnoService, DeleteAlumnoService, GetAlumnos, UpdateAlumnoService } from '../../services/AdminService'
import AlumnosForm from './AlumnosForm'
import AlumnosList from './AlumnosList'

function AlumnosDashboard() {
    const [alumnos, setAlumnos] = useState([])
    const { user } = useContext(UserContext)
    const [currentAlumnoID, setCurrentAlumnoID] = useState(0)

    useEffect(() => {
        getAlumnos()
    }, [])

    const getAlumnos = async () => {
        const res = await GetAlumnos(user.token)
        setAlumnos(res)
    }

    const onAddOrEdit = async (alumno) => {
        if (currentAlumnoID === 0) {
            const res = await AddAlumnoService(alumno, user.token)
            if (res.message) {
                toast.success(res.message)
                getAlumnos()
            } else {
                toast.error(res.error)
            }
        } else {
            const res = await UpdateAlumnoService(currentAlumnoID, alumno, user.token)
            if (res.message) {
                toast.warning(res.message)
                getAlumnos()
                setCurrentAlumnoID(0)
            } else {
                toast.error(res.error)
            }
        }
    }

    const onEditAlumno = (id) => {
        setCurrentAlumnoID(id)
    }

    const onDeleteAlumno = async (alumnoID) => {
        if (window.confirm('Deseas borrar el usuario con id: ' + alumnoID + '?')) {
            await DeleteAlumnoService(alumnoID, user.token)
            toast.error('Alumno borrado correctamente!')
            getAlumnos()
        }
    }

    return (
        <div>
            <AlumnosForm currentAlumnoID={currentAlumnoID} onAddOrEdit={onAddOrEdit} />
            <AlumnosList alumnos={alumnos} onEditAlumno={onEditAlumno} onDeleteAlumno={onDeleteAlumno} />
        </div>
    )


}

export default AlumnosDashboard
