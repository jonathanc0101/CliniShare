import { Router } from "express";
import {
  createEvento,
  getEventos,
  getEventosPorDni
} from "../controllers/evento.controller.js";

const router = Router();

router.get("/eventos/:dni", getEventosPorDni);
router.get("/eventos/all", getEventos);
router.post("/eventos/new", createEvento);

export default router;
