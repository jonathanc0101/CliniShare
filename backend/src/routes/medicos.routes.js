import { Router } from "express";
import {
  createMedico,
  getMedicoByDni,
  getMedicos,
} from "../controllers/medicos.controller.js";

const router = Router();

router.get("/medicos/all", getMedicos);
router.post("/medicos/new", createMedico);
router.get("/medicos/dni/:dni", getMedicoByDni);


export default router;
