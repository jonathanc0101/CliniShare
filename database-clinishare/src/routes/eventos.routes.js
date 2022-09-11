import { Router } from "express";
import {
  createEvento,
  getEventos
} from "../controllers/evento.controller.js";

const router = Router();

router.get("/eventos/all", getEventos);
router.post("/eventos/new", createEvento);

export default router;
