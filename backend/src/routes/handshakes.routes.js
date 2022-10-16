import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";
import { getDatosParaSincronizar } from "../sincronizacion/datosPacientes.js";

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));
router.post("/sincronizar", (req,res,next) => getDatosParaSincronizar(req.body));

export default router;
