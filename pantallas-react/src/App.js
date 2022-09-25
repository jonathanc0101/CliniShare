import Evento from "./pantallas/Evento";
import Paciente from "./pantallas/Paciente";

function App() {

  // const [checked, setChecked] = useState(true);

  // const handleChangeCheck = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Evento></Evento>
        <Paciente></Paciente>
      </header>
    </div>
  );
}

export default App;
