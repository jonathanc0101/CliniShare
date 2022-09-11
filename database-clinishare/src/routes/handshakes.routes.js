import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";

import {getPacientesPorDnis} from "../controllers/paciente.controller.js"

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));
router.post("/sincronizar", getPacientesPorDnis);

export default router;
