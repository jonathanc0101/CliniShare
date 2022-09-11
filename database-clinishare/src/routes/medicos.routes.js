import { Router } from "express";
import {
  createMedico,
  getMedicos,
} from "../controllers/medicos.controller.js";

const router = Router();

router.get("/medicos/all", getMedicos);
router.post("/medicos/new", createMedico);
// router.put("/medicos/");
// router.delete("/medicos/");

export default router;
