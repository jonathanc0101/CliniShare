const puertoServidorBackend = 3000;

const rutas = {
  nuevoPaciente: "pacientes/new",
  nuevoEvento: "eventos/new",
  getPaciente: "pacientes/id/",
  modificarEvento: "eventos/id/",
  getEvento: "eventos/id/",
  getEventos: "eventos/all"
};

for (let ruta in rutas) {
  rutas[ruta] = "http://localhost:" + puertoServidorBackend + "/" + rutas[ruta];
}

export default rutas;