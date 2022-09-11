import { Router } from "express";
import {
  createPaciente,
  updatePacientes,
  getPacienteByDni,
  getPacientes,
  getDnisDePacientes
} from "../controllers/paciente.controller.js";

const router = Router();

router.get("/pacientes/all", getPacientes);
router.get("/pacientes/all/dnis", getDnisDePacientes);

router.post("/pacientes/new", createPaciente);
router.put("/pacientes/actualizarPacientes",updatePacientes);
// router.delete("/pacientes/");

export default router;
