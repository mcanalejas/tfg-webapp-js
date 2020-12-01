import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import AsignaturasForm from './AsignaturasForm'
import AsignaturasList from './AsignaturasList'
import { AddAsignaturaService, DeleteAsignaturaService, GetAsignaturasService, UpdateAsignaturaService } from '../../services/AdminService'

function AsignaturasDashboard() {
    const { user } = useContext(UserContext)
    const [asignaturas, setAsignaturas] = useState([])
    const [currentAsignaturaID, setCurrentAsignaturaID] = useState('')

    const getAsignaturas = async () => {
        const res = await GetAsignaturasService(user.token)
        setAsignaturas(res)
    }

    const addOrEditAsignatura = async (asignatura) => {
        if (currentAsignaturaID === '') {
            const response = await AddAsignaturaService(asignatura, user.token)
            const { message, error } = response
            if (message) {
                console.log('Asignatura añadida!')
                getAsignaturas()
            } else if (error) {
                console.log(error)
            }
        } else {
            const response = await UpdateAsignaturaService(currentAsignaturaID, asignatura, user.token)
            const { message, error } = response
            if (message) {
                console.log('¡Asignatura actualizada!')
                getAsignaturas()
                setCurrentAsignaturaID('')
            } else if (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getAsignaturas()
    }, [])

    const onEditAsignatura = (asignaturaID) => {
        console.log('asignatura actualizada: ' + asignaturaID)
        setCurrentAsignaturaID(asignaturaID)
    }

    const onDeleteAsignatura = async(asignaturaID) => {
        if (window.confirm(`Desear borrar la asignatura con id:${asignaturaID}`)) {
            console.log('Eliminando asignatura: ' + asignaturaID)
            await DeleteAsignaturaService(asignaturaID, user.token)
            getAsignaturas()
        }
    }

    return (
        <div>
            <h3>Gestion de asignaturas</h3>
            <AsignaturasForm addOrEditAsignatura={addOrEditAsignatura} currentAsignaturaID={currentAsignaturaID} />
            <AsignaturasList onEditAsignatura={onEditAsignatura} onDeleteAsignatura={onDeleteAsignatura} asignaturas={asignaturas} />
        </div>
    )
}

export default AsignaturasDashboard
