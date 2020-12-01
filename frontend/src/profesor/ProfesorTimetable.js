import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { GetProfesorHorario } from '../services/ProfesorService'
import CustomTableTimetable from './CustomTableTimetable'

function ProfesorTimetable() {
    const [timetable, setTimetable] = useState([{}])
    const { user } = useContext(UserContext)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const getTimetable = async () => {
            const res = await GetProfesorHorario(user.token)
            setCargando(false)
            setTimetable(res)
        }
        getTimetable()
    }, [user.token])

    return (
        <div>
            {
                cargando
                    ? <span>Cargando...</span>
                    : <CustomTableTimetable timetable={timetable} />
            }
        </div>
    )
}

export default ProfesorTimetable
