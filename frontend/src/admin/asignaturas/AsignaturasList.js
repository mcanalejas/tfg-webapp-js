import React from 'react'

function AsignaturasList(props) {
    return (
        <div>
            <table style={{ border: "1px solid black" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>ID</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Nombre asignatura</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Horas</th>
                        <th style={{ textAlign: "center", border: "1px solid black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.asignaturas.map(asignatura => (
                            <tr key={asignatura.asignaturaID}>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{asignatura.asignaturaID}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{asignatura.nombreAsignatura}</td>
                                <td style={{ textAlign: "center", border: "1px solid black" }}>{asignatura.horas}</td>
                                <td>
                                    <button onClick={() => props.onEditAsignatura(asignatura.asignaturaID)}>Editar</button>
                                    <button onClick={() => props.onDeleteAsignatura(asignatura.asignaturaID)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AsignaturasList