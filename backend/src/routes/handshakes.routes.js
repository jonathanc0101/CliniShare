import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";
import { handleSincronizarPostRequest } from "../sincronizacion/datosPacientes.js";

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));
router.post("/sincronizar", handleSincronizarPostRequest);

export default router;
