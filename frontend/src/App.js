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

const Rutas = () => {
  let routes = useRoutes([
    { path: "/eventos/id", element: <ModificarEvento /> },
    { path: '/eventos/new', element: <NuevoEvento />},
    { path: '/pacientes/new', element: <NuevoPaciente />},
    // ...
  ]);
  return routes;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Rutas></Rutas>
        </Router>
      </header>
    </div>
  );
}
export default App;
