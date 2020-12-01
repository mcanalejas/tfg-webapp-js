import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { GetProfesorByIdService } from '../../services/AdminService'

function ProfesorForm(props) {
    const { user } = useContext(UserContext)

    const [profesor, setProfesor] = useState({
        nombreProfesor: '',
        apellidosProfesor: '',
        correoProfesor: '',
        passwordProfesor: '',
        dniProfesor: '',
        telefonoProfesor: ''
    })

    useEffect(() => {
        // Aun no ha seleccionado ningun profesor
        if (props.currentID === '') {
            setProfesor({
                nombreProfesor: '',
                apellidosProfesor: '',
                correoProfesor: '',
                passwordProfesor: '',
                dniProfesor: '',
                telefonoProfesor: ''
            })
        } else {
            const getProfesorById = async (profesorID) => {
                const currentProfesor = await GetProfesorByIdService(profesorID, user.token)
                setProfesor({ ...currentProfesor })
            }
            getProfesorById(props.currentID)
        }
    }, [props.currentID, user.token])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addOrEditProfesor(profesor)
    }

    const handleInputChange = e => {
        // name: extrae el name del input y value: el valor que contiene el input
        const { name, value } = e.target
        setProfesor({ ...profesor, [name]: value })
    }

    return (
        <div>
            <h3>Formulario profesores</h3>
            <form onSubmit={handleSubmit}>
                {props.currentID === '' ? <h4>Creando profesor</h4> : <h4>Actualizando profesor</h4>}
                <label>Nombre profesor: </label>
                <input
                    type="text"
                    placeholder="Miguel"
                    name="nombreProfesor"
                    onChange={handleInputChange}
                    value={profesor.nombreProfesor}
                />
                <br></br>
                <label>Apellidos profesor: </label>
                <input
                    type="text"
                    placeholder="Canalejas"
                    name="apellidosProfesor"
                    onChange={handleInputChange}
                    value={profesor.apellidosProfesor}
                />
                <br></br>
                <label>Correo profesor: </label>
                <input
                    type="text"
                    placeholder="miguelcanalejas@gmail.com"
                    name="correoProfesor"
                    onChange={handleInputChange}
                    value={profesor.correoProfesor}
                />
                <br></br>
                <label>Contraseña profesor: </label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="passwordProfesor"
                    onChange={handleInputChange}
                    value={profesor.passwordProfesor || ""}
                    disabled={!props.currentID ? false : true}
                />
                <br></br>
                <label>DNI profesor: </label>
                <input
                    type="text"
                    placeholder="12345678A"
                    name="dniProfesor"
                    onChange={handleInputChange}
                    value={profesor.dniProfesor}
                />
                <br></br>
                <label>Telf profesor: </label>
                <input
                    type="number"
                    placeholder="600 000 000"
                    name="telefonoProfesor"
                    onChange={handleInputChange}
                    value={profesor.telefonoProfesor}
                />
                <br></br>
                <button>
                    {
                        props.currentID === ''
                            ? 'Añadir'
                            : 'Actualizar'
                    }
                </button>
            </form>
        </div>
    )
}

export default ProfesorForm
