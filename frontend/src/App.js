import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useRoutes,
} from "react-router-dom";

import ModificarEvento from "./componentes/ModificarEvento";
import NuevoEvento from "./componentes/NuevoEvento";
import NuevoPaciente from "./componentes/NuevoPaciente";
import Eventos from "./componentes/Eventos";
import VerEvento from "./componentes/VerEvento";

const Rutas = () => {
  let routes = useRoutes([
    { path: "/eventos/id/:id", element: <ModificarEvento /> },
    { path: '/eventos/new', element: <NuevoEvento />},
    { path: '/pacientes/new', element: <NuevoPaciente />},
    { path: '/eventos', element: <Eventos></Eventos>},
    { path: '/eventos/ver/id/:id', element: <VerEvento/>}
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
