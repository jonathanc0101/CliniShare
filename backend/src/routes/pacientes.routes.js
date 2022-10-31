import { Router } from "express";
import {
  createPaciente,
  updatePacientePorId,
  getPacienteByDni,
  getPacienteById,
  getPacientes,
  getDnisDePacientes,
  getUUIDSDePacientes,
  getDnisYNacimientosDePacientes
} from "../controllers/paciente.controller.js";

const router = Router();

router.get("/pacientes/all", getPacientes);
router.get("/pacientes/all/uuids", getUUIDSDePacientes);
router.get("/pacientes/all/dnis", getDnisDePacientes);
router.get("/pacientes/dni/:dni", getPacienteByDni);
router.get("/pacientes/id/:id", getPacienteById);

router.get("/pacientes/all/dnis;nacimientos", getDnisYNacimientosDePacientes);


router.post("/pacientes/new", createPaciente);
router.put("/pacientes/id/:id",updatePacientePorId);

export default router;
