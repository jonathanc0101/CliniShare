const puertoServidorBackend = 3000;

const rutas = {
  getMedicoByDni: "medicos/dni/",
  nuevoPaciente: "pacientes/new",
  nuevoEvento: "eventos/new",
  getPaciente: "pacientes/id/",
  getPacienteByDni: "pacientes/dni/",
  getPacienteById: "pacientes/id/",
  modificarEvento: "eventos/id/",
  getEventoConPacienteYMedicoPorId: "eventos/completo/id/",
  getEventos: "eventos/all",
  getEventosPorPacienteId: "eventos/paciente/id/",
  getPacientes: "pacientes/all",
  modificarPaciente: "pacientes/id/",
  getMedicoById: "medicos/id/",
  getEventosCompletosImportantesPorPacienteId: "eventos/importantes/paciente/id/",
  getEventosCompletos: "eventos/all/completos",
  nuevoMedico: "medicos/new",




};

for (let ruta in rutas) {
  rutas[ruta] = "http://localhost:" + puertoServidorBackend + "/" + rutas[ruta];
}

export default rutas;
