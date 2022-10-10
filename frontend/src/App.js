import "./App.css";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import ModificarEvento from "./componentes/ModificarEvento";
import NuevoEvento from "./componentes/NuevoEvento";
import NuevoPaciente from "./componentes/NuevoPaciente";
import Eventos from "./componentes/Eventos";
import VerEvento from "./componentes/VerEvento";
import Home from "./componentes/Home";
import ModificarPaciente from "./componentes/ModificarPaciente";
import ListadoEventos from "./componentes/ListadoEventos";
import ListadoPacientes from "./componentes/ListadoPacientes";

const Rutas = () => {
  let routes = useRoutes([
    { path: "/eventos/id/:id", element: <ModificarEvento /> },
    { path: '/eventos/new/paciente/:id', element: <NuevoEvento />},
    { path: '/pacientes/new', element: <NuevoPaciente />},
    { path: '/eventos/all', element: <ListadoEventos></ListadoEventos>},
    { path: '/pacientes/all', element: <ListadoPacientes></ListadoPacientes>},
    { path: '/eventos/ver/id/:id', element: <VerEvento/>},
    { path: '/', element: <Home></Home>},
    { path: "/pacientes/id/:id", element: <ModificarPaciente /> },


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
