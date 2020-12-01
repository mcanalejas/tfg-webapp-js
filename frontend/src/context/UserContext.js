import React, { useState, createContext } from 'react'
import { useEffect } from 'react'

const UserContext = createContext({})

function getUserSession() {
    const userSession = sessionStorage.getItem('user')
    return userSession ? JSON.parse(userSession) : {}
}

export function UserContextProvider(props) {
    const [user, setUser] = useState(() => getUserSession());

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const loginAlumno = (token) => {
        setUser({
            isAlumno: true,
            token
        })
    }

    const loginProfesor = (token) => {
        setUser({
            isProfesor: true,
            token
        })
    }

    const loginAdmin = (token) => {
        setUser({
            isProfesor: true,
            isAdmin: true,
            token
        })
    }

    const logout = () => {
        setUser({})
    }


    return (
        <UserContext.Provider
            value={{ user, loginAlumno, loginProfesor, loginAdmin, logout }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext