import { Router } from "express";
import {
  createEvento,
  updateEventoPorId,
  getEventos,
  getEventosPorDni,
  getEventoPorId,

} from "../controllers/evento.controller.js";

const router = Router();

//tener en cuenta el orden de las rutas que comienzan de la misma manera
router.get("/eventos/all", getEventos);
router.get("/eventos/dni/:dni", getEventosPorDni);
router.get("/eventos/id/:id", getEventoPorId);
router.post("/eventos/new", createEvento);
router.put("/eventos/id/:id", updateEventoPorId);

export default router;
