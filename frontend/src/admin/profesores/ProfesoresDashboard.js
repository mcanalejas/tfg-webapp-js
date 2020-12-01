import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { AddProfesorService, GetProfesoresService, DeleteProfesorService, UpdateProfesorService } from '../../services/AdminService'
import ProfesorForm from './ProfesoresForm'
import ProfesorList from './ProfesorList'

function ProfesoresDashboard() {
    const { user } = useContext(UserContext)
    const [profesores, setProfesores] = useState([])
    const [currentID, setCurrentID] = useState('')

    const getProfesores = async () => {
        const data = await GetProfesoresService(user.token)
        setProfesores(data)
    }

    useEffect(() => {
        getProfesores()
    }, [])

    const addOrEditProfesor = async (profesor) => {
        // No hay ningún ID seleccionado, lo que hacemos es que añadimos y si hay un ID seleccionado actualizamos
        if (currentID === '') {
            const response = await AddProfesorService(profesor, user.token)
            const { message, error } = response
            if (message) {
                console.log('¡Profesor añadido!')
                getProfesores()
            } else if (error) {
                console.log(error)
            }
        } else {
            const response = await UpdateProfesorService(currentID, profesor, user.token)
            const { message, error } = response
            if (message) {
                console.log('¡Profesor actualizado!')
                getProfesores()
                setCurrentID('')
            } else if (error) {
                console.log(error)
            }
        }
    }

    const onEditProfesor = (id) => {
        setCurrentID(id)
    }

    const onDeleteProfesor = async (id) => {
        if (window.confirm(`Desear borrar el usuario con id:${id}`)) {
            await DeleteProfesorService(id, user.token)
            getProfesores()
            console.log('Eliminando profesor!')
        }
    }

    return (
        <div>
            <ProfesorForm addOrEditProfesor={addOrEditProfesor} currentID={currentID} />
            <ProfesorList onEditProfesor={onEditProfesor} onDeleteProfesor={onDeleteProfesor} profesores={profesores} />
        </div>
    )
}

export default ProfesoresDashboard