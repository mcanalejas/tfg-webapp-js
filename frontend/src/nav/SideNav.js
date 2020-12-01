import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TodayIcon from '@material-ui/icons/Today';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import TimerIcon from '@material-ui/icons/Timer';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NestedListAdmin from './NestedListAdmin';
import { Card } from '@material-ui/core';

export default function SideNav(props) {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { user, logout } = useContext(UserContext)
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        if (user.isAlumno) {
            setMenuItems([
                { title: 'Perfil', url: '/alumno/perfil', icon: <AccountCircleIcon /> },
                { title: 'Horario', url: '/alumno/horario', icon: <TodayIcon /> },
                { title: 'Faltas', url: '/alumno/faltas', icon: <TimerIcon /> },
                { title: 'Cerrar sesión', icon: <MeetingRoomIcon />, logout: true }
            ])
        } else if (user.isProfesor) {
            setMenuItems([
                { title: 'Perfil', url: '/profesor/perfil', icon: <AccountCircleIcon /> },
                { title: 'Horario', url: '/profesor/horario', icon: <TodayIcon /> },
                { title: 'Cerrar sesión', icon: <MeetingRoomIcon />, logout: true }
            ])
        } else {
            setMenuItems([
                { title: 'Iniciar sesion', url: '/login', icon: <EmojiPeopleIcon /> }
            ])
        }
    }, [user])


    const toggleDrawerClose = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        logout()
        history.push('/login')
    }



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawerClose}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    PASAR LISTA WEB APP
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader} />
                <Divider />
                <List>
                    {
                        menuItems.map((item, i) =>
                            <ListItem button key={i} onClick={() => { item.logout ? handleLogout() : history.push(item.url) }}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        )
                    }
                </List>
                {user.isAdmin &&
                    <>
                        <Divider />
                        <NestedListAdmin />
                    </>
                }
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })} >
                <div className={classes.drawerHeader} />
                <Card style={{ padding: 20 }}>
                    {props.children}
                </Card>
            </main>
        </div>
    );
}

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));