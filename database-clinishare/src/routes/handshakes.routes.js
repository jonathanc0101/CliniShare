import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";

import {getPacientesPorDnis,getEntidadesPacientesPorDnis} from "../controllers/paciente.controller.js"

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));
router.post("/sincronizar", getEntidadesPacientesPorDnis);

export default router;
