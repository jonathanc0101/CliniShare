import Evento from "./pantallas/Evento";
import Medico from "./pantallas/Medico";

function App() {

  // const [checked, setChecked] = useState(true);

  // const handleChangeCheck = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Evento></Evento>
        <Medico></Medico>
      </header>
    </div>
  );
}

export default App;
