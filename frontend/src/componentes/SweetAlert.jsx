import { useEffect } from "react";
import Swal from "sweetalert2";

function SweetAlert() {
  useEffect(() => {
    mostrarAlerta();
  }, []);

  const mostrarAlerta=() =>{
    // Swal.fire("Mensaje simple")
    // Swal.fire('The Internet?', 'That thing is still around?', 'question')
    Swal.fire
  }
  return <div>SweetAlert</div>;
}

export default SweetAlert;
