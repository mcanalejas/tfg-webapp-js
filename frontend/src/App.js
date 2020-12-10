import React from 'react';
import './App.css';
import { UserContextProvider } from './context/UserContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from './nav/SideNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteAlumno from './routes/RouteAlumno';
import RouteProfesor from './routes/RouteProfesor';
import RouteAdmin from './routes/RouteAdmin';
import Login from './login/Login'
import AlumnoProfile from './alumno/perfil/AlumnoProfile';
import AlumnoUpdate from './alumno/perfil/AlumnoUpdate';
import AlumnoHorario from './alumno/horario/AlumnoHorario';
import AlumnoHorarioFalta from './alumno/horario/AlumnoHorarioFalta';
import AlumnoFaltas from './alumno/faltas/AlumnoFaltas';
import ProfesorProfile from './profesor/ProfesorProfile';
import ProfesorTimetable from './profesor/ProfesorTimetable';
import ProfesorClase from './profesor/ProfesorClase';
import AsignaturasDashboard from './admin/asignaturas/AsignaturasDashboard';
import ProfesoresDashboard from './admin/profesores/ProfesoresDashboard';
import AlumnosDashboard from './admin/alumnos/AlumnosDashboard';
import Page403 from './errorpage/Page403';
import Page404 from './errorpage/Page404';
import HomePage from './home/HomePage';


function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <SideNav>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/login' component={Login} exact />
            <RouteAlumno path='/alumno' component={AlumnoProfile} exact />
            <RouteAlumno path='/alumno/perfil' component={AlumnoProfile} exact />
            <RouteAlumno path='/alumno/perfil/editar' component={AlumnoUpdate} exact />
            <RouteAlumno path='/alumno/horario' component={AlumnoHorario} exact />
            <RouteAlumno path='/alumno/horario/faltas-clase/:claseID' component={AlumnoHorarioFalta} exact />
            <RouteAlumno path='/alumno/faltas' component={AlumnoFaltas} exact />
            <RouteProfesor path="/profesor" component={ProfesorProfile} exact />
            <RouteProfesor path="/profesor/perfil" component={ProfesorProfile} exact />
            <RouteProfesor path="/profesor/horario" component={ProfesorTimetable} exact />
            <RouteProfesor path="/profesor/clase/:claseID" component={ProfesorClase} exact />
            <RouteAdmin path="/admin/alumnos" component={AlumnosDashboard} exact />
            <RouteAdmin path="/admin/profesores" component={ProfesoresDashboard} exact />
            <RouteAdmin path="/admin/asignaturas" component={AsignaturasDashboard} exact />
            <Route path="/403" component={Page403} exact />
            <Route path="*" component={Page404} exact />
          </Switch>
        </SideNav>
        <ToastContainer />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
