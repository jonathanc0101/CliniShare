import { Router } from "express";
import {
  createEvento,
  updateEventoPorId,
  getEventos,
  getEventosPorDni,
  getEventosPorPacienteId,
  // getEventoPorId,
  getEventoConPacienteYMedicoPorId,

} from "../controllers/evento.controller.js";

const router = Router();

//tener en cuenta el orden de las rutas que comienzan de la misma manera
router.get("/eventos/all", getEventos);
router.get("/eventos/dni/:dni", getEventosPorDni);
router.get("/eventos/paciente/id/:id", getEventosPorPacienteId);
// router.get("/eventos/id/:id", getEventoPorId);
router.get("/eventos/id/:id", getEventoConPacienteYMedicoPorId);
router.post("/eventos/new", createEvento);
router.put("/eventos/id/:id", updateEventoPorId);

export default router;