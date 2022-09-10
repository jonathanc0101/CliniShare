import { Router } from "express";
import {
  createMedico,
  getMedicos,
} from "../controllers/medicos.controller.js";

const router = Router();

router.get("/medicos", getMedicos);
router.post("/medicos", createMedico);
// router.put("/medicos/id");
// router.delete("/medicos/id");

export default router;
