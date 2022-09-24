import { Router } from "express";
import {
  createEvento,
  getEventos,
  getEventosPorDni
} from "../controllers/evento.controller.js";

const router = Router();

//tener en cuenta el orden de las rutas que comienzan de la misma manera
router.get("/eventos/all", getEventos);
router.get("/eventos/:dni", getEventosPorDni);
router.post("/eventos/new", createEvento);

export default router;
