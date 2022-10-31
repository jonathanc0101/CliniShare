import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import ModificarEvento from "./componentes/ModificarEvento";
import NuevoEvento from "./componentes/NuevoEvento";
import NuevoPaciente from "./componentes/NuevoPaciente";
import VerEvento from "./componentes/VerEvento";
import Home from "./componentes/Home";
import ModificarPaciente from "./componentes/ModificarPaciente";
import ListadoEventos from "./componentes/ListadoEventos";
import ListadoPacientes from "./componentes/ListadoPacientes";
import VerPaciente from "./componentes/VerPaciente";
import SweetAlert from "./componentes/SweetAlert";
import RegistroMedico from "./componentes/RegistroMedico";
import LoginForm from "./componentes/LoginForm";
import ModificarMedico from "./componentes/ModificarMedico";

const Rutas = () => {
  let routes = useRoutes([
    { path: "/eventos/id/:id", element: <ModificarEvento /> },
    { path: "/eventos/new/paciente/:id", element: <NuevoEvento /> },
    { path: "/pacientes/new", element: <NuevoPaciente /> },
    { path: "/eventos/all", element: <ListadoEventos></ListadoEventos> },
    { path: "/pacientes/all", element: <ListadoPacientes></ListadoPacientes> },
    { path: "/eventos/ver/id/:id", element: <VerEvento /> },
    { path: "/pacientes/id/:id", element: <ModificarPaciente /> },

    { path: "/pacientes/ver/id/:id", element: <VerPaciente /> },
    { path: "/home", element: <Home></Home> },
    { path: "/sa", element: <SweetAlert></SweetAlert> },
    { path: "/register/", element: <RegistroMedico></RegistroMedico>},
    { path: "/", element: <LoginForm></LoginForm>},
    { path: "/configuracion/cuenta/", element: <ModificarMedico></ModificarMedico>}


    // ...
  ]);
  return routes;
};

function App() {
  return (
    <Router>
      <Rutas></Rutas>
    </Router>
  );
}
export default App;
