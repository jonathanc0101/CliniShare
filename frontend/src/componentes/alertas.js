import Swal from "sweetalert2";

export const alertas = {
  alertaPacienteExiste,
  alertaCamposObligatorios,
  alertaExito,
  alertaProblemas,
  alertaModificacionExitosa,
  alertaEmailInvalido,
  contraseñasDiferentes
};

async function alertaPacienteExiste(pacienteDni) {
  Swal.fire({
    icon: "warning",
    title: "",
    html: `<p>Ya existe el paciente con <b>DNI ${pacienteDni}</b></p>`,
  });
}
async function alertaCamposObligatorios() {
  Swal.fire({
    icon: "warning",
    title: "",
    text: "Faltan datos por completar",
  });
}

async function alertaExito(entidad) {
  Swal.fire({
    title: "Éxito",
    html: `<p>El <b>${entidad}</b> se guardó exitosamente</p>`,
    icon: "success",
    timer: "1000",
    position: "center",
  });
}

async function alertaProblemas() {
  Swal.fire({
    title: "",
    text: "Problemas al guardar",
    icon: "error",
  });
}

async function alertaEmailInvalido() {
  Swal.fire({
    title: "",
    text: "Email inválido",
    icon: "error",
  });
}

async function contraseñasDiferentes() {
  Swal.fire({
    title: "",
    text: "Las contraseñas no coinciden",
    icon: "error",
  });
}

async function alertaModificacionExitosa(entidad) {
  Swal.fire({
    title: "Éxito",
    html: `<p>El <b>${entidad}</b> se actualizó exitosamente</p>`,
    icon: "success",
    timer: "2000",
    position: "center",
  });
}
