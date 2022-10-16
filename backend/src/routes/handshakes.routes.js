import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";
import { getDatosParaSincronizar } from "../sincronizacion/datosPacientes.js";

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));
router.post("/sincronizar", getDatosParaSincronizar);

export default router;
