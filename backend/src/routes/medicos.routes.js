import { Router } from "express";
import {
  createMedico,
  getMedicos,
} from "../controllers/medicos.controller.js";

const router = Router();

router.get("/medicos/all", getMedicos);
router.post("/medicos/new", createMedico);

export default router;
