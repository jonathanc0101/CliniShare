import { Router } from "express";
import {
    getInitialResponse,
} from "../sincronizacion/handshake.js";

const router = Router();

router.get("/clinishare", (req,res) => res.send(JSON.stringify(getInitialResponse())));

export default router;
