import { useEffect } from "react";
import Swal from "sweetalert2";

function SweetAlert() {
  useEffect(() => {
    mostrarAlerta();
  }, []);

  const mostrarAlerta=() =>{
    // Swal.fire("Mensaje simple")
    // Swal.fire('The Internet?', 'That thing is still around?', 'question')
    // Swal.fire({
    //   icon:  "info",
    //   title: "Alerta",
    //   // text: "Esta es una alerta"
    //   // html: "<p>Esta es una alerta y <b>este es el año actual: </b></p>"",

    //   html: `<p>Esta es una alerta.</p><p><b>Este es el año actual: </b>${new Date().getFullYear()}</p>`,
    //   footer: "<b>Este es otro ejemplo</b>"

    // })

    // Swal.fire({
    //   imageUrl:"https://w7.pngwing.com/pngs/157/767/png-transparent-physician-medicine-logo-symbol-miscellaneous-fictional-character-desktop-wallpaper-thumbnail.png",
    //   imageHeight:200,
    //   imageWidth:200,
    //   imageAlt:"Este es el logo de Clinishare"
    // })

    // Swal.fire({
    //   title:"exito",
    //   text:"La operación se realizó con éxito",
    //   icon:"success",
    //   timer:"1000",
    //   position:"center"
    // })

    Swal.fire({
      title:"Advertencia",
      text:"¿Está seguro de eliminar ese registro?",
      icon:"error",
      showDenyButton:true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      confirmButtonColor: "blue",
      showCancelButton: true,
      cancelButtonText: "Cancelar"

    }).then(response =>{
      if(response.isConfirmed){
        Swal.fire("Éxito", "El registro se eliminó correctamente","success");
      }else if(response.isDenied){
        Swal.fire("Información", "No pasó nada","info");
      }else{
        Swal.fire("Error", "Ocurrió algo inesperado","error");
      }
    })
  }
  return <div>SweetAlert</div>;
}

export default SweetAlert;
