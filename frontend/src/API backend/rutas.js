const puertoServidorBackend = 3000;

const rutas = {
  getMedicoByDni: "medicos/dni/",
  nuevoPaciente: "pacientes/new",
  nuevoEvento: "eventos/new",
  getPaciente: "pacientes/id/",
  getPacienteByDni: "pacientes/dni/",
  getPacienteById: "pacientes/id/",
  modificarEvento: "eventos/id/",
  getEvento: "eventos/id/",
  getEventos: "eventos/all",
  getPacientes: "pacientes/all",
  modificarPaciente: "pacientes/id/",


};

for (let ruta in rutas) {
  rutas[ruta] = "http://localhost:" + puertoServidorBackend + "/" + rutas[ruta];
}

export default rutas;
