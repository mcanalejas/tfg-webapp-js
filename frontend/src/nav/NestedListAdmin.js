import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import BookIcon from '@material-ui/icons/Book';
import SchoolIcon from '@material-ui/icons/School';

function NestedListAdmin() {
    const [openMenuAdmin, setOpenMenuAdmin] = useState(false);
    const history = useHistory()
    const handleClick = () => {
        setOpenMenuAdmin(!openMenuAdmin);
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Panel de control" />
                {openMenuAdmin ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenuAdmin} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{ paddingLeft: 8 }}>
                    <ListItem button onClick={() => { history.push('/admin/alumnos') }}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alumnos" />
                    </ListItem>
                    <ListItem button onClick={() => { history.push('/admin/profesores') }}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profesores" />
                    </ListItem>
                    <ListItem button onClick={() => { history.push('/admin/asignaturas') }}>
                        <ListItemIcon>
                            <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Asignaturas" />
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default NestedListAdmin
