import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import UserContext from '../../context/UserContext'
import { GetAsignaturaService } from '../../services/AdminService'

function AsignaturasForm(props) {
    const { user } = useContext(UserContext)
    const [asignatura, setAsignatura] = useState({
        nombreAsignatura: '',
        horas: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addOrEditAsignatura(asignatura)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAsignatura({ ...asignatura, [name]: value })
    }

    useEffect(() => {
        // Aun no ha seleccionado ninguna asignatura
        if (props.currentAsignaturaID === '') {
            setAsignatura({
                nombreAsignatura: '',
                horas: 0
            })
        } else {
            const getAsignaturaById = async (asignaturaID) => {
                const currentAsignatura = await GetAsignaturaService(asignaturaID, user.token)
                setAsignatura({ ...currentAsignatura })
            }
            getAsignaturaById(props.currentAsignaturaID)
        }
    }, [props.currentAsignaturaID, user.token])

    return (
        <div>
            <h2>Formulario {props.currentAsignaturaID ? 'Edit' : 'Create'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre asignatura: </label>
                <input
                    type="text"
                    name="nombreAsignatura"
                    placeholder="Programación"
                    value={asignatura.nombreAsignatura}
                    onChange={handleInputChange}
                    required
                />
                <br></br>
                <label>Total horas asignatura: </label>
                <input
                    type="number"
                    name="horas"
                    placeholder="470"
                    value={asignatura.horas}
                    onChange={handleInputChange}
                />
                <br></br>
                <button>{props.currentAsignaturaID ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    )
}

export default AsignaturasForm
