import React from 'react'

function ProfesorList(props) {
    return (
        <div>
            <table style={{ border: "1px solid black" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>ID</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Nombre</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Apellidos</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Correo</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>DNI</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.profesores.map(profesor => (
                            <tr key={profesor.profesorID}>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.profesorID}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.nombreProfesor}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.apellidosProfesor}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.correoProfesor}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.dniProfesor}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{profesor.telefonoProfesor}</td>
                                <td >
                                    <button onClick={() => props.onEditProfesor(profesor.profesorID)}> Editar</button>
                                    <button onClick={() => props.onDeleteProfesor(profesor.profesorID)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProfesorList
